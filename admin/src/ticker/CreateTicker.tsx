import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Ticker as TTicker } from "../api/ticker/Ticker";
import { TickerCreateInput } from "../api/ticker/TickerCreateInput";

const INITIAL_VALUES = {} as TickerCreateInput;

export const CreateTicker = (): React.ReactElement => {
  useBreadcrumbs("/tickers/new", "Create Ticker");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TTicker,
    AxiosError,
    TickerCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tickers", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tickers"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TickerCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Ticker"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
