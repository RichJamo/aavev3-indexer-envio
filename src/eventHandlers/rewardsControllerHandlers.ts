import { RewardsController } from "generated";
import { getHistoryEntityId } from "../../utils/id-generation";
import { getOrInitUser } from "../helpers/v3/initializers";
import { IERC20Detailed } from "generated/IERC20Detailed";

RewardsController.EmissionManagerUpdated.handler(async ({ event, context }) => {
  const rewardsControllerId = event.address.toString();
  let rewardsController = await context.RewardsControllerEntity.get(rewardsControllerId);

  if (!rewardsController) {
    rewardsController = { id: rewardsControllerId };
    await context.RewardsControllerEntity.set(rewardsController);
  }
});

RewardsController.AssetConfigUpdated.handler(async ({ event, context }) => {
  const rewardsControllerId = event.address.toString();
  const asset = event.params.asset.toString();
  const reward = event.params.reward.toString();
  const blockTimestamp = event.block.timestamp;

  let rewardsController = await context.RewardsControllerEntity.get(rewardsControllerId);
  if (!rewardsController) {
    rewardsController = { id: rewardsControllerId };
    await context.RewardsControllerEntity.set(rewardsController);
  }

  const rewardIncentiveId = `${rewardsControllerId}:${asset}:${reward}`;
  let rewardIncentive = await context.Reward.get(rewardIncentiveId);

  if (!rewardIncentive) {
    const iERC20 = new IERC20Detailed(context.provider, reward);
    rewardIncentive = {
      id: rewardIncentiveId,
      rewardToken: reward,
      asset,
      rewardsController: rewardsControllerId,
      rewardTokenDecimals: await iERC20.decimals(),
      rewardTokenSymbol: await iERC20.symbol(),
      precision: await RewardsController.bind(event.address).getAssetDecimals(event.params.asset),
      createdAt: blockTimestamp,
      rewardFeedOracle: reward.toString()
    };
  }

  rewardIncentive.index = event.params.assetIndex;
  rewardIncentive.distributionEnd = event.params.newDistributionEnd;
  rewardIncentive.emissionsPerSecond = event.params.newEmission;
  rewardIncentive.updatedAt = blockTimestamp;

  await context.Reward.set(rewardIncentive);
});

RewardsController.Accrued.handler(async ({ event, context }) => {
  const userAddress = event.params.user.toString();
  const rewardId = `${event.address}:${event.params.asset}:${event.params.reward}`;
  const blockTimestamp = event.block.timestamp;

  let user = await getOrInitUser(userAddress, context);
  user.unclaimedRewards += event.params.rewardsAccrued;
  user.lifetimeRewards += event.params.rewardsAccrued;
  user.rewardsLastUpdated = blockTimestamp;
  await context.User.set(user);

  let rewardIncentive = await context.Reward.get(rewardId);
  if (rewardIncentive) {
    rewardIncentive.index = event.params.assetIndex;
    rewardIncentive.updatedAt = blockTimestamp;
    await context.Reward.set(rewardIncentive);
  }

  const userRewardId = `${rewardId}:${userAddress}`;
  let userReward = await context.UserReward.get(userRewardId);

  if (!userReward) {
    userReward = { id: userRewardId, reward: rewardId, user: userAddress, createdAt: blockTimestamp };
  }

  userReward.index = event.params.userIndex;
  userReward.updatedAt = blockTimestamp;
  await context.UserReward.set(userReward);

  await context.RewardedAction.set({
    id: getHistoryEntityId(event),
    rewardsController: event.address.toString(),
    user: userAddress,
    amount: event.params.rewardsAccrued,
  });
});

RewardsController.RewardsClaimed.handler(async ({ event, context }) => {
  const userAddress = event.params.user.toString();
  const callerAddress = event.params.claimer.toString();
  const toAddress = event.params.to.toString();

  let user = await getOrInitUser(userAddress, context);
  user.unclaimedRewards -= event.params.amount;
  user.rewardsLastUpdated = event.block.timestamp;
  await context.User.set(user);

  await getOrInitUser(toAddress, context);
  await getOrInitUser(callerAddress, context);

  await context.ClaimRewardsCall.set({
    id: getHistoryEntityId(event),
    rewardsController: event.address.toString(),
    user: userAddress,
    amount: event.params.amount,
    to: toAddress,
    caller: callerAddress,
    txHash: event.transaction.hash,
    action: Action_t.ClaimRewardsCall,
    timestamp: event.block.timestamp,
  });
});

RewardsController.RewardOracleUpdated.handler(async ({ event, context }) => {
  const rewardId = event.params.reward.toString();
  const blockTimestamp = event.block.timestamp;

  let rewardOracle = await context.RewardFeedOracle.get(rewardId);
  if (!rewardOracle) {
    rewardOracle = { id: rewardId, createdAt: blockTimestamp };
  }

  rewardOracle.rewardFeedAddress = event.params.rewardOracle.toString();
  rewardOracle.updatedAt = blockTimestamp;

  await context.RewardFeedOracle.set(rewardOracle);
});
