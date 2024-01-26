# Markdown format
When posting questions, submitting information or commenting, the user provite a custom markdown format.

## Syntax

### Headers
- If a line begins with "`# `" then the following text until the end of the line is formatted as a **title**.
- If a line begins with "`## `" then the following text until the end of the line is formatted as a **subtitle**.
- If a line begins with "`### `" then the following text until the end of the line is formatted as a **section**.

### Bold and italic
- If a part of a text is surrounded by `*`, the text is in **italic**.
- If a part of a text is surrounded by `**`, the text is in **bold**.
- If a part of a text is surrounded by `***`, the text is in both **italic** and **bold**.

### Colors
Use `#<c>` before the text inorder to change its color.<br>
Possible colors:
| prefix | color name | color code | preview | text |
| :----: | :--------: | :--------: | :-----: | :--: |
| `#!` | reset | - | - | - |
| `#w` | white | `#cdd5dd` | <color-block style="background: #cdd5dd"/> | <span style="color:#cdd5dd">Hello World</span> |
| `#r` | red | `#fc4626` | <color-block style="background: #fc4626"/> | <span style="color:#fc4626">Hello World</span> |
| `#y` | yellow | `#bfb415` | <color-block style="background: #bfb415"/> | <span style="color:#bfb415">Hello World</span> |
| `#g` | green | `#47bd19` | <color-block style="background: #47bd19"/> | <span style="color:#47bd19">Hello World</span> |
| `#c` | cyan | `#26dde0` | <color-block style="background: #26dde0"/> | <span style="color:#26dde0">Hello World</span> |
| `#b` | blue | `#4c49e6` | <color-block style="background: #4c49e6"/> | <span style="color:#4c49e6">Hello World</span> |
| `#p` | pink | `#c4259a` | <color-block style="background: #c4259a"/> | <span style="color:#c4259a">Hello World</span> |

Colors don't carry after new line. Spaces after the colors are ignored.<br>
For example:
```
hello#c world
hello #g world
```
will look like<br>
| <span>hello</span><span style="color:#26dde0">world</span> <span>hello</span> <span style="color:#47bd19">world</span> |
| - |

### Links
Inorder to provide a link, need to write `[text](link)`. If the component has an external style it won't effect it. (It still can have style inside of it)

### Images
Inorder to provide images, need to write `![alt](id)`. The image link is `http://localhost/img/{id}`.

### Hover
Write `?[text](hover)`. Note that `hover` could be multiple lines with `\n`. If the component has an external style it won't effect it. (It still can have style inside of it)

<style>
  color-block {
    margin: 3px;
    width: 45px;
    height: 15px;
    display: inline-block;
  }
</style>
