import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Collapse,
  Box,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import  FirstPageIcon  from "@material-ui/icons/FirstPage";
import { fillTemplate } from "../../../Shared/index";
import { API_PATH } from "../../../Constants/config";
import httpService from "../../../API/HttpService/httpService";
import FullWidthTabs from "../../../Components/TabPanel";
import { useHistory } from "react-router-dom";
import { snackbarMessages } from "../../../Constants/errorMessage";
import CustomizedSnackbars from "./../../../Components/CustomizedSnackbars";
import { ModalPopup } from "./../../../Components/Control/ModalPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import LoadingPage from "./../../../Components/Control/LoadingPage";
import { VendorTabsName } from "../ManageUsers/EmployeeTabs/EmployeeTabsDetails";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import moment from "moment";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
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

export default function ManageVendor() {
  const classes = useStyles2();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = React.useState(null);
  const [popup, setPopup] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState(snackbarMessages.deleteSuccess);
  const [projectName, setProjectName] = React.useState("");
  const [selectedRowIndex, setselectedRowIndex] = React.useState(-1);
  const [selectedVendorId, setselectedVendorId] = React.useState(0);
  const [take, setTake] = React.useState(5);
  const [skip, setSkip] = React.useState(0);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const openExpansionAndSetVendorId = (rowIndex, vendorId) => {
    if (selectedRowIndex === rowIndex) {
      rowIndex = -1;
    }

    setselectedRowIndex(rowIndex);

    setselectedVendorId(vendorId);
  };
  const handleClickOpen = (id, name) => {
    setPopup(true);
    setProjectName(name);
    setDeleteId(id);
  };

  const deleteProject = () => {
    httpService
      .delete(`${API_PATH.DELETE_VENDOR}${deleteId}`)
      .then(() => {
        setRowData([]);
        setSkip(0);
        setPopup(false);
        setTotalRecords(0);
        setMessage("Vendor Succssfully Deleted");
        setSnackbar(true);
        getVendors();
      })
      .catch((err) => {
        setMessage(snackbarMessages.deleteError);
        setSnackbar(true);
        setPopup(false);
      });
  };

  const closeSnackbar = () => {
    setSnackbar(false);
  };

  const cancelHandlePopup = () => {
    setPopup(false);
  };

  const getVendors = () => {
    const apiPath = API_PATH.GET_VENDORS;
    httpService.get(`${apiPath}?take=${take}&skip=${skip}`).then((res) => {
      setRowData(res.data.data);
      setTotalRecords(res.data.count);
    });
  };
  useEffect(() => {
    getVendors();
  }, [skip]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
    setSkip(newPage * take);
  };

  const onCreateHandler = () => {
    history.push("/createvendor");
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const tableObj = [{ title: "Project Name", proopName: "project_name" }];

  console.log(rows);
  return rows === null ? (
    <LoadingPage></LoadingPage>
  ) : (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "0px", textTransform: "inherit" }}
            variant="contained"
            color="primary"
            onClick={onCreateHandler}
          >
            <AddIcon style={{ marginRight: "5px", marginLeft: "-5px" }} /> Add
            Vendor
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
                  <TableCell
                    component="th"
                    width="10px"
                    scope="row"
                  ></TableCell>
                  <TableCell component="th" scope="row">
                    Action
                  </TableCell>
                  {/* {tableObj.map(({ title }) => <TableCell component="th" scope="row">{title}</TableCell>)} */}
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Vendor
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Email ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Website URl
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
                    Created By
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Updated By
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
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            openExpansionAndSetVendorId(idx, row.id)
                          }
                        >
                          {selectedRowIndex === idx ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                          {/* */}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete row"
                          size="small"
                          onClick={() => handleClickOpen(row.id, row.name)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                        <IconButton aria-label="edit row" size="small">
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                      </TableCell>

                      <TableCell scope="row">{row.name}</TableCell>
                      <TableCell scope="row">
                        {row.parent && row.parent.name}
                      </TableCell>
                      <TableCell scope="row">{row.emailId}</TableCell>
                      <TableCell scope="row">{row.websiteUrl}</TableCell>
                      <TableCell>{`${
                        row.address1 != null ? row.address1 : ""
                      } ${
                        row.address2 != null ? row.address2 : ""
                      }`}</TableCell>
                      <TableCell>{`${row.country.name}`}</TableCell>
                      <TableCell>{`${row.state.name}`}</TableCell>
                      <TableCell>{`${row.city.name}`}</TableCell>
                      <TableCell>{row.zipCode}</TableCell>
                      <TableCell>{row.account.name}</TableCell>
                      <TableCell>
                        {moment(row.creationTime).isValid() &&
                          moment(row.creationTime).format(
                            "MM-DD-yyyy hh:mm:ss A"
                          )}
                      </TableCell>
                    </TableRow>
                    {totalRecords === idx + 1 && (
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={13}
                          count={totalRecords}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          //ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    )}
                    {selectedRowIndex === idx && (
                      <TableRow key={idx}>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={12}
                        >
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Typography variant="h6" gutterBottom>
                                <FullWidthTabs
                                  tabs={VendorTabsName}
                                  vendorId={selectedVendorId}
                                ></FullWidthTabs>
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
              {/*    <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : rows
                ).map((row, idx) => (
                  <React.Fragment key={row.employee_key}>
                    <TableRow >
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => openExpansionAndSetVendorId(idx, row.id)}
                        >
                          {selectedRowIndex === idx ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                              <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                      </TableCell>
                    
                   
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
                                  tabs={VendorTabsName}
                                  vendorId={selectedVendorId}
                                ></FullWidthTabs>
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    }
                  </React.Fragment>
                ))}


              </TableBody>*/}
              {/* */}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <CustomizedSnackbars
        open={snackbar}
        closeSnackbar={closeSnackbar}
        message={message}
      />
      <ModalPopup
        isPopupOpen={popup}
        cancelHandlePopup={cancelHandlePopup}
        submitHandlePopup={deleteProject}
        deleteName={projectName}
      ></ModalPopup>
    </div>
  );
}
