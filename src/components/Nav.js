import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import ColorizeIcon from "@material-ui/icons/Colorize";
import CommuteIcon from "@material-ui/icons/Commute";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const history = useHistory();
  const [drawer, setDrawer] = useState({ open: false });
  const toggleDrawer = (status) => {
    setDrawer({ open: status });
  };
  const redirectToPath = (path) => {
    history.push(path);
    toggleDrawer(false);
  };
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar color="primary">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Covid tracker
        </Typography>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawer.open}
        onClose={() => toggleDrawer(false)}
      >
        <div className={classes.list}>
          <List component="nav" aria-label="casi e decessi">
            <ListItem button>
              <ListItemIcon>
                <ArtTrackIcon />
              </ListItemIcon>
              <ListItemText
                primary="casi e decessi"
                onClick={() => redirectToPath("/")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ColorizeIcon />
              </ListItemIcon>
              <ListItemText
                primary="dosi vaccini somministrati"
                onClick={() => redirectToPath("/coverage")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CommuteIcon />
              </ListItemIcon>
              <ListItemText
                primary="trend di mobilità legati al COVID-19"
                onClick={() => redirectToPath("/mobility")}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default Nav;
