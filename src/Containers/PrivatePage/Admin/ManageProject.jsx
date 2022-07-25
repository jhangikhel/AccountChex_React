import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { fillTemplate } from './../../../Shared/index';
import { API_PATH } from './../../../Constants/config';
import httpService from '../../../API/HttpService/httpService';
import { TableHead, Collapse, Box, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FullWidthTabs from './../../../Components/TabPanel';
import { ProjectTabsName } from '../ManageUsers/EmployeeTabs/EmployeeTabsDetails';


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
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
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

export default function ManageEmployee() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRowData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedRowIndex, setselectedRowIndex] = React.useState(-1);
    const [selectedProjectId, setselectedProjectId] = React.useState(0);
    const userId = 1;
    let fillTemp = fillTemplate(API_PATH.GET_DRAFT_EMPLOYEE, "userId");
    const emptyRows = rowData &&
        rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);
    useEffect(() => {
        const apiPath = fillTemp(userId);
        httpService.get(apiPath).then(res => {
            setRowData(res.data);
        });
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" width="10px" scope="row"></TableCell>
                        <TableCell component="th" scope="row">Action</TableCell>
                        <TableCell component="th" scope="row">
                            EMP ID
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Name
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Vendor
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Wage Cycle
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Address
                        </TableCell>
                        <TableCell component="th" scope="row">
                            Tax Type
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, idx) => (
                        <React.Fragment key={row.employee_key}>
                            <TableRow >
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
                                <TableCell scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell>
                                    {`${row.first_name} ${row.middle_name} ${row.last_name}`}
                                </TableCell>
                                <TableCell>
                                    {row.country}
                                </TableCell>
                                <TableCell>
                                    {row.wage_cycle}
                                </TableCell>
                                <TableCell>
                                    {`${row.home_address} ${row.address_1} ${row.address_2}`}
                                </TableCell>
                                <TableCell>
                                    {`${row.tax_type}`}
                                </TableCell>
                            </TableRow>
                            { selectedRowIndex === idx &&
                                <TableRow key={idx}>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={7}
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
                    rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />

            </Table >
        </TableContainer >
    );
}
