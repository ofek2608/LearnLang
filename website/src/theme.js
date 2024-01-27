//
// Author: OfekN
// Description:
//  This script is responsible on changing the website style between dark and light theme.
//  By calling setPreferredTheme with parameters 'light', 'dark', null (automatic) you define the behavior.
//
import "./theme.css";

export function setPreferredTheme(newPreferredTheme) {
  if (newPreferredTheme === "dark") {
    hasPreferredTheme = true;
    setDark(true);
  } else if (newPreferredTheme === "light") {
    hasPreferredTheme = true;
    setDark(false);
  } else if (hasPreferredTheme) {
    hasPreferredTheme = false;
    updateByMedia();
  }
}

function setDark(value) {
  if (dark === value) {
    return;
  }
  dark = value;
  if (dark) {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }
}

function updateByMedia() {
  if (hasPreferredTheme) {
    return;
  }
  setDark(darkThemeMedia.matches);
}

let hasPreferredTheme = false;
let dark = false;
let darkThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
darkThemeMedia.onchange = updateByMedia;
updateByMedia();
