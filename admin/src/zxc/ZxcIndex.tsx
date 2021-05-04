import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ZxcList } from "./ZxcList";
import { CreateZxc } from "./CreateZxc";
import { ViewZxc } from "./ViewZxc";

export const ZxcIndex = (): React.ReactElement => {
  useBreadcrumbs("/zxcs/", "ZXCS");

  return (
    <Switch>
      <PrivateRoute exact path={"/zxcs/"} component={ZxcList} />
      <PrivateRoute path={"/zxcs/new"} component={CreateZxc} />
      <PrivateRoute path={"/zxcs/:id"} component={ViewZxc} />
    </Switch>
  );
};
