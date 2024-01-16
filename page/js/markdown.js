// TODO add a way to set text direction

export function markdownToHtml(markdownText) {
  let lines = markdownText.split('\n');
  lines = lines.map(parseLine);
  return joinLinesToHtml(lines);
}

function parseLine(line) {
  if (line.startsWith('|')) {
    return parseTableRow(line);
  }
  let type;
  let start;
  if (line.startsWith('# ')) {
    type = 'title';
    start = 2;
  } else if (line.startsWith('## ')) {
    type = 'subtitle';
    start = 3;
  } else if (line.startsWith('### ')) {
    type = 'section';
    start = 4;
  } else {
    type = 'normal';
    start = 0;
  }
  let {content, i: _} = parseContent(line, start, null);
  return {type, content};
}

function parseTableRow(line) {
  let cells = [];
  let i = 1;
  while (i < line.length) {
    let {content, i: newI} = parseContent(line, i, '|');
    i = newI + 1;
    if (content.length > 0) {
      cells.push(content);
    }
  }
  return {type:'table', cells}
}

function addTextToContent(content, text) {
  text = text.replace(/ +/g, ' ')
  if (text != ' ' && text != '') {
    content.push({type:'text',text});
  }
}

const COLORS = {
  '!': 'default',
  'w': 'white',
  'r': 'red',
  'y': 'yellow',
  'g': 'green',
  'c': 'cyan',
  'b': 'blue',
  'p': 'pink'
};

function copyStyle(style) {
  return {color: style.color, bold: style.bold, italic: style.italic};
}

function convertToOnlyText(arr) {
  let result = '';
  for (let a of arr) {
    if (a.type == 'text') {
      result += a.text;
    }
  }
  return result;
}

function parseContent(line, i, waitTo) {
  let content = [];
  let text = '';
  for (; i < line.length; i++) {
    let c = line[i];
    if (c == waitTo) {
      break;
    }
    if (c == '\\') {
      i++;
      switch (line[i]) {
        case '\\': text += '\\'; break;
        case 'n': text += '\n'; break;
        case '|': text += '|'; break;
        case '#': text += '#'; break;
        case '(': text += '('; break;
        case ')': text += ')'; break;
        case '[': text += '['; break;
        case ']': text += ']'; break;
        default:
          text += '\\';
          i--;
          break;
      }
      continue;
    }
    if (c == '*') {
      let starCount = 1;
      if (line[i + 1] == '*') {
        starCount = 2;
        i++;
        if (line[i + 1] == '*') {
          starCount = 3;
          i++;
        }
      }
      addTextToContent(content, text);
      text = '';
      content.push({type:'style',starCount})
      continue;
    }
    if (c == '#') {
      let color = COLORS[line[i + 1]];
      if (color) {
        addTextToContent(content, text);
        text = '';
        content.push({type:'color',color});
        i++;
      } else {
        text += '#';
      }
      continue;
    }
    if (c == '(') {
      let {content: round, i: roundI} = parseContent(line, i + 1, ')');
      i = roundI;
      if (line[i + 1] != '[') {
        addTextToContent(content, text);
        text = '';
        content.push({type:'group', content: round});
        continue;
      }
      let {content: square, i: squareI} = parseContent(line, i + 2, ']');
      i = squareI;
      let type;
      let needToRemoveChar = true;
      if (text.endsWith('!')) {
        type = 'image';
      } else if (text.endsWith('?')) {
        type = 'hover';
      } else if (text.endsWith(':')) {
        type = 'link';
      } else {
        type = 'link';
        needToRemoveChar = false;
      }
      if (needToRemoveChar) {
        text = text.substring(0, text.length - 1);
      }
      addTextToContent(content, text);
      text = '';
      if (type == 'link' || type == 'image') {
        square = convertToOnlyText(square);
      }
      content.push({type, round, square});
      continue;
    }
    text += c;
  }
  addTextToContent(content, text);
  // join duplicate text one after another
  for (let i = 1; i < content.length; i++) {
    if (content[i - 1].type != 'text')
      continue;
    if (content[i].type != 'text')
      continue;
    content[i - 1].text += content[i].text;
    content.splice(i, 1);
    i--;
  }
  // apply style to text and remove style elments
  let currentStyle = {color:'default',italic:false,bold:false};
  for (let i = 0; i < content.length; i++) {
    let currCont = content[i];
    switch (currCont.type) {
      case 'text':
      case 'hover':
      case 'group':
        currCont.style = copyStyle(currentStyle);
        break;
      case 'color':
        currentStyle.color = currCont.color;
        content.splice(i, 1);
        i--;
        break;
      case 'style':
        if ((currCont.starCount & 1) == 1)
          currentStyle.italic = !currentStyle.italic;
        if ((currCont.starCount & 2) == 2)
          currentStyle.bold = !currentStyle.bold;
        content.splice(i, 1);
        i--;
        break;
    }
  }
  // flatten group elements (after modifying styles)
  // content = content.flatMap(elem => elem.type == 'group' ? elem.content : [elem]);

  return {content, i: i >= line.length ? line.length : i};
}

