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
import {
  TableHead,
  Collapse,
  Box,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FullWidthTabs from "../../../Components/TabPanel";
import { useHistory } from 'react-router-dom';
import { snackbarMessages } from "../../../Constants/errorMessage";
import CustomizedSnackbars from '../../../Components/CustomizedSnackbars';
import { ModalPopup } from '../../../Components/Control/ModalPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash, faEdit
} from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import LoadingPage from '../../../Components/Control/LoadingPage';

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

export default function ManageTimesheet() {
    const classes = useStyles2();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRowData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [popup, setPopup] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [snackbar, setSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState(snackbarMessages.deleteSuccess);
    const [projectName, setProjectName] = React.useState("");
    const [isReload, setReload] = React.useState(true);

    const handleClickOpen = (id,name) => {
        setProjectName(name);
        setDeleteId(id);
        setPopup(true);
    };

    const deleteProject = () => {
        httpService
        .delete(`${API_PATH.DELETE_CLIENT}${deleteId}`)
        .then((res) => {
            setMessage(snackbarMessages.deleteSuccess);
            setSnackbar(true);
            setReload(true);
        }).catch(err=>{
            setMessage(snackbarMessages.deleteError);
            setSnackbar(true);
        });
        setPopup(false);
    }

    const closeSnackbar = () => {
        setSnackbar(false);
    };

    const cancelHandlePopup = () => {
        setPopup(false);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const userId = 1;
    let fillTemp = fillTemplate(API_PATH.GET_CLIENTS, "organizationId");

  useEffect(() => {
      if(isReload === true){
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

    const onCreateHandler = ()=>{
        history.push('/createtimesheet');
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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
            Timesheet
          </Button>
        </Grid>
                <Grid item item xs={12} lg={12} sm={12} style={{"display":"none"}}>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="custom pagination table"
                        >
                            <TableHead>
                                <TableRow>
                                <TableCell component="th" width="10px" scope="row"></TableCell>
                                    <TableCell component="th" scope="row">Action</TableCell>
                                    {/* {tableObj.map(({ title }) => <TableCell component="th" scope="row">{title}</TableCell>)} */}
                                    <TableCell component="th" scope="row">
                                         Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Board No.
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
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    : rows
                                ).map((row) => (
                                    <TableRow key={row.employee_key}>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="delete row" size="small" onClick={() => handleClickOpen(row.id,row.name)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                            <IconButton aria-label="edit row" size="small">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                        </TableCell>
                                        {/* {tableObj.map(({ proopName }) =>  <TableCell scope="row">{row[proopName]}</TableCell>)} */}
                                        <TableCell scope="row">{row.name}</TableCell>
                                        <TableCell scope="row">{row.board_numer}</TableCell>
                                        <TableCell scope="row">{row.vendor_1 }</TableCell>
                                        <TableCell scope="row">{row.email_id}</TableCell>
                                        <TableCell scope="row">{row.website_url}</TableCell>
                                        <TableCell>{`${row.address_1 != null ?row.address_1 :"" } ${row.address_2 != null ? row.address_2 : ""}`}</TableCell>
                                        <TableCell>{`${row.country}`}</TableCell>
                                        <TableCell>{`${row.state}`}</TableCell>
                                        <TableCell>{`${row.city}`}</TableCell>
                                        <TableCell>{row.zip_code}</TableCell>
                                        </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={5}
                                    >
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    <FullWidthTabs></FullWidthTabs>
                                                </Typography>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TablePagination
                                        rowsPerPageOptions={[
                                            10,
                                            25,
                                            { label: "All", value: -1 },
                                        ]}
                                       
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
            <CustomizedSnackbars open={snackbar} closeSnackbar={closeSnackbar} message={message}/>
            <ModalPopup isPopupOpen={popup} cancelHandlePopup={cancelHandlePopup} submitHandlePopup={deleteProject} deleteName={projectName}></ModalPopup>
        </>
    );
}
