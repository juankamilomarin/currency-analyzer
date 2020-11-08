// TODO Fix sorting
// TODO Add unit tests
export const stableSort = (array: any[], cmp: Function) : any[] => {
  const stabilizedThis = array.map((el: any, index: number) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export function validateAndRound (value: any, precision?: number): number {
    return value !== undefined && typeof value !== 'string' && value !== Infinity && !isNaN(value)
        ? Number(value.toFixed(precision || 2))
        : 0
}

export function getSortingFn (order: string, orderBy: string, alphaNumeric?: boolean) {
    return order === 'desc' ? (a: any, b: any) => descendingOrderBy(a, b, orderBy, alphaNumeric) : (a: any, b: any) => -descendingOrderBy(a, b, orderBy, alphaNumeric)
}

function descendingOrderBy (a: {[key: string]: number | string}, b: {[key: string]: number | string}, property: string, alphaNumeric?: boolean): number {
    if (alphaNumeric && typeof b[property] === 'string' && typeof a[property] === 'string') {
        return (b[property] as string).localeCompare((a[property] as string), 'en', { numeric: true })
    } else {
        if (b[property] < a[property]) {
        return -1
        }
        if (b[property] > a[property]) {
        return 1
        }
        return 0
    }
}