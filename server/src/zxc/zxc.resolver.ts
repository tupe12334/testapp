import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ZxcResolverBase } from "./base/zxc.resolver.base";
import { Zxc } from "./base/Zxc";
import { ZxcService } from "./zxc.service";

@graphql.Resolver(() => Zxc)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ZxcResolver extends ZxcResolverBase {
  constructor(
    protected readonly service: ZxcService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
