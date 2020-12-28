import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import mainPageWrapper from './MainPageWrapper.jsx';
import AddItem from './ItemActionsPage/AddItem.jsx';
import EditItem from './ItemActionsPage/EditItem.jsx';
import { connect } from "react-redux";
import * as actions from '../actions'

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Имя' },
  { id: 'username', numeric: true, disablePadding: false, label: 'Никнейм' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Телефон' },
  { id: 'email', numeric: true, disablePadding: false, label: 'email' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    marginLeft: '20px',
    marginBottom: '10px'
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto'
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


const mapStateToProps = (state) => {
  return { contacts: state.items };
}

const actionsCreator = {
  fetchPosts: actions.fetchPosts,
  deleteItem: actions.deleteItem,
}

function Posts(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState('');


  React.useEffect(() => {
    const { fetchPosts } = props;
    fetchPosts();
  }, [])

  const rows = props.contacts;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const deleteItem = (id) => (e) => {
    e.preventDefault();
    props.deleteItem(id);
  }
  const searchHandle = () => (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchValue(value)
  }

  const renderItems = (list) => {
    return list.map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow key={row.id}>
          <TableCell padding="checkbox">
            <IconButton onClick={deleteItem(row.id)} >
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditItem item={row} />
            </IconButton>
          </TableCell>

          <TableCell component="th" id={labelId} scope="row" padding="none">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
        </TableRow>
      );
    });
  }

  let { contacts } = props;
  const classesToolbar = useToolbarStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          <Typography className={classesToolbar.title} variant="h6" id="tableTitle" component="div">
            Контакты
          </Typography>
          <AddItem />
          <Tooltip className={classesToolbar.search} title="">
            <TextField onInput={searchHandle()} id="outlined-basic" label="Поиск" variant="standard" />
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {searchValue.length > 0 ? 
              renderItems(contacts.filter(item => item.name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) 
              || item.username.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) )) :
              renderItems(contacts) }
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
const newPosts = mainPageWrapper(Posts);

const conntectedComponent = connect(mapStateToProps, actionsCreator)(newPosts);
export default conntectedComponent;