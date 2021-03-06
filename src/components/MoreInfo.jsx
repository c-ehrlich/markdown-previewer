import { useState } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MoreInfo = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500);
  };

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardHeader
          title="What is Markdown?"
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
        />
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography gutterBottom>
              Markdown is a lightweight markup language for creating formatted
              text using a plain-text editor. John Gruber and Aaron Swartz (RIP)
              created Markdown in 2004 as a markup language that is appealing to
              human readers in its source code form. Markdown is widely used in
              blogging, instant messaging, online forums, collaborative
              software, documentation pages, and readme files. The initial
              description of Markdown contained ambiguities and raised
              unanswered questions. To correct these problems, later
              implementations introduced subtle differences from the original
              version as well as syntax extensions.
            </Typography>
            <Typography>
              GitHub had been using its own variant of Markdown since as early
              as 2009, adding support for additional formatting such as tables
              and nesting block content inside list elements, as well as
              GitHub-specific features such as auto-linking references to
              commits, issues, usernames, etc. In 2017, GitHub released a formal
              specification of their GitHub Flavored Markdown (GFM) that is
              based on CommonMark. It is a strict superset of CommonMark,
              following its specification exactly except for tables,
              strikethrough, autolinks and task lists, which GFM adds as
              extensions. GitHub also changed the parser used on their sites
              accordingly, which required that some documents be changed. For
              instance, GFM now requires that the hash symbol that creates a
              heading be separated from the heading text by a space character.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default MoreInfo;
