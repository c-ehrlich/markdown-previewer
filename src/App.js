import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Output from "./components/Output";
import styled from "styled-components";

import breakpoint from "./breakpoints";

const Body = styled.div`
  @media only screen and ${breakpoint.device.xs} {
    margin: 4px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    gap: 16px;
    grid-template-areas:
      "input"
      "output";
  }

  @media only screen and ${breakpoint.device.sm} {
    margin: 16px 32px 16px 32px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    gap: 16px;
    grid-template-areas:
      "input"
      "output";
  }

  @media only screen and ${breakpoint.device.lg} {
    margin: 16px;
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto; 
    gap: 16px 16px; 
    grid-template-areas: 
      "input output"; 
  }
`;

function App() {
  return (
    <div className="App">
      <Header />
      <Body>
        <Input />
        <Output />
      </Body>
    </div>
  );
}

export default App;
