import PostResource from "./pages/resource-page";
import LoginPage from "./pages/login-page";
import MarkdownDisplay from "./components/markdown-display";
import { useState } from "react";

export default function App() {
  return (
    <div>
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
