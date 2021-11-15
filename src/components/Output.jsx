import { useEffect, useState } from "react";
import useStore from "../store";
import { marked } from "marked";
import styled from "styled-components";
import { OuterContainer, Container, HeaderText } from "../styled-components";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import hljs from "highlight.js";

const HtmlPreview = styled.div`
  grid-area: window;
  background-color: white;
  padding: 4px 8px 4px 8px;
  text-align: left;
  max-width: 100%;
  overflow-x: scroll;
`;

const Output = () => {
  const text = useStore((state) => state.text);
  const [formatted, setFormatted] = useState("");

  const [isMaximized, setIsMaximized] = useState(false);

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
    setFormatted(marked.parse(text));
  }, [text]);

  const createMarkup = () => {
    return { __html: formatted };
  };

  return (
    <OuterContainer>
      <Container>
        <HeaderText>
          <MenuBookIcon />
          <span>&nbsp;Previewer</span>
        </HeaderText>
        <IconButton
          area-label={isMaximized ? "minimize" : "maximize"}
          size="large"
          onClick={() => setIsMaximized(!isMaximized)}
          style={{ gridArea: "resize", color: "#444" }}
        >
          {isMaximized ? <MinimizeIcon /> : <AddIcon />}
        </IconButton>
        <HtmlPreview id="preview" dangerouslySetInnerHTML={createMarkup()} />
      </Container>
    </OuterContainer>
  );
};

export default Output;
