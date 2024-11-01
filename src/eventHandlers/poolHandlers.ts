import { Pool } from "generated";
import { getOrInitReferrer, getOrInitReserve, getOrInitUser, getOrInitUserReserve, getPriceOracleAsset } from "../helpers/v3/initializers"; // Ensure helpers exist or adapt accordingly
import { Action_t } from "../../generated/src/db/Enums.gen";

Pool.Supply.handler(async ({ event, context }) => {
  const caller = event.params.user;
  const user = event.params.onBehalfOf;
  const amount = event.params.amount;

  // Initialize entities
  const poolReserve = await getOrInitReserve(event.params.reserve, event);
  const userReserve = await getOrInitUserReserve(user, event.params.reserve, event);

  // Create unique ID for the entity
  let id = `${event.transaction.hash}-${event.logIndex}`;

  const supply = {
    id,
    txHash: event.transaction.hash,
    action: "Supply" as Action_t,
    pool_id: poolReserve.id,
    user_id: userReserve.user_id,
    caller_id: caller,
    userReserve_id: userReserve.id,
    reserve_id: poolReserve.id,
    amount,
    timestamp: event.block.timestamp,
    assetPriceUSD: await getPriceOracleAsset(poolReserve.price),
    referrer_id: undefined,
  };

  if (event.params.referralCode) {
    const referrer = await getOrInitReferrer(event.params.referralCode);
    supply.referrer_id = referrer.id;
  }

  context.Supply.set(supply);
});
