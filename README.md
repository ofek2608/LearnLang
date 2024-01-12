# Learn Lang
This project aims to help people learn languages for free. By letting users submit learning resources which will be promoted using a karma system.

## How to execute
The main server file is [./src/main.js](./src/main.js), this is a nodejs server, therefore, the command to run it is `node ./src/main.js`.

## Server - Client communication
The server is an http(s) server. The client can call `GET` to get the content of [./page](./page). The client can all `GET` with `/img/<name>` to get images stored on the server at [./data/photo](./data/photo). To execute API calls the client calls `POST` on `/` with a json body of the format `{func,data,loginKey}`. `func` must always be present and represent the API function which the client wishes to call. `loginKey` is required only for some functions. It is a string and it achieved using the `login` function. `data` is required for most of the functions and its kind depend on the function. After the request, the server will send a json back, if there was an error, the json will be of the format `{errCode:<number>,err:<string>}`. To check if the response has an error, it's enough to check `response.errCode === undefined`. If there wasn't an error, the response will have a format that depends on the function.

## Error codes
| error code | meaning                   |
|------------|---------------------------|
| -1         | Internal server error     |
| [100,199]  | Action required           |
| [200,299]  | Missing or incorrect data |

Check [./src/errors.js](./src/errors.js)