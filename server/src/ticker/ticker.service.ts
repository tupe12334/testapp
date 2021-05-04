import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TickerServiceBase } from "./base/ticker.service.base";

@Injectable()
export class TickerService extends TickerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
