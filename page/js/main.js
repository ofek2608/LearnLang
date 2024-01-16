//
// This file is loaded first, and importing all important modules
//

import './server-connection.js';
import {setPreferredTheme} from './theme.js';
import './state.js';
import {markdownToHtml} from './markdown.js'


//TEST, can be removed
import('./server-connection.js').then(ServerConnection => {
  window.ServerConnection = ServerConnection;
});

let testTextArea = document.createElement('textarea');
let display = document.createElement('div');
testTextArea.oninput = () => {
  display.innerHTML = '';
  display.append(markdownToHtml(testTextArea.value)); 
};
testTextArea.cols = 100;
testTextArea.rows = 10;
testTextArea.value = '# hello world ?(this is a link)[https://www.google.com]\n!(Guess what\'s that)[https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500]'
document.body.append(testTextArea)
document.body.append(display)
testTextArea.oninput();
