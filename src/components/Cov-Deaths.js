import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
const useStyles = makeStyles({
  root: {
    maxHeight: "90vh",
    overflow: "auto",
  },
  content: {
    height: "auto",
    maxHeight: "100vh",
  },
  header: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    fontSize: 14,
  },
  list: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: "100%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
});
function CovDeaths() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <ListSubheader className={classes.header}>
        <div className="stickyHeader" style={{ backgroundColor: "#222327" }}>
          <Box bgcolor="#222327">
            <Typography
              variant="button"
              display="block"
              component="h6"
              color="error.main"
            >
              <Box color="error.main">Decessi totali</Box>
            </Typography>
            <Typography variant="h3" component="h3">
              2.777.188
            </Typography>
          </Box>
        </div>
      </ListSubheader>
      <CardContent className={classes.content}>
        <List className={classes.list} subheader={<li />}>
          {[0, 1, 2, 3, 4].map((sectionId) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}>
                {[0, 1, 2].map((item) => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default CovDeaths;
