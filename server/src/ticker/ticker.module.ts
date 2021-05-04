import { Module } from "@nestjs/common";
import { TickerModuleBase } from "./base/ticker.module.base";
import { TickerService } from "./ticker.service";
import { TickerController } from "./ticker.controller";
import { TickerResolver } from "./ticker.resolver";

@Module({
  imports: [TickerModuleBase],
  controllers: [TickerController],
  providers: [TickerService, TickerResolver],
  exports: [TickerService],
})
export class TickerModule {}
