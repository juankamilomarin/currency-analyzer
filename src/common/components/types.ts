//
// Loading Spinner
// ----------------------------------------------------------------------

export interface LoadingSpinnerProps {
    className?: string;
    style?: React.CSSProperties | undefined
}


//
// Custom Table
// ----------------------------------------------------------------------

export type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'
export type TableColumnType = 'string' | 'integer' | 'float' | 'percent' | 'monetary' | 'date'

export interface TableColumn{
    id: string;
    label: string;
    type: TableColumnType;
    component?: Function;
    alignHeader: AlignType;
    alignBody: AlignType;
    alignExpanded?: AlignType;
    hideWhenExpanded?: boolean; 
}

type TableOrder = { order: 'desc' | 'asc'; }

interface BaseTableProps{
    tableColumns: TableColumn[];
    orderBy: string;
}

interface BaseCustomTableProps{
    data: any[];
    expandable: boolean;
    showTotalsRow?: boolean;
    onRowExpand?: Function;
    totals?: any;
    onClickHandler: (rowId: number) => void
}

export interface CustomTableProps extends BaseTableProps, BaseCustomTableProps{
    title: string;
    loading: boolean;
    paginated: boolean;
    defaultRowsPerPage?: number;
}

export interface CustomTableBodyProps extends BaseTableProps, BaseCustomTableProps, TableOrder{
    page: number;
    rowsPerPage: number;
}

export interface CustomTableHeaderProps extends BaseTableProps, TableOrder{
    handleSortChange: (arg: string) => void
}
