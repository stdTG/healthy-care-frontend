import { useContext } from 'react'
import { TablePagination } from '@material-ui/core';
import { TableContext } from '../index'

export const Pagination = () => {
    const {
      paginationInfo, 
      pageNumber, 
      setPageNumber, 
      rowsPerPage, 
      setRowsPerPage
    } = useContext(TableContext)

    const handleChangePage = (event, newPage) => {
      setPageNumber(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPageNumber(0);
    };
    return (
      <div>
        {
          paginationInfo
            ? <TablePagination
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                count={paginationInfo?.totalItems}
                component="div"
                page={pageNumber}
              />
            : null
        }
      </div>
    )
  }