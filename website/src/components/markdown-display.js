import { useState } from "react";

export default function MarkdownDisplay({ content }) {
  let lines = content.split("\n");
  lines = lines.map(parseLine);
  lines = joinTableLines(lines);
  lines = lines.map(lineToHtml);
  return <div>{lines}</div>;
}

function joinTableLines(lines) {
  let result = [];
  let lastTable = null;
  for (let line of lines) {
    if (line.type !== "table") {
      result.push(line);
      lastTable = null;
      continue;
    }
    if (lastTable) {
      lastTable.push(line.cells);
      continue;
    }
    lastTable = [line.cells];
    result.push({
      type: "table",
      cells: lastTable,
    });
  }
  return result;
}

function parseLine(line) {
  if (line.startsWith("|")) {
    return parseTableRow(line);
  }
  let type;
  let start;
  if (line.startsWith("# ")) {
    type = "title";
    start = 2;
  } else if (line.startsWith("## ")) {
    type = "subtitle";
    start = 3;
  } else if (line.startsWith("### ")) {
    type = "section";
    start = 4;
  } else {
    type = "normal";
    start = 0;
  }
  let { content } = parseContent(line, start, null);
  return { type, content };
}

function parseTableRow(line) {
  let cells = [];
  let i = 1;
  while (i < line.length) {
    let { content, i: newI } = parseContent(line, i, "|");
    i = newI + 1;
    if (content.length > 0) {
      cells.push(content);
    }
  }
  return { type: "table", cells };
}

function addTextToContent(content, text) {
  text = text.replace(/ +/g, " ");
  if (text !== " " && text !== "") {
    content.push({ type: "text", text });
  }
}

const COLORS = {
  "!": "default",
  w: "white",
  r: "red",
  y: "yellow",
  g: "green",
  c: "cyan",
  b: "blue",
  p: "pink",
};

function copyStyle(style) {
  return { color: style.color, bold: style.bold, italic: style.italic };
}

function convertToOnlyText(arr) {
  let result = "";
  for (let a of arr) {
    if (a.type === "text") {
      result += a.text;
    }
  }
  return result;
}

const ESCAPES = {
  "\\": "\\",
  n: "\n",
  "|": "|",
  "#": "#",
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
};

function parseContent(line, i, waitTo) {
  let content = [];
  let text = "";
  for (; i < line.length; i++) {
    let c = line[i];
    if (c === waitTo) {
      break;
    }
    if (c === "\\") {
      i++;
      let c = ESCAPES[line[i]];
      if (c) {
        text += c;
      } else {
        text += "\\";
        i--;
      }
      continue;
    }
    if (c === "*") {
      let starCount = 1;
      if (line[i + 1] === "*") {
        starCount = 2;
        i++;
        if (line[i + 1] === "*") {
          starCount = 3;
          i++;
        }
      }
      addTextToContent(content, text);
      text = "";
      content.push({ type: "style", starCount });
      continue;
    }
    if (c === "#") {
      let color = COLORS[line[i + 1]];
      if (color) {
        addTextToContent(content, text);
        text = "";
        content.push({ type: "color", color });
        i++;
      } else {
        text += "#";
      }
      continue;
    }
    if (c === "(") {
      let { content: round, i: roundI } = parseContent(line, i + 1, ")");
      i = roundI;
      if (line[i + 1] !== "[") {
        addTextToContent(content, text);
        text = "";
        content.push({ type: "group", content: round });
        continue;
      }
      let { content: square, i: squareI } = parseContent(line, i + 2, "]");
      i = squareI;
      let type;
      let needToRemoveChar = true;
      if (text.endsWith("!")) {
        type = "image";
      } else if (text.endsWith("?")) {
        type = "hover";
      } else if (text.endsWith(":")) {
        type = "link";
      } else {
        type = "link";
        needToRemoveChar = false;
      }
      if (needToRemoveChar) {
        text = text.substring(0, text.length - 1);
      }
      addTextToContent(content, text);
      text = "";
      if (type === "link" || type === "image") {
        square = convertToOnlyText(square);
      }
      content.push({ type, round, square });
      continue;
    }
    text += c;
  }
  addTextToContent(content, text);
  // join duplicate text one after another
  for (let i = 1; i < content.length; i++) {
    if (content[i - 1].type !== "text") continue;
    if (content[i].type !== "text") continue;
    content[i - 1].text += content[i].text;
    content.splice(i, 1);
    i--;
  }
  // apply style to text and remove style elments
  let currentStyle = { color: "default", italic: false, bold: false };
  for (let i = 0; i < content.length; i++) {
    let currCont = content[i];
    switch (currCont.type) {
      case "text":
      case "hover":
      case "group":
        currCont.style = copyStyle(currentStyle);
        break;
      case "color":
        currentStyle.color = currCont.color;
        content.splice(i, 1);
        i--;
        break;
      case "style":
        if ((currCont.starCount & 1) === 1)
          currentStyle.italic = !currentStyle.italic;
        if ((currCont.starCount & 2) === 2)
          currentStyle.bold = !currentStyle.bold;
        content.splice(i, 1);
        i--;
        break;
      default:
        break;
    }
  }

  return { content, i: i >= line.length ? line.length : i };
}

