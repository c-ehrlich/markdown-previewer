import { useState } from "react";
import useStore from "../store";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { OuterContainer, Container, HeaderText } from "../styled-components";

const TextInput = styled.textarea`
  grid-area: input;
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  grid-area: window;
`;

const Input = (props) => {
  const text = useStore((state) => state.text);
  const setText = useStore((state) => state.setText);

  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <OuterContainer>
      <Container>
        <HeaderText>
          <CreateIcon />
          <span>&nbsp;Editor</span>
        </HeaderText>
        <IconButton
          aria-label="clear text"
          size="large"
          onClick={() => setText("")}
          style={{ gridArea: "clear", color: "#444" }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          area-label={isMaximized ? "minimize" : "maximize"}
          size="large"
          onClick={() => setIsMaximized(!isMaximized)}
          style={{ gridArea: "resize", color: "#444" }}
        >
          {isMaximized ? <MinimizeIcon /> : <AddIcon />}
        </IconButton>
        <TextInput
          id="editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Container>
    </OuterContainer>
  );
};

export default Input;
