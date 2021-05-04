import { ArgsType, Field } from "@nestjs/graphql";
import { CompanyWhereInput } from "./CompanyWhereInput";

@ArgsType()
class CompanyFindManyArgs {
  @Field(() => CompanyWhereInput, { nullable: true })
  where?: CompanyWhereInput;
}

export { CompanyFindManyArgs };
