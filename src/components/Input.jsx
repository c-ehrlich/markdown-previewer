import useStore from "../store";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
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
          style={{ gridArea: "button", color: "#444" }}
        >
          <DeleteIcon />
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
