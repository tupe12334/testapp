import { ArgsType, Field } from "@nestjs/graphql";
import { ZxcWhereUniqueInput } from "./ZxcWhereUniqueInput";

@ArgsType()
class DeleteZxcArgs {
  @Field(() => ZxcWhereUniqueInput, { nullable: false })
  where!: ZxcWhereUniqueInput;
}

export { DeleteZxcArgs };
