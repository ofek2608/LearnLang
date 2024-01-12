# Learn Lang
This project aims to help people learn languages for free. By letting users submit learning resources which will be promoted using a karma system.

## How to execute
The main server file is [./src/main.js](./src/main.js), this is a nodejs server, therefore, the command to run it is `node ./src/main.js`.

## Server - Client communication
The server is an http(s) server. The client can call `GET` to get the content of [./page](./page). The client can all `GET` with `/img/<name>` to get images stored on the server at [./data/photo](./data/photo). To execute API calls the client calls `POST` on `/` with a json body of the format `{func,data,loginKey}`. `func` must always be present and represent the API function which the client wishes to call. `loginKey` is required only for some functions. It is a string and it achieved using the `login` function. `data` is required for most of the functions and its kind depend on the function. After the request, the server will send a json back, if there was an error, the json will be of the format `{errCode:<number>,err:<string>}`. To check if the response has an error, it's enough to check `response.errCode === undefined`. If there wasn't an error, the response will have a format that depends on the function.

## Error codes
| error code | meaning                   |
|------------|---------------------------|
| -1         | Unknown internal error    |
| [100,199]  | Action required           |
| [200,299]  | Missing or incorrect data |

Check [./src/errors.js](./src/errors.js) for the full list.

## Exercises
Excercises are the way the player learns alone, they pick a type of excercise and then they will practice the language they want to learn.

For a list of potential exercises ideas check [./ExerciseTypes.md](./ExerciseTypes.md).

## Quizes
Quizes are the way the player can share learning resources with other users. Quizes may have a specific theme, such as animals, food and so. Quizes are built from the same content as excercises, but they are compiled. The quiz creator can enable: time limit, score, leaderboard. Quizes may be played as multiplayer to see who can get more questions on the same seed, or who can answer first.

## Pages
People can make pages using markdown format. The pages can explain things about the language such as stems, conjugations, tenses, difference between words, ect. Pages can also be questions for help. Pages can link to other resources such as quizes, other pages, or external websites. Pages have comments (which are also markdown), edit suggestions. People will be able to see recently created pages/comments and search for pages by text or tags. Some of these markdown will become official and will be displayed to people when they need to learn it. Markdowns will have comments and edit suggestions.
