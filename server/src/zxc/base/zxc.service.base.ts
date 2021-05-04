import { PrismaService } from "nestjs-prisma";
import { Prisma, Zxc } from "@prisma/client";

export class ZxcServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.ZxcFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ZxcFindManyArgs>
  ): Promise<Zxc[]> {
    return this.prisma.zxc.findMany(args);
  }
  async findOne<T extends Prisma.ZxcFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ZxcFindUniqueArgs>
  ): Promise<Zxc | null> {
    return this.prisma.zxc.findUnique(args);
  }
  async create<T extends Prisma.ZxcCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ZxcCreateArgs>
  ): Promise<Zxc> {
    return this.prisma.zxc.create<T>(args);
  }
  async update<T extends Prisma.ZxcUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ZxcUpdateArgs>
  ): Promise<Zxc> {
    return this.prisma.zxc.update<T>(args);
  }
  async delete<T extends Prisma.ZxcDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ZxcDeleteArgs>
  ): Promise<Zxc> {
    return this.prisma.zxc.delete(args);
  }
}
