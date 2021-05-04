import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Zxc as TZxc } from "../api/zxc/Zxc";

type Props = { id: string };

export const ZxcTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TZxc,
    AxiosError,
    [string, string]
  >(["get-/api/zxcs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/zxcs"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/zxcs"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
