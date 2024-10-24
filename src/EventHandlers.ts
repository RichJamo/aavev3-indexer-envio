/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  L2PoolInstance,
  L2PoolInstance_BackUnbacked,
  L2PoolInstance_Borrow,
  L2PoolInstance_FlashLoan,
  L2PoolInstance_IsolationModeTotalDebtUpdated,
  L2PoolInstance_LiquidationCall,
  L2PoolInstance_MintUnbacked,
  L2PoolInstance_MintedToTreasury,
  L2PoolInstance_Repay,
  L2PoolInstance_ReserveDataUpdated,
  L2PoolInstance_ReserveUsedAsCollateralDisabled,
  L2PoolInstance_ReserveUsedAsCollateralEnabled,
  L2PoolInstance_Supply,
  L2PoolInstance_UserEModeSet,
  L2PoolInstance_Withdraw,
} from "generated";

L2PoolInstance.BackUnbacked.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_BackUnbacked = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    backer: event.params.backer,
    amount: event.params.amount,
    fee: event.params.fee,
  };

  context.L2PoolInstance_BackUnbacked.set(entity);
});

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

L2PoolInstance.FlashLoan.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_FlashLoan = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    target: event.params.target,
    initiator: event.params.initiator,
    asset: event.params.asset,
    amount: event.params.amount,
    interestRateMode: event.params.interestRateMode,
    premium: event.params.premium,
    referralCode: event.params.referralCode,
  };

  context.L2PoolInstance_FlashLoan.set(entity);
});

L2PoolInstance.IsolationModeTotalDebtUpdated.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_IsolationModeTotalDebtUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    totalDebt: event.params.totalDebt,
  };

  context.L2PoolInstance_IsolationModeTotalDebtUpdated.set(entity);
});

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

  context.L2PoolInstance_LiquidationCall.set(entity);
});

L2PoolInstance.MintUnbacked.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_MintUnbacked = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
    onBehalfOf: event.params.onBehalfOf,
    amount: event.params.amount,
    referralCode: event.params.referralCode,
  };

  context.L2PoolInstance_MintUnbacked.set(entity);
});

L2PoolInstance.MintedToTreasury.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_MintedToTreasury = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    amountMinted: event.params.amountMinted,
  };

  context.L2PoolInstance_MintedToTreasury.set(entity);
});

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

L2PoolInstance.ReserveDataUpdated.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_ReserveDataUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    liquidityRate: event.params.liquidityRate,
    stableBorrowRate: event.params.stableBorrowRate,
    variableBorrowRate: event.params.variableBorrowRate,
    liquidityIndex: event.params.liquidityIndex,
    variableBorrowIndex: event.params.variableBorrowIndex,
  };

  context.L2PoolInstance_ReserveDataUpdated.set(entity);
});

L2PoolInstance.ReserveUsedAsCollateralDisabled.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_ReserveUsedAsCollateralDisabled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
  };

  context.L2PoolInstance_ReserveUsedAsCollateralDisabled.set(entity);
});

L2PoolInstance.ReserveUsedAsCollateralEnabled.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_ReserveUsedAsCollateralEnabled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve: event.params.reserve,
    user: event.params.user,
  };

  context.L2PoolInstance_ReserveUsedAsCollateralEnabled.set(entity);
});

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

L2PoolInstance.UserEModeSet.handler(async ({ event, context }) => {
  const entity: L2PoolInstance_UserEModeSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    categoryId: event.params.categoryId,
  };

  context.L2PoolInstance_UserEModeSet.set(entity);
});

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
