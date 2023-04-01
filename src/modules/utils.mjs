export function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

export function elementBuilder(tag, classes = [], ...attributes) {
  const element = document.createElement(tag);
  for (const cls of classes) {
    element.classList.add(cls);
  }
  for (const [attribute, value] of attributes) {
    element.setAttribute(attribute, value);
  }
  return element;
}
