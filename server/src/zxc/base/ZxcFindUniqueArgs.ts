import { ArgsType, Field } from "@nestjs/graphql";
import { ZxcWhereUniqueInput } from "./ZxcWhereUniqueInput";

@ArgsType()
class ZxcFindUniqueArgs {
  @Field(() => ZxcWhereUniqueInput, { nullable: false })
  where!: ZxcWhereUniqueInput;
}

export { ZxcFindUniqueArgs };
