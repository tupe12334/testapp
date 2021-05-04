import { TickerWhereUniqueInput } from "./TickerWhereUniqueInput";
import { TickerUpdateInput } from "./TickerUpdateInput";

export type UpdateTickerArgs = {
  where: TickerWhereUniqueInput;
  data: TickerUpdateInput;
};
