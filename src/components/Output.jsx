import React, { useEffect, useState } from "react";
import useStore from "../store";
import { marked } from "marked";
import styled from "styled-components";
import { OuterContainer, Container, HeaderText } from "../styled-components";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,  
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import hljs from "highlight.js";

const HtmlPreview = styled.div`
  grid-area: window;
  background-color: white;
  padding: 4px 8px 4px 8px;
  text-align: left;
  max-width: 100%;
  overflow-x: scroll;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SwipeInDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    // padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    // padding: theme.spacing(1),
  },
}));

const SwipeInDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Output = () => {
  const text = useStore((state) => state.text);
  const [formatted, setFormatted] = useState("");

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      // TODO: get highlighting working!
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <OuterContainer>
      <Container>
        <HeaderText>
          <MenuBookIcon />
          <span>&nbsp;Previewer</span>
        </HeaderText>
        <IconButton
          area-label="maximize"
          size="large"
          onClick={handleOpenModal}
          style={{ gridArea: "button", color: "#444" }}
        >
          <AddIcon />
        </IconButton>
        <HtmlPreview id="preview" dangerouslySetInnerHTML={createMarkup()} />
      </Container>
      <SwipeInDialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth={false}
      >
        <SwipeInDialogTitle id="markdown-modal-title" onClose={handleCloseModal}>
          Large Previewer
        </SwipeInDialogTitle> 
        <DialogContent>
          <div dangerouslySetInnerHTML={createMarkup()} />
          <div dangerouslySetInnerHTML={createMarkup()} />
          <div dangerouslySetInnerHTML={createMarkup()} />
        </DialogContent>
      </SwipeInDialog>
    </OuterContainer>
  );
};

export default Output;
