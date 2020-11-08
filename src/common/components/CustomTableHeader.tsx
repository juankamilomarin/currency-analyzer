import React from 'react'
import { TableHead, TableCell, Tooltip, TableSortLabel } from '@material-ui/core'
import { TableColumn, CustomTableHeaderProps } from './types'

export default function CustomTableHeader(props: CustomTableHeaderProps){
  const { order, orderBy, tableColumns, handleSortChange } = props
  return (
    <TableHead>
      <tr id='header-container'>
      {tableColumns.map((column: TableColumn) =>
        <TableCell
          key={column.id}
          align={column.alignHeader || 'right'}
          sortDirection={orderBy === column.id ? order : false}
        >
          <Tooltip
            title='Sort'
            placement='bottom-start'
            enterDelay={300}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={() => handleSortChange(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      )}
      </tr>
    </TableHead>
  )
}
