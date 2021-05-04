import { ArgsType, Field } from "@nestjs/graphql";
import { TickerCreateInput } from "./TickerCreateInput";

@ArgsType()
class CreateTickerArgs {
  @Field(() => TickerCreateInput, { nullable: false })
  data!: TickerCreateInput;
}

export { CreateTickerArgs };
