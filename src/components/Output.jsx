import { useEffect, useState } from "react";
import useStore from "../store";
import { marked } from "marked";
import styled from "styled-components";
import hljs from "highlight.js";

const HtmlPreview = styled.div`
  grid-area: output;
  text-align: left;
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
`;

const Output = () => {
  const text = useStore((state) => state.text);
  const [formatted, setFormatted] = useState("");

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      // const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  useEffect(() => {
    let formatted = marked.parse(text);
    setFormatted(formatted);
    console.log(formatted);
  }, [text]);

  const createMarkup = () => {
    return { __html: formatted };
  };

  return (
    <>
      <HtmlPreview id="preview" dangerouslySetInnerHTML={createMarkup()} />
    </>
  );
};

export default Output;
