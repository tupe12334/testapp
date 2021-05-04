import { Module } from "@nestjs/common";
import { ZxcModuleBase } from "./base/zxc.module.base";
import { ZxcService } from "./zxc.service";
import { ZxcController } from "./zxc.controller";
import { ZxcResolver } from "./zxc.resolver";

@Module({
  imports: [ZxcModuleBase],
  controllers: [ZxcController],
  providers: [ZxcService, ZxcResolver],
  exports: [ZxcService],
})
export class ZxcModule {}
