import { PrismaService } from "nestjs-prisma";
import { Prisma, Ticker } from "@prisma/client";

export class TickerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.TickerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TickerFindManyArgs>
  ): Promise<Ticker[]> {
    return this.prisma.ticker.findMany(args);
  }
  async findOne<T extends Prisma.TickerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TickerFindUniqueArgs>
  ): Promise<Ticker | null> {
    return this.prisma.ticker.findUnique(args);
  }
  async create<T extends Prisma.TickerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TickerCreateArgs>
  ): Promise<Ticker> {
    return this.prisma.ticker.create<T>(args);
  }
  async update<T extends Prisma.TickerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TickerUpdateArgs>
  ): Promise<Ticker> {
    return this.prisma.ticker.update<T>(args);
  }
  async delete<T extends Prisma.TickerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TickerDeleteArgs>
  ): Promise<Ticker> {
    return this.prisma.ticker.delete(args);
  }
}
