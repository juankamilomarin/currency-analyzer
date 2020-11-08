import React, { useState } from 'react'
import { Table, Paper, TablePagination, Typography } from '@material-ui/core'
import { makeStyles, useTheme, createStyles, Theme } from '@material-ui/core/styles';
import CustomTableHeader from './CustomTableHeader'
import CustomTableBody from './CustomTableBody'
import LoadingSpinner from './LoadingSpinner'
import { CustomTableProps } from './types'
// TODO Fix table location when there is only one row (it should be at the top)
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
            tableRoot: {
            padding: 2,
        },
        title: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(0.5),
            paddingLeft: theme.spacing(3),
            fontSize: '23.04px',
            fontWeight: 'bold'
        },
            noDataWrapper: {
            minWidth: 1020,
            minHeight: 300
        },
            noData: {
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(5),
            color: theme.palette.grey['900']
        },
            table: {
            minWidth: 1020,
        },
            tableWrapper: {
            overflowX: 'auto'
        },
    })
);

const defaultRowsPerPage = 10
export default function CustomTable(props: CustomTableProps){
    const classes = useStyles(useTheme())
    const [order, setOrder] = useState<'desc'|'asc'>('desc')
    const [orderBy, setOrderBy] = useState(props.orderBy)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(props.defaultRowsPerPage ? props.defaultRowsPerPage : defaultRowsPerPage)

    const  handleSortChange = (property: string) => {
         if (orderBy === property && order === 'desc') setOrder('asc')
        setOrder(order)
        setOrderBy(orderBy)
    }
    const handleChangePage = (event: any, page: number) => setPage(page)
    const handleChangeRowsPerPage = (event: any) => setRowsPerPage(event.target.value)

    const { tableColumns, data, loading, title, expandable, paginated, showTotalsRow, totals, onRowExpand, onClickHandler } = props

    if (loading) {
      return (
        <Paper className={classes.root}>
          <LoadingSpinner style = {{ height: '400px'}}/>
        </Paper>
      )
    } else if (data.length === 0) {
      return (
        <Paper className={classes.root}>
          <div className={classes.noDataWrapper}>
            <Typography variant='h5' className={classes.title}>{title}</Typography>
            <Typography variant='body1' className={classes.noData}>{ 'Sorry, there is no data to display' }</Typography>
          </div>
        </Paper>
      )
    }
    return (
      <div className={classes.tableRoot}>
        <div className={classes.tableWrapper}>
          <Typography variant='h5' className={classes.title}>{title}</Typography>
          <Table className={classes.table}>
            <CustomTableHeader
              tableColumns={tableColumns}
              order={order}
              orderBy={orderBy}
              handleSortChange={handleSortChange}
            />
            <CustomTableBody
              tableColumns={tableColumns}
              data={data}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              expandable={expandable}
              showTotalsRow={showTotalsRow}
              totals={totals}
              onRowExpand={onRowExpand}
              onClickHandler={onClickHandler}
            />
          </Table>
        </div>
        {paginated
          ? <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          : null
        }

      </div>
    )
}