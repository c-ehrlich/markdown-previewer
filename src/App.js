import "./App.css";
import { useEffect } from "react";

import useStore from "./store";

import Header from "./components/Header";
import Input from "./components/Input";
import Output from "./components/Output";
import styled from "styled-components";

import breakpoint from "./breakpoints";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Paper, Switch, Typography } from "@mui/material";

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  @media only screen and ${breakpoint.device.xs} {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    gap: 16px;
    grid-template-areas:
      "input"
      "output";
  }

  @media only screen and ${breakpoint.device.sm} {
    margin: 16px;
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
    gap: 16px;
    grid-template-areas: "input output";
  }
`;

function App() {
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        flexDirection="column"
        className="App"
      >
        <Box flex={1} overflow="auto">
          <Paper sx={{
            height: "100vh"
          }}>
            <Header />
            <Body>
              <Input />
              <Output />
            </Body>
          </Paper>
          <Switch checked={dark} onChange={() => setDark(!dark)} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
