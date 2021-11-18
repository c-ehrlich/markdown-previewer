import React, { useEffect, useState } from "react";
import useStore from "../store";
import { marked } from "marked";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  Box,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Slide,
  Tooltip,
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
    <Grid item xs={12} md={6} sx={{ height: "100%", overflowY: "scroll" }}>
      <Card variant="outlined">
        <CardHeader
          title="Preview"
          action={
            <Tooltip title="Fullscreen" arrow>
              <IconButton
                area-label="maximize"
                onClick={handleOpenModal}
              >
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <Box>
          <HtmlPreview id="preview" dangerouslySetInnerHTML={createMarkup()} />
        </Box>
      </Card>
      <SwipeInDialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth={false}
      >
        <SwipeInDialogTitle
          id="markdown-modal-title"
          onClose={handleCloseModal}
        >
          Fullscreen Preview
        </SwipeInDialogTitle>
        <Divider />
        <DialogContent>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </DialogContent>
      </SwipeInDialog>
    </Grid>
  );
};

export default Output;
