import { ArgsType, Field } from "@nestjs/graphql";
import { TickerWhereUniqueInput } from "./TickerWhereUniqueInput";
import { TickerUpdateInput } from "./TickerUpdateInput";

@ArgsType()
class UpdateTickerArgs {
  @Field(() => TickerWhereUniqueInput, { nullable: false })
  where!: TickerWhereUniqueInput;
  @Field(() => TickerUpdateInput, { nullable: false })
  data!: TickerUpdateInput;
}

export { UpdateTickerArgs };
