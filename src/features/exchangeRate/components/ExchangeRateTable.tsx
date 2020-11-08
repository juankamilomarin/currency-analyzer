import React from 'react'
import { makeStyles, useTheme, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { CustomTableProps, TableColumn } from '../../../common/components/types';
import { selectLoading, selectList, selectSelectedDate } from '../exchangeRateSlice';
import CustomTable from '../../../common/components/CustomTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
    })
);

export const TABLE_COLUMNS: TableColumn[] = [
    {
        id: 'origin',
        label: 'Origin',
        type: 'string',
        alignHeader: 'left',
        alignExpanded: 'right',
        alignBody: 'left',
    },
    {
        id: 'target',
        label: 'Target',
        type: 'string',
        alignHeader: 'left',
        alignExpanded: 'right',
        alignBody: 'left',
    },
    {
        id: 'rate',
        label: 'Rate',
        type: 'float',
        alignHeader: 'left',
        alignExpanded: 'right',
        alignBody: 'left',
    }
]

const ExchangeRateTable = () => {
    const classes = useStyles(useTheme());
    const exchangeRateList = useSelector(selectList); 
    const loading = useSelector(selectLoading);
    const selectedDate = useSelector(selectSelectedDate);
    const tableProps: CustomTableProps = {
        title: `Exchange Rates for ${selectedDate.toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })}`,
        data: exchangeRateList,
        orderBy: 'id',
        tableColumns: TABLE_COLUMNS,
        defaultRowsPerPage: 5,
        loading,
        expandable: false,
        paginated: true,
        onClickHandler: () => {}
    }

    return (
        <div className={classes.root}>
            {
                <React.Fragment>
                    <CustomTable {...tableProps} />
                </React.Fragment>
            }
        </div>
    )
}

export default ExchangeRateTable