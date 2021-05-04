import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TickerService } from "./ticker.service";
import { TickerControllerBase } from "./base/ticker.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("tickers")
@common.Controller("tickers")
export class TickerController extends TickerControllerBase {
  constructor(
    protected readonly service: TickerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
