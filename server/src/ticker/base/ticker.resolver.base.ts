import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateTickerArgs } from "./CreateTickerArgs";
import { UpdateTickerArgs } from "./UpdateTickerArgs";
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
    action: "create",
    possession: "any",
  })
  async createTicker(
    @graphql.Args() args: CreateTickerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticker> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Ticker",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Ticker"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Ticker)
  @nestAccessControl.UseRoles({
    resource: "Ticker",
    action: "update",
    possession: "any",
  })
  async updateTicker(
    @graphql.Args() args: UpdateTickerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Ticker | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Ticker",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Ticker"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
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
