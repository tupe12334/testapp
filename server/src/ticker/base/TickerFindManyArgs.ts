import { ArgsType, Field } from "@nestjs/graphql";
import { TickerWhereInput } from "./TickerWhereInput";

@ArgsType()
class TickerFindManyArgs {
  @Field(() => TickerWhereInput, { nullable: true })
  where?: TickerWhereInput;
}

export { TickerFindManyArgs };
