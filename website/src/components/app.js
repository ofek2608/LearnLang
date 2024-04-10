import PostResource from "../pages/resource-page.js";
import LoginPage from "../pages/login-page.js";
import MarkdownDisplay from "./markdown-display.js";
import { useEffect, useState } from "react";
import { isTouchScreenDevice } from "../env-utils.js";
import TitleBar from "./title-bar.js";
import Navigation from "./navigation.js";

export default function App() {
  let [hideTitleBar, setHideTitleBar] = useState(true);
  let [hideNavigation, setHideNavigation] = useState(true);
  const [mobile, setMobile] = useState(isMobile());
  const handleWindowSizeChange = () => setMobile(isMobile());

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  console.log(isTouchScreenDevice());

  const appCtx = {
    hideTitleBar,
    setHideTitleBar,
    hideNavigation,
    setHideNavigation,
  };

  if (isTouchScreenDevice()) {
    return (
      <div className="mobile">
        <TitleBar appCtx={appCtx} />
        <Navigation appCtx={appCtx} />
        <div className="home-page"></div>
      </div>
    );
  }
  return (
    <div className="desktop">
      <TitleBar appCtx={appCtx} />
      <Navigation appCtx={appCtx} />
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
