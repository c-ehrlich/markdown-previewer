import * as React from "react";

import {
  AppBar,
  Box,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

import useStore from "../store";

export default function ButtonAppBar() {
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <FontAwesomeIcon icon={faMarkdown} />  Markdown Previewer
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={dark}
                onChange={() => setDark(!dark)}
                name="gilad"
              />
            }
            labelPlacement="start"
            label={ dark ? "Dark Mode" : "Light Mode" }
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
