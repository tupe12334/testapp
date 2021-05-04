import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TickerList } from "./TickerList";
import { CreateTicker } from "./CreateTicker";
import { ViewTicker } from "./ViewTicker";

export const TickerIndex = (): React.ReactElement => {
  useBreadcrumbs("/tickers/", "Tickers");

  return (
    <Switch>
      <PrivateRoute exact path={"/tickers/"} component={TickerList} />
      <PrivateRoute path={"/tickers/new"} component={CreateTicker} />
      <PrivateRoute path={"/tickers/:id"} component={ViewTicker} />
    </Switch>
  );
};
