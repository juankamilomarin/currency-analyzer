import React, { Fragment, useState } from 'react'
import { TableBody, TableRow, TableCell, Typography, Grid, IconButton} from '@material-ui/core'
import { makeStyles, useTheme, createStyles, Theme } from '@material-ui/core/styles';
import { KeyboardArrowRight as ArrowRightIcon, KeyboardArrowDown as ArrowDownIcon } from '@material-ui/icons'
import { blue } from '@material-ui/core/colors'
import { validateAndRound, getSortingFn, stableSort } from "./helpers";
import LoadingSpinner from './LoadingSpinner'
import { TableColumn, AlignType, CustomTableBodyProps } from './types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        groupName: {
            whiteSpace: 'nowrap',
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(1),
            color: blue['700']
        }
    })
);

const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ]
const formatTableCellValue = (value: string, type: string) => {
  switch (type) {
    case 'integer':
      return validateAndRound(value, 0).toLocaleString()
    case 'date':
      const date = new Date(value)
      return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`
    case 'string':
    default:
      return value
  }
}

const handleExpandRow = (group: string, expandedRows: string[], setExpandedRows: Function, report: any, onRowExpand?: Function) => {
  let temp = [...expandedRows]
  let openRow = false
  if (temp.find(r => r === group) === null || temp.find(r => r === group) === undefined) {
    temp.push(group)
    openRow = false
  } else {
    temp = temp.filter(r => r !== group)
    openRow = true
  }
  if (onRowExpand && !openRow) {
    onRowExpand(report)
  }
  setExpandedRows(temp)
}

const isRowExpanded = (group: string, expandedRows: string[]) => expandedRows.find(r => r === group) !== null && expandedRows.find(r => r === group) !== undefined

const renderGroup = (report: any, props: CustomTableBodyProps, expandedRows: string[], setExpandedRows: Function, classes: Record<string, string>) => {
  return (
    <Grid container direction='row' wrap='nowrap'>
      <Grid item>
        <IconButton onClick={() => handleExpandRow(report.groupName, expandedRows, setExpandedRows, report, props.onRowExpand)}>
          {isRowExpanded(report.groupName, expandedRows) ? <ArrowDownIcon fontSize='inherit'/> : <ArrowRightIcon fontSize='inherit'/>}
        </IconButton>
      </Grid>
      <Grid item>
        <Typography className={classes.groupName}>{report.groupName}</Typography>
      </Grid>
    </Grid>
  )
}

const totalsRow = (props: CustomTableBodyProps, classes: Record<string, string>) => {
  const { totals, tableColumns } = props
  if (props.showTotalsRow) {
    return (
      <TableRow key='totals-row'>
        <TableCell align='left'>
          <Typography className={classes.total}>
            { "Total" }
          </Typography>
        </TableCell>
        {tableColumns.map((tableColumn: TableColumn, index: number) =>
        index !== 0 
        ? <TableCell key={`total-${index}`} align='center'>
            {formatTableCellValue(totals[tableColumn.id], tableColumn.type)}
          </TableCell>
          : null
        )}
      </TableRow>
    )
  }
}

const getAlignmentForExpandedRow = (index: number, column: TableColumn): AlignType => {
  if (column.alignExpanded) {
    return column.alignExpanded
  } else if (index === 0) {
    return 'left'
  } else {
    return 'center'
  }
}

const renderExpandedRow = (report: any, props: any, index: number) => {
  const { tableColumns } = props
  return (
    <TableRow key={`expanded-row-${index}`}>
      {tableColumns.map((tableColumn: TableColumn, index: number) =>
        <TableCell key={`${index}-${report.groupName}`} align={getAlignmentForExpandedRow(index, tableColumn)}>
          {tableColumn.component || tableColumn.hideWhenExpanded
            ? null
            : formatTableCellValue(report[tableColumn.id], tableColumn.type)
          }
        </TableCell>
      )}
    </TableRow>
  )
}

const renderRow = (report: any, props: CustomTableBodyProps, expandedRows: string[], setExpandedRows: Function, classes: Record<string, string>): any => {
    const handlerWrapper = () => props.onClickHandler(report.id)
    return (
        <TableRow hover tabIndex={-1} onClick={ handlerWrapper }>
        {props.tableColumns.map((tableColumn: TableColumn, columnIndex: number) => {
            return (
            <TableCell key={`generic-table-${columnIndex}`} align={tableColumn.alignBody || 'right'}>
                {columnIndex === 0 && props.expandable
                ? renderGroup(report, props, expandedRows, setExpandedRows, classes)
                : tableColumn.component
                    ? tableColumn.component(report[tableColumn.id])
                    : formatTableCellValue(report[tableColumn.id], tableColumn.type)
                }
            </TableCell>
            )
        })}
        </TableRow>
    )
}

const handleExpandedRow = (props: CustomTableBodyProps, expandedRows: string[], report: any, rowCounter: number, innerData: any[]) => {
  if (report.loading) {
    return (
    <TableRow key={`loading-row-${rowCounter}`}>
      <TableCell>
        <LoadingSpinner />
      </TableCell>
    </TableRow>)
  } else if (innerData.length) {
    return expandedRows.find((r) => r === report.groupName) && 
    innerData.map((innerReport: any, index: number) => renderExpandedRow(innerReport, props, index))
  }
}

const renderRows = (props: CustomTableBodyProps, expandedRows: string[], setExpandedRows: Function, classes: Record<string, string>) => {
  const { data, order, orderBy, rowsPerPage, page, expandable } = props
  return stableSort(data, getSortingFn(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((report: any, rowCounter: number) => {
      let sortedData: any[] = []
      if (expandable && report.data) {
        sortedData = report.data.sort(getSortingFn('asc', 'day', false))
      }
      return (
        <Fragment key={`generic-table-body-fragment${rowCounter}`}>
          {renderRow(report, props, expandedRows, setExpandedRows, classes)}
          {handleExpandedRow(props, expandedRows, report, rowCounter, sortedData)}
        </Fragment>
      )
    }
    )
}

export default function CustomTableBody(props: CustomTableBodyProps){
    const classes = useStyles(useTheme())
    const [expandedRows, setExpandedRows] = useState([])

    return (
    <TableBody key={Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}>
        {renderRows(props, expandedRows, setExpandedRows, classes)}
        {totalsRow(props, classes)}
    </TableBody>
    )
}