const ELEM_TAG_BY_TYPE = {
  title: "h1",
  subtitle: "h2",
  section: "h3",
  normal: "p",
};

function lineToHtml(line, i) {
  if (line.type === "table") {
    //TODO support tables
    return <span>TABLES not supported yet</span>;
  }
  let Type = ELEM_TAG_BY_TYPE[line.type];
  return (
    <Type
      key={i}
      style={{
        color: "var(--theme-text-white)",
      }}
    >
      {entriesToHtml(line.content)}
    </Type>
  );
}

function Hoverable({ content, children }) {
  let [isHovered, setHovered] = useState(false);
  let [isDisplyed, setDisplyed] = useState(false);

  function onMouseEnter() {
    setDisplyed(true);
    setTimeout(() => setHovered(true), 20);
  }

  function onMouseLeave() {
    setHovered(false);
    setTimeout(() => {
      setDisplyed(false);
    }, 100);
  }

  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
      }}
    >
      {children}
      {isDisplyed && (
        <span
          className={"hover-bubble" + (isHovered ? " hover-bubble-shown" : "")}
        >
          {entriesToHtml(content)}
        </span>
      )}
    </span>
  );
}

function entriesToHtml(entries) {
  return entries.map((entry, i) => <MarkdownEntry key={i} entry={entry} />);
}

function MarkdownEntry({ entry }) {
  switch (entry.type) {
    case "text": {
      let style = entry.style;
      let color =
        style.color === "default" ? "" : `var(--theme-text-${style.color})`;
      let fontStyle = style.italic ? "italic" : "";
      let fontWeight = style.bold ? "bold" : "";
      return (
        <span
          style={{
            color,
            fontStyle,
            fontWeight,
          }}
        >
          {entry.text}
        </span>
      );
    }
    case "group": {
      let style = entry.style;
      let color =
        style.color === "default" ? "" : `var(--theme-text-${style.color})`;
      return <span style={{ color }}>{entriesToHtml(entry.content)}</span>;
    }
    case "link": {
      //TODO use a link that won't relead the page
      return (
        <a
          href={entry.square}
          style={{
            color: "var(--theme-text-blue)",
          }}
        >
          {entriesToHtml(entry.round)}
        </a>
      );
    }
    case "hover": {
      return (
        <Hoverable content={entry.square}>
          <span
            className="hoverable"
            style={{
              color: "var(--theme-text-green)",
            }}
          >
            {entriesToHtml(entry.round)}
          </span>
        </Hoverable>
      );
    }
    case "image": {
      return (
        <Hoverable content={entry.square}>
          <img src={entry.square} alt={convertToOnlyText(entry.square)} />
        </Hoverable>
      );
    }
    default: {
      return <span>{JSON.stringify(entry)}</span>;
    }
  }
}
