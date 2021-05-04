import { ArgsType, Field } from "@nestjs/graphql";
import { CompanyWhereUniqueInput } from "./CompanyWhereUniqueInput";

@ArgsType()
class CompanyFindUniqueArgs {
  @Field(() => CompanyWhereUniqueInput, { nullable: false })
  where!: CompanyWhereUniqueInput;
}

export { CompanyFindUniqueArgs };
