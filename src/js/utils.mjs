const HEADER_URL = "/partials/header.html";
const FOOTER_URL = "/partials/footer.html";

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear === true) {
    parentElement.innerHTML = "";
  }
  const html = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, html.join(''));
}

export function renderWithTemplate(template, parentElement, data, position = "afterbegin", clear = false) {
  if(clear === true) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, template);
}

export async function loadTemplate(url) {
  const response = await fetch(url);
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter() {
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  const header = await loadTemplate(HEADER_URL);
  const footer = await loadTemplate(FOOTER_URL);
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);

  setCurrentYear();
}

export function toTitleCase(str) {
  return str.replaceAll('-',' ').replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach(e => e.textContent = year);
}
