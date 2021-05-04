import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ZxcService } from "./zxc.service";
import { ZxcControllerBase } from "./base/zxc.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("zxcs")
@common.Controller("zxcs")
export class ZxcController extends ZxcControllerBase {
  constructor(
    protected readonly service: ZxcService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
