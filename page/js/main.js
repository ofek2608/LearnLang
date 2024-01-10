//
// This file is loaded first, and importing all important modules
//

import './server-connection.js';
import {setPreferredTheme} from './theme.js';


//TEST, can be removed
import('./server-connection.js').then(ServerConnection => {
  window.ServerConnection = ServerConnection;
  ServerConnection.setLogin({a:'hello'});
});
