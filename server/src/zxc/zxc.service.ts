import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ZxcServiceBase } from "./base/zxc.service.base";

@Injectable()
export class ZxcService extends ZxcServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
