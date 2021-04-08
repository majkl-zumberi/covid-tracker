import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import React, { useEffect, useState } from "react";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    padding: ".5em",
  },
  dialogContent: {
    display: "flex",
    justifyContent: "center",
  },
  chipContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
const MobilityDialog = ({
  handleClose,
  open,
  loading,
  data,
  handleSelected,
}) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectableData, setSelectableData] = useState([]);

  useEffect(() => {
    const mappedSubregions =
      data?.subregions &&
      data?.subregions.map((sub) => {
        return { subregionName: sub, selected: false };
      });
    setSelectableData(mappedSubregions);
  }, [data]);

  const toggleSubregionStatus = (subregionName) => {
    setSelectableData((prevState) => {
      const index = prevState.findIndex(
        (subregion) => subregion.subregionName === subregionName
      );
      const newstate = [...prevState];
      newstate[index] = {
        ...newstate[index],
        selected: !newstate[index].selected,
      };
      return [...newstate];
    });
  };

  const deselectAll = () => {
    setSelectableData((prevState) => {
      const newstate = [...prevState];
      return newstate.map((subregion) => ({
        subregionName: subregion.subregionName,
        selected: false,
      }));
    });
  };

  // get selected subregions as string (subregions separated by commas)
  const getSelectedSubregions = () => {
    return selectableData
      .filter((data) => data.selected)
      .map(({ subregionName }) => subregionName)
      .join(",");
  };

  /**
   * check selected subregion array
   * if it's empty gives an error
   * otherwhise return function to its parent
   */
  const submitSubregions = () => {
    const selected = selectableData.filter((data) => data.selected);
    selected.length === 0 && setSnackbarOpen(true);
    selected.length > 0 && handleSelected(getSelectedSubregions());
  };

  const renderData = (loading) => {
    if (loading) {
      return <CircularProgress color="inherit" />;
    }
    return (
      <React.Fragment>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <div className={classes.chipContainer}>
              {selectableData &&
                selectableData.map((subregion) => {
                  return (
                    <Chip
                      color={subregion.selected ? "secondary" : "default"}
                      key={subregion.subregionName}
                      label={subregion.subregionName}
                      onClick={() =>
                        toggleSubregionStatus(subregion.subregionName)
                      }
                      clickable
                    />
                  );
                })}
            </div>
          </FormControl>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="error">Seleziona almeno una città</Alert>
        </Snackbar>
      </React.Fragment>
    );
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Typography variant="h6" gutterBottom>
          {data.country} seleziona le città di cui vuoi esaminarne la mobilità
        </Typography>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          alcuni paesi potrebbero <strong>non avere</strong> la possibilità di
          selezionare le città ma solo l&apos;opzione &quot;all&quot; per
          visualizzare complessivamente l&apos;andamento del paese selezionato
        </Alert>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {renderData(loading)}
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={() => deselectAll()}>
          Deseleziona Tutto
        </Button>
        <Button onClick={handleClose}>Annulla</Button>
        <Button disabled={loading} onClick={() => submitSubregions()}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
MobilityDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  handleSelected: PropTypes.func.isRequired,
};
export default MobilityDialog;
