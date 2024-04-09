import PostResource from "./pages/resource-page";
import LoginPage from "./pages/login-page";
import MarkdownDisplay from "./components/markdown-display";
import { useEffect, useState } from "react";
import "./title-bar/title-bar.css";
import { isTouchScreenDevice } from "./env-utils.js";

export default function App() {
  let [hideTitleBar, setHideTitleBar] = useState(true);
  const [mobile, setMobile] = useState(isMobile());
  const handleWindowSizeChange = () => setMobile(isMobile());

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  if (isTouchScreenDevice()) {
    return (
      <div className="mobile">
        <TitleBar hideTitleBar={false}/>
        <div className="home-page"></div>
      </div>
    );
  }
  return (
    <div className="desktop">
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

function isMobile() {
  return window.innerWidth * 1.25 < window.innerHeight;
}

function MainView() {
  return <div></div>;
}

function TitleBar({ hideTitleBar }) {
  return (
    <div className={"title-bar" + (hideTitleBar ? " title-bar-hide" : "")}>
      <div>
        <div/>
        <div/>
        <div/>
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
