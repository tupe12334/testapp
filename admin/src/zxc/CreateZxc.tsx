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
import { Zxc as TZxc } from "../api/zxc/Zxc";
import { ZxcCreateInput } from "../api/zxc/ZxcCreateInput";

const INITIAL_VALUES = {} as ZxcCreateInput;

export const CreateZxc = (): React.ReactElement => {
  useBreadcrumbs("/zxcs/new", "Create ZXC");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TZxc,
    AxiosError,
    ZxcCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/zxcs", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/zxcs"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ZxcCreateInput) => {
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
            <FormHeader title={"Create ZXC"}>
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
