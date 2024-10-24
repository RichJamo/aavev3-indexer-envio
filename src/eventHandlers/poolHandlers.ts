import {
  L2PoolInstance,
  L2PoolInstance_Supply,
  L2PoolInstance_Withdraw,
  L2PoolInstance_Borrow,
  L2PoolInstance_Repay,
  L2PoolInstance_LiquidationCall,
} from "generated";

// Handle supply events
L2PoolInstance.Supply.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_Supply = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
    onBehalfOf: event.params.onBehalfOf,
    amount: event.params.amount,
    referralCode: event.params.referralCode,
  };

  context.L2PoolInstance_Supply.set(entity);
});

// Handle withdrawal events
L2PoolInstance.Withdraw.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
    to: event.params.to,
    amount: event.params.amount,
  };

  context.L2PoolInstance_Withdraw.set(entity);
});

// Handle borrow events
L2PoolInstance.Borrow.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_Borrow = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
    onBehalfOf: event.params.onBehalfOf,
    amount: event.params.amount,
    interestRateMode: event.params.interestRateMode,
    borrowRate: event.params.borrowRate,
    referralCode: event.params.referralCode,
  };

  context.L2PoolInstance_Borrow.set(entity);
});

// Handle repay events
L2PoolInstance.Repay.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_Repay = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
    repayer: event.params.repayer,
    amount: event.params.amount,
    useATokens: event.params.useATokens,
  };

  context.L2PoolInstance_Repay.set(entity);
});

// Handle liquidation call events
L2PoolInstance.LiquidationCall.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_LiquidationCall = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    collateralAsset: event.params.collateralAsset,
    debtAsset: event.params.debtAsset,
    user: event.params.user,
    debtToCover: event.params.debtToCover,
    liquidatedCollateralAmount: event.params.liquidatedCollateralAmount,
    liquidator: event.params.liquidator,
    receiveAToken: event.params.receiveAToken,
  };

  context.L2PoolInstance
