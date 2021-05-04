import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteTickerArgs } from "./DeleteTickerArgs";
import { TickerFindManyArgs } from "./TickerFindManyArgs";
import { TickerFindUniqueArgs } from "./TickerFindUniqueArgs";
import { Ticker } from "./Ticker";
import { TickerService } from "../ticker.service";

@graphql.Resolver(() => Ticker)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TickerResolverBase {
  constructor(
    protected readonly service: TickerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Ticker])
  @nestAccessControl.UseRoles({
    resource: "Ticker",
    action: "read",
    possession: "any",
  })
  async tickers(
    @graphql.Args() args: TickerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticker[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Ticker",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Ticker, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Ticker",
    action: "read",
    possession: "own",
  })
  async ticker(
    @graphql.Args() args: TickerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticker | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Ticker",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Ticker)
  @nestAccessControl.UseRoles({
    resource: "Ticker",
    action: "delete",
    possession: "any",
  })
  async deleteTicker(
    @graphql.Args() args: DeleteTickerArgs
  ): Promise<Ticker | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
