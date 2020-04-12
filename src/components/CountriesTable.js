import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Chip from '@material-ui/core/Chip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/textField';
import Tooltip from '@material-ui/core/Tooltip';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
// {country,cases,deaths,recovered,todayCases,todayDeaths}
const headCells = [
  {
    id: 'country',
    numeric: false,
    disablePadding: true,
    label: 'Countries',
  },
  { id: 'cases', numeric: true, disablePadding: false, label: 'Cases' },
  { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
  { id: 'recovered', numeric: true, disablePadding: false, label: 'Recovered' },
  {
    id: 'todayCases',
    numeric: true,
    disablePadding: false,
    label: "Today's Cases",
  },
  {
    id: 'todayDeaths',
    numeric: true,
    disablePadding: false,
    label: "Today's Deaths",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: 'bold' }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        id="tableTitle"
        component="div">
        Countries Breakdown
      </Typography>
      <Tooltip title="Filter list">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            color="secondary"
            size="small"
            helperText="Search"
            onChange={(e) => props.setFilterBy(e.target.value.toLowerCase())}
          />
        </form>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CountriesTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('cases');
  const [filterBy, setFilterBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const { countryData } = useContext(DataContext);

  let rows = countryData
    .filter((item) => item.country.toLowerCase().includes(filterBy))
    .map((filtered) => {
      return filtered;
    });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar setFilterBy={setFilterBy} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row._id}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default">
                        <Chip
                          variant="outlined"
                          size="small"
                          avatar={<Avatar src={row.flag} />}
                          label={row.country}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {row.cases.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {row.deaths.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {row.recovered.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {row.todayCases.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {row.todayDeaths.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
