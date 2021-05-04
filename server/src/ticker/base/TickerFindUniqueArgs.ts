import { ArgsType, Field } from "@nestjs/graphql";
import { TickerWhereUniqueInput } from "./TickerWhereUniqueInput";

@ArgsType()
class TickerFindUniqueArgs {
  @Field(() => TickerWhereUniqueInput, { nullable: false })
  where!: TickerWhereUniqueInput;
}

export { TickerFindUniqueArgs };
