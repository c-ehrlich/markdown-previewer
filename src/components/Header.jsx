import * as React from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";

import yellow from "@material-ui/core/colors/yellow";
import blueGrey from "@material-ui/core/colors/blueGrey";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

import useStore from "../store";

export default function ButtonAppBar() {
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <FontAwesomeIcon icon={faMarkdown} /> Markdown Previewer
        </Typography>
        <IconButton area-label="light-mode" onClick={() => setDark(false)}>
          <WbSunnyIcon style={{ color: dark ? blueGrey[500] : yellow[200] }} />
        </IconButton>

        <Switch checked={dark} onChange={() => setDark(!dark)} name="gilad" />
        <IconButton area-label="dark-mode" onClick={() => setDark(true)}>
          <Brightness2Icon />
        </IconButton>
        {/* </Stack> */}
      </Toolbar>
    </AppBar>
  );
}
