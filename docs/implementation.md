# Implementation
This file contains implementation details.

## Modules
This project is built of 2 npm modules:
### [Website Module](./website/)
This is a react module.<br>
Execute in the root directory with `npm website`.
### [API Module](./api)
This is an express server.<br>
Execute in the root directory with `npm api`.

## API request
The client sends the api an http(s) request and the api respond. Both the request and the response consist of a json body.<br>
The request is sent with `POST` to `/`, and it needs to be of the form `{func,data,sessionToken}`.<br>
- **func (string):** The requested function, check [src/api-function/](./api/src/api-function/) for the full list.
- **data (dynamic):** Most functions will use this as parameters to the function.
- **sessionToken (string):** For function that require being logged in, a sessionToken is needed. You can obtain a session token using the [login function](./api/src/api-function/login.js).

## Error codes
| error code | meaning                   |
|------------|---------------------------|
| -1         | Unknown internal error    |
| [100,199]  | Action required           |
| [200,299]  | Missing or incorrect data |

Check [./api/src/errors.js](./api/src/errors.js) for the full list.