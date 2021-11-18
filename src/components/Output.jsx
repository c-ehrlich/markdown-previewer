import React, { useEffect, useState } from "react";
import useStore from "../store";
import { marked } from "marked";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  Card,
  CardContent,
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        <CardContent id="preview" dangerouslySetInnerHTML={createMarkup()} sx={{ maxWidth: "100%", overflow: "scroll" }} />
      </Card>
      <Dialog
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
      </Dialog>
    </Grid>
  );
};

export default Output;
