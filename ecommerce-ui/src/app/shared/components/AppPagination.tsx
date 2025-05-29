import { Box, Pagination, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Pagination as PaginationType } from "../../models/pagination";

type AppPaginationProps = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

const AppPagination: React.FC<AppPaginationProps> = ({
  metadata,
  onPageChange,
}) => {
  const { currentPage, totalPages, pageSize, totalCount } = metadata;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={3}
      >
        <Typography>
          Displaying {startItem}-{endItem} of {totalCount} items
        </Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
        />
      </Box>
    </Fragment>
  );
};

export default AppPagination;
