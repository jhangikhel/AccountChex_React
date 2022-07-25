import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { fillTemplate } from "../../../Shared/index";
import { API_PATH } from "../../../Constants/config";
import httpService from "../../../API/HttpService/httpService";
import { TableHead, Collapse, Box, Typography, Grid, Button } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FullWidthTabs from "../../../Components/TabPanel";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash, faEdit
} from "@fortawesome/free-solid-svg-icons";
import { ModalPopup } from "../../../Components/Control/ModalPopup";
import CustomizedSnackbars from './../../../Components/CustomizedSnackbars';
import { snackbarMessages } from "../../../Constants/errorMessage";
import AddIcon from "@material-ui/icons/Add";
import LoadingPage from './../../../Components/Control/LoadingPage';
import { ProjectTabsName } from "../ManageUsers/EmployeeTabs/EmployeeTabsDetails";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  root: {
    width: "100%",
    display: "block",
    background: "#fff",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "300",
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;


  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function ManageProject() {
  const classes = useStyles2();
  const history = useHistory();


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState(snackbarMessages.deleteSuccess);
  const [projectName, setProjectName] = React.useState("");
  const [isReload, setReload] = React.useState(true);
  const [selectedRowIndex, setselectedRowIndex] = React.useState(-1);
  const [selectedProjectId, setselectedProjectId] = React.useState(0);
  const handleClickOpen = (id, name) => {
    setProjectName(name);
    setDeleteId(id);
    setPopup(true);
  };

  const deleteProject = () => {
    httpService
      .delete(`${API_PATH.DELETE_PROJECT}${deleteId}`)
      .then((res) => {
        setMessage(snackbarMessages.deleteSuccess);
        setSnackbar(true);
        setReload(true);
      }).catch(err => {
        setMessage(snackbarMessages.deleteError);
        setSnackbar(true);
      });
    setPopup(false);
  }

  const cancelHandlePopup = () => {
    setPopup(false);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const userId = 1;
  let fillTemp = fillTemplate(API_PATH.GET_PROJECTS, "organizationId");

  useEffect(() => {
    if (isReload === true) {
      const apiPath = fillTemp(userId);
      httpService.get(apiPath).then((res) => {
        setRowData(res.data);
        setReload(false);
      });
    }
  }, [isReload]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onCreateHandler = () => {
    history.push('/createproject');
  };

  const closeSnackbar = () => {
    setSnackbar(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const openExpansionAndSetProjectId = (rowIndex, projectId) => {
    if (selectedRowIndex === rowIndex) {
      rowIndex = -1;
    }

    setselectedRowIndex(rowIndex);

    setselectedProjectId(projectId);
  }
  const tableObj = [{ title: 'Project Name', proopName: 'project_name' }];
  return rows.length === 0 ? <LoadingPage></LoadingPage> : (
    <>
      <Grid container spacing={2}>

        <Grid item xs={12} lg={12} sm={12} style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "0px", textTransform: "inherit" }}
            variant="contained"
            color="primary"
            onClick={onCreateHandler}
          >
            <AddIcon style={{ marginRight: "5px", marginLeft: "-5px" }} /> Add
            Project
          </Button>
        </Grid>

        <Grid item xs={12}>

          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  {/* {tableObj.map(({ title }) => <TableCell component="th" scope="row">{title}</TableCell>)} */}
                  <TableCell component="th" scope="row">
                    Project Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Account Manager
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Vendor
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Client
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Address
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Country
                  </TableCell>
                  <TableCell component="th" scope="row">
                    State
                  </TableCell>
                  <TableCell component="th" scope="row">
                    City
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Zipcode
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : rows
                ).map((row, idx) => (
                  <React.Fragment key={row.employee_key}>
                    <TableRow>
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => openExpansionAndSetProjectId(idx, row.project_id)}
                        >
                          {selectedRowIndex === idx ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                              <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete row" size="small" onClick={() => handleClickOpen(row.project_id, row.project_name)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                        <IconButton aria-label="edit row" size="small">
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                      </TableCell>
                      {/* {tableObj.map(({ proopName }) =>  <TableCell scope="row">{row[proopName]}</TableCell>)} */}
                      <TableCell scope="row">{row.project_name}</TableCell>
                      <TableCell scope="row">{row.account_manager}</TableCell>
                      <TableCell>{`${row.vendor_1} ${row.vendor_2 ? row.vendor_2 : ""}`}</TableCell>
                      <TableCell>{row.client}</TableCell>
                      <TableCell>
                        {`${row.work_address}`}
                      </TableCell>
                      <TableCell>{`${row.country}`}</TableCell>
                      <TableCell>{`${row.state}`}</TableCell>
                      <TableCell>{`${row.city}`}</TableCell>
                      <TableCell>{row.zipcode}</TableCell>
                      <TableCell>{`${row.description}`}</TableCell>
                    </TableRow>
                    { selectedRowIndex === idx &&
                      <TableRow key={idx}>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={12}
                        >
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Typography variant="h6" gutterBottom>
                                <FullWidthTabs
                                  tabs={ProjectTabsName}
                                  projectId={selectedProjectId}
                                ></FullWidthTabs>
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    }
                  </React.Fragment>
                ))}


              </TableBody>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  25,
                  { label: "All", value: -1 },
                ]}
                colSpan={13}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <CustomizedSnackbars open={snackbar} closeSnackbar={closeSnackbar} message={message} />
      <ModalPopup isPopupOpen={popup} cancelHandlePopup={cancelHandlePopup} submitHandlePopup={deleteProject} deleteName={projectName}></ModalPopup>
    </>
  );
}