const ELEM_TAG_BY_TYPE = {
  'title': 'h1',
  'subtitle': 'h2',
  'section': 'h3',
  'normal': 'p',
};

function joinLinesToHtml(lines) {``
  let mainContainer = document.createElement('div');
  for (let line of lines) {
    if (line.type == 'table') {
      //TODO support tables
      continue;
    }
    let lineElem = document.createElement(ELEM_TAG_BY_TYPE[line.type]);
    lineElem.style.color = 'var(--theme-text-white)';
    addEntriesAsHtml(lineElem, line.content);
    mainContainer.append(lineElem);
  }
  return mainContainer;
}

function applyColor(elem, style) {
  if (style.color !== 'default') {
    elem.style.color = `var(--theme-text-${style.color})`;
  }
}

function applyStyle(elem, style) {
  if (style.italic) {
    elem.style.fontStyle = 'italic';
  }
  if (style.bold) {
    elem.style.fontWeight = 'bold';
  }
}

function createHover(hoverable, content) {
  if (content.length == 0) {
    return;
  }
  let hoverBubble = document.createElement('div');
  hoverBubble.classList.add('hover-bubble');
  hoverBubble.style.color = 'var(--theme-text-white)';
  addEntriesAsHtml(hoverBubble, content);

  function updateLocation() {
    let scrollTop = document.documentElement.scrollTop;
    let targetRect = hoverable.getBoundingClientRect();
    let middleX = targetRect.left + targetRect.width / 2;
    let topY = targetRect.bottom + scrollTop;
    hoverBubble.style.left = middleX + 'px';
    hoverBubble.style.top = topY + 'px';
  }

  hoverable.addEventListener('mouseenter', () => {
    updateLocation();
    document.body.append(hoverBubble);
    requestAnimationFrame(() => {
      hoverBubble.classList.add('hover-bubble-shown');
    });
  });
  hoverable.addEventListener('mouseleave', () => {
    hoverBubble.classList.remove('hover-bubble-shown');
    setTimeout(()=>{
      if (!hoverBubble.classList.contains('hover-bubble-shown')) {
        hoverBubble.remove();
      }
    }, 100);
  });
}

function addEntriesAsHtml(parent, content) {
  for (let entry of content) {
    switch (entry.type) {
      case 'text': {
        let span = document.createElement('span');
        span.innerText = entry.text;
        applyColor(span, entry.style);
        applyStyle(span, entry.style);
        parent.append(span);
        break;
      }
      case 'group': {
        let span = document.createElement('span');
        addEntriesAsHtml(span, entry.content);
        applyColor(span, entry.style);
        parent.append(span);
        break;
      }
      case 'link': {
        let a = document.createElement('a');
        a.style.color = 'var(--theme-text-blue)';
        addEntriesAsHtml(a, entry.round);
        a.href = entry.square; //TODO make internal link use './state.js' instead
        parent.append(a);
        break;
      }
      case 'hover': {
        let span = document.createElement('span');
        span.classList.add('hoverable');
        span.style.color = 'var(--theme-text-green)';
        addEntriesAsHtml(span, entry.round);
        createHover(span, entry.square);
        parent.append(span);
        break;
      }
      case 'image': {
        let img = document.createElement('img');
        img.src = entry.square;
        createHover(img, entry.round);
        parent.append(img);
        break;
      }
      default: {
        parent.append(JSON.stringify(entry));
        break;
      }
    }
  }
}