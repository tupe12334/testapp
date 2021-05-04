import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Ticker as TTicker } from "../api/ticker/Ticker";

type Props = { id: string };

export const TickerTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TTicker,
    AxiosError,
    [string, string]
  >(["get-/api/tickers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tickers"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tickers"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
