import { ArgsType, Field } from "@nestjs/graphql";
import { TickerWhereUniqueInput } from "./TickerWhereUniqueInput";

@ArgsType()
class DeleteTickerArgs {
  @Field(() => TickerWhereUniqueInput, { nullable: false })
  where!: TickerWhereUniqueInput;
}

export { DeleteTickerArgs };
