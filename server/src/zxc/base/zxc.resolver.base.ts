import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteZxcArgs } from "./DeleteZxcArgs";
import { ZxcFindManyArgs } from "./ZxcFindManyArgs";
import { ZxcFindUniqueArgs } from "./ZxcFindUniqueArgs";
import { Zxc } from "./Zxc";
import { ZxcService } from "../zxc.service";

@graphql.Resolver(() => Zxc)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ZxcResolverBase {
  constructor(
    protected readonly service: ZxcService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Zxc])
  @nestAccessControl.UseRoles({
    resource: "Zxc",
    action: "read",
    possession: "any",
  })
  async zxcs(
    @graphql.Args() args: ZxcFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Zxc[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Zxc",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Zxc, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Zxc",
    action: "read",
    possession: "own",
  })
  async zxc(
    @graphql.Args() args: ZxcFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Zxc | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Zxc",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Zxc)
  @nestAccessControl.UseRoles({
    resource: "Zxc",
    action: "delete",
    possession: "any",
  })
  async deleteZxc(@graphql.Args() args: DeleteZxcArgs): Promise<Zxc | null> {
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
