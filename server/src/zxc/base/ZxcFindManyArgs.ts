import { ArgsType, Field } from "@nestjs/graphql";
import { ZxcWhereInput } from "./ZxcWhereInput";

@ArgsType()
class ZxcFindManyArgs {
  @Field(() => ZxcWhereInput, { nullable: true })
  where?: ZxcWhereInput;
}

export { ZxcFindManyArgs };
