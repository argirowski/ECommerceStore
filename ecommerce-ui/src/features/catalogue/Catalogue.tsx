import React, { Fragment } from "react";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogueApi";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import CataloguePagination from "../../app/shared/components/CataloguePagination";
import { setPageNumber } from "./catalogueSlice";

const Catalogue: React.FC = () => {
  const productParams = useAppSelector((state) => state.catalogue);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filtersLoading } =
    useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoading || !data || filtersLoading || !filtersData)
    return <Typography>Loading...</Typography>;
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid size={3}>
          <Filters filtersData={filtersData} />
        </Grid>
        <Grid size={9}>
          {data.items && data.items.length > 0 ? (
            <>
              <ProductList products={data.items} />
              <CataloguePagination
                metaData={data.pagination}
                onPageChange={(page: number) => {
                  dispatch(setPageNumber(page));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          ) : (
            <Typography variant="h5">
              No products found for this filter
            </Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Catalogue;
