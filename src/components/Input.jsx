import { useState } from "react";
import useStore from "../store";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: auto auto 32px 32px;
  grid-template-rows: 32px auto;
  gap: 8px;
  grid-template-areas:
    "label   .       clear   resize"
    "input   input   input   input";
`;

const TextInput = styled.textarea`
  grid-area: input;
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  grid-area: input;
`;

const HeaderText = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  grid-area: label;
`;

const Input = (props) => {
  const text = useStore((state) => state.text);
  const setText = useStore((state) => state.setText);

  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Container>
      <HeaderText>
        <CreateIcon />
        <span>Editor</span>
      </HeaderText>
      <IconButton
        aria-label="clear text"
        size="large"
        onClick={() => setText("")}
        gridArea="clear"
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        area-label={isMaximized ? "minimize" : "maximize"}
        size="large"
        onClick={() => setIsMaximized(!isMaximized)}
        gridArea="resize"
      >
        {isMaximized ? <MinimizeIcon /> : <AddIcon />}
      </IconButton>
      <TextInput
        id="editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Container>
  );
};

export default Input;
