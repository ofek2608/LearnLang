# About exercises
Players will be able to start an exercise in any type to learn alone. This file provide ideas for exercises that might appear and some implementation details.

Excercises will be given to players based on the content. Every player will select their intrest which will effect their required vocabulary. Every word will also have a level. The excercieses the user will get will contain words mostly of their level or from their required vocabulary.

## Words translation and images
The aim of this exercise is to refresh knowledge of words and know which words the player knows and about what level they are. There are a few kind of questions:
- Given a foreign word, pick the image that describes it.
- Given an image, pick the foreign word that describes is.
- Given a domestic word, pick its translation.
- Given a foreign word, pick its translation.

After some amount of questions the player will finish.

**Implementation:**<br>
When the player starts an exercise, it will ask the api for a word. The api will give him a word which fits their level. The player will see the question, answer and it will send the api the result which in return update the player knowledge.

The api may send the player:
- new words - to learn.
- old words - to verify the player haven't forgotten them.
- words with high recent mistake rate - to practice.

When a supporter contribute "words translation and images" they will submit a list of entries, every entry will have a way to say a word in 1 or more languages and optionally an image. In other words it can be represented as a table when the rows are words and columns are languages/image.

Only words from the same table will be shown since they are built to work together, and there won't be potential multiple answers.

## Riddle
The player will get one riddle. Riddles are in the foreign language and the answer is a single word in the foreign language. riddles may also have hint(s) in the forein language. The player needs to type the answer and he can also look on the hint(s). If the riddle is too hard the player can bookmark the riddle and answer it later.

**Implementation:**<br>
The player will ask the api for a riddle, the api will give the player a random riddle. The api will make sure the the player already knows the answer word.

## Type practice
This excercise will only be available for languages with a different alphabet. The player will learn how to type.

**Implementation:**<br>
Programmed for every language. The client will need to ask the api which letters do they already know.

## Fill in
There is a sentence/dialoge with missing parts and the player have a word bank which they need to fill in. The missing words may be full dialoge messages and the player needs to pick the correct order.