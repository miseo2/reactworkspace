/** @format */

import { useState } from "react";

import ArticleApp from "../articles/ArticleApp";

export default function Navigator() {
  const componentMap = {
    ArticleApp: <ArticleApp />,
  };

  const [item, setItem] = useState("ArticleApp");

  const onClickButtonHandler = (value) => {
    setItem(value);
    console.log(value);
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "ArticleApp")}
        >
          ArticleApp
        </button>
      </div>
      <div>{componentMap[item]}</div>
    </>
  );
}
