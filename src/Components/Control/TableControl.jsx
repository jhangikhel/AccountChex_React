import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import {
    TableHead,
    Collapse,
    Box,
    Typography,
    Grid,
    Link,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { EmployeeTabsName } from './../../Containers/PrivatePage/ManageUsers/EmployeeTabs/EmployeeTabsDetails';
import FullWidthTabs from './../TabPanel';
import LoadingPage from './LoadingPage';

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

export default function TableControl({ rowData, columnsToView, id1, id2, getData, id3, id4 }) {
    const classes = useStyles2();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [selectedEmpId, setselectedEmpId] = React.useState(0);
    const [selectedVendorId, setselectedVendorId] = React.useState(0);
    const [selectedProjectId, setselectedProjectId] = React.useState(0);
    const [selectedClientId, setselectedClientId] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [selectedRowIndex, setselectedRowIndex] = React.useState(-1);
    const emptyRows = rowData &&
        rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getData(0, 20, 0);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getData(0, 20, 0);
    };

    const onCreateHandler = () => {
        history.push("/createemployee");
    };
    const openExpansionAndSetEmpId = (rowIndex, empId, vendorId, projectId, clientId) => {
        if (selectedRowIndex === rowIndex) {
            rowIndex = -1;
        }
        setselectedRowIndex(rowIndex);

        setselectedEmpId(empId);
        setselectedVendorId(vendorId);
        setselectedProjectId(projectId);
        setselectedClientId(clientId)
    }
    return (
        <React.Fragment>
            {
                rowData ?

                    <Grid container spacing={2}>
                        < Grid item xs={12} lg={12} sm={12} style={{ textAlign: "right" }
                        }>
                            <Link
                                style={{ marginRight: "0px", textTransform: "inherit" }}
                                component="button"
                                variant="body2"
                                color="primary"
                                onClick={onCreateHandler}
                            >
                                <AddIcon style={{ marginRight: "5px", marginLeft: "-5px" }} /> Add
            Employee
          </Link>
                        </Grid >
                        <Grid item xs={12} lg={12} sm={12}>
                            <TableContainer className="tableHolder" component={Box}>
                                <Table
                                    className={classes.table}
                                    aria-label="custom pagination table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell component="th" scope="row"></TableCell>
                                            {
                                                columnsToView.map((emp, index) => <TableCell key={index} component="th" scope="row">{emp.label} </TableCell>)
                                            }

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? rowData.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : rowData
                                        ).map((row, idx) => (
                                            <React.Fragment key={row.employee_key}>
                                                <TableRow >
                                                    <TableCell>
                                                        <IconButton
                                                            aria-label="expand row"
                                                            size="small"
                                                            onClick={() => openExpansionAndSetEmpId(idx, row[id1], row[id2], row[id3], row[id4])}
                                                        >
                                                            {selectedRowIndex === idx ? (
                                                                <KeyboardArrowUpIcon />
                                                            ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                )}
                                                        </IconButton>
                                                    </TableCell>
                                                    {
                                                        columnsToView.map((emp, index) => <TableCell key={index}>{row[emp.key]} </TableCell>)
                                                    }

                                                </TableRow>
                                                {selectedRowIndex === idx &&
                                                    <TableRow key={idx}>
                                                        <TableCell
                                                            style={{ paddingBottom: 0, paddingTop: 0 }}
                                                            colSpan={7}
                                                        >
                                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                                <Box margin={1}>
                                                                    <Typography variant="h6" gutterBottom>
                                                                        <FullWidthTabs
                                                                            tabs={EmployeeTabsName}
                                                                            detailId={selectedEmpId}
                                                                            vendorId={selectedVendorId}
                                                                            projectId={selectedProjectId}
                                                                            clientId={selectedClientId} ></FullWidthTabs>
                                                                    </Typography>
                                                                </Box>
                                                            </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            </React.Fragment>
                                        ))}

                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={4} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                                                count={rowData.length}
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
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid > : <LoadingPage></LoadingPage>

            }
        </React.Fragment>
    )
}
