import PostResource from "./pages/resource-page";
import LoginPage from "./pages/login-page";
import MarkdownDisplay from "./components/markdown-display";
import { useState } from "react";
import './title-bar/title-bar.css';

export default function App() {
  let [hideTitleBar, setHideTitleBar] = useState(true);
  return (
    <div>
    <TitleBar hideTitleBar={hideTitleBar} />
      <PostResource
        resourceData={{
          type: "post",
          author: "OfekN",
          content: "This is an example content",
          comments: ["wow, that's cool", "this is another comment"],
        }}
      />
      <LoginPage create />
      <TestMarkdown />
      <MainView />
    </div>
  );
}

function MainView() {
  return <div></div>;
}

function TitleBar({ hideTitleBar }) {
  return (
    <div
      className={"title-bar" + (hideTitleBar ? " title-bar-hide" : "")}
    >
      <div>

      </div>
    </div>
  );
}

function TestMarkdown() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        value={inputValue}
        onChange={handleInputChange}
      />
      <MarkdownDisplay content={inputValue} />
    </div>
  );
}
