import "./App.css";

import useStore from "./store";

import Header from "./components/Header";
import Input from "./components/Input";
import Output from "./components/Output";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import MoreInfo from "./components/MoreInfo";

function App() {
  const dark = useStore((state) => state.dark);

  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box flexDirection="column" className="App" sx={{ minHeight: "100vh", bgcolor: dark ? "#000" : "#f8fcff" }}>
        <Box flex={1} overflow="auto" >
          <Header />
          <Grid
            container
            p={2}
            spacing={2}
            sx={{ marginTop: 1 }}
          >
            <Input />
            <Output />
            <MoreInfo />
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
