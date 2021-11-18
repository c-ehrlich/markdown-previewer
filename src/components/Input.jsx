import useStore from "../store";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

const Input = (props) => {
  const text = useStore((state) => state.text);
  const setText = useStore((state) => state.setText);

  return (
    <Grid item xs={12} md={6} sx={{ height: "auto" }}>
      <Card variant="outlined">
        <CardHeader
          title="Editor"
          action={
            <Tooltip title="Clear Text" arrow>
              <IconButton area-label="clear text" onClick={() => setText("")}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <CardContent>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="editor"
            fullWidth
            multiline
            rows={16}
            label="Markdown"
            variant="filled"
            inputProps={{style: {fontFamily: "Monospace"}}}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Input;
