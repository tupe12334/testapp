import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Ticker as TTicker } from "../api/ticker/Ticker";

type Data = TTicker[];

type Props = Omit<SelectFieldProps, "options">;

export const TickerSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/tickers",
    async () => {
      const response = await api.get("/api/tickers");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.symbol && item.symbol.length ? item.symbol : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
