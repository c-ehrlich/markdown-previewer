import "./App.css";

import { useState } from "react";

import useStore from "./store";


import Header from "./components/Header";
import Input from "./components/Input";
import Output from "./components/Output";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";
import MoreInfo from "./components/MoreInfo";

function App() {
  const dark = useStore((state) => state.dark);

  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <Box flexDirection="column" className="App">
        <Box flex={1} overflow="auto">
          <Paper
            sx={{
              height: "100vh",
              // TODO change
            }}
          >
            <Header />
            <Grid container spacing={2} p={2}>
              <Input />
              <Output />
            </Grid>
            <MoreInfo />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
