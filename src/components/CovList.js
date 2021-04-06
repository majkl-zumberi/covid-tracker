import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "90vh",
    overflow: "auto",
    scrollbarColor: "gray transparent",
  },
  content: {
    height: "auto",
    [theme.breakpoints.down("xl")]: {
      maxHeight: "90vh",
    },
    [theme.breakpoints.down("lg")]: {
      maxHeight: "70vh",
    },
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
  primary: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "3.5rem",
    },
  },
  secondary: {
    [theme.breakpoints.down("sm")]: {
      margin: "3.5rem  0",
    },
  },
}));
const renderData = (items, focus, onSelectListItem) => {
  const avatarClass = {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "2.5rem",
  };
  return items.map((item, idx) => {
    return (
      <ListItem
        key={item?.countryInfo?._id ?? idx}
        onClick={() => onSelectListItem(item.country)}
      >
        <ListItemAvatar>
          <Box style={avatarClass}>
            <Avatar
              variant="rounded"
              alt={item.country}
              src={
                item?.countryInfo?.flag ??
                "https://disease.sh/assets/img/flags/unknown.png"
              }
            />
            <p style={{ margin: "0 .5rem" }}>{idx + 1}</p>
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={item.country}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {item[focus] && item[focus].toLocaleString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  });
};
// eslint-disable-next-line no-unused-vars
function CovList({
  title,
  total,
  items,
  titleColor,
  focus,
  classType,
  onSelectListItem,
}) {
  const classes = useStyles();
  return (
    <Card className={[classes.root, classes[classType]].join(" ")}>
      <ListSubheader className={classes.header}>
        <div className="stickyHeader" style={{ backgroundColor: "#222327" }}>
          <Box bgcolor="#222327">
            <Typography
              variant="button"
              display="block"
              component="h6"
              color="error.main"
            >
              <Box color={titleColor}>{title}</Box>
            </Typography>
            <Typography variant="h4" component="h4">
              {total}
            </Typography>
          </Box>
        </div>
      </ListSubheader>
      <CardContent className={classes.content}>
        <List className={classes.list} subheader={<li />}>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              {renderData(items, focus, onSelectListItem)}
            </ul>
          </li>
        </List>
      </CardContent>
    </Card>
  );
}
CovList.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleColor: PropTypes.string.isRequired,
  focus: PropTypes.string.isRequired,
  classType: PropTypes.string.isRequired,
  items: PropTypes.array,
  onSelectListItem: PropTypes.func,
};
export default CovList;
