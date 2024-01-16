// import {onStateUpdate} from 'main.js';

const TITLE = 'LearnLang';

function parseState() {
  let state = {};
  for (let [key,value] of new URLSearchParams(window.location.search)) {
    state[key] = value;
  }
  state[''] = window.location.hash;
  return state;
}

export function setState(newState) {
  let params = new URLSearchParams();
  for (let key in newState) {
    if (key) {
      params.append(key, newState[key]);
    }
  }
  let newUrl = '/';
  let search = params.toString();
  if (search) {
    newUrl += '?' + search;
  }
  let hash = newState[''];
  if (hash) {
    newUrl += '#' + hash;
  }
  history.pushState(newState, TITLE, newUrl);
  onStateUpdate(newState);
}

window.addEventListener('popstate', event => {
  onStateUpdate(event.state);
});

{
  let loadedState = parseState();
  window.history.replaceState(loadedState, TITLE);
  onStateUpdate(loadedState);
}



function onStateUpdate(newState) {
  console.log('state change', newState);
}