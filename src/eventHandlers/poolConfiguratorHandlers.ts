import { PoolConfigurator } from "generated";
import { BigInt, Address } from "ethers";
import {
  DefaultReserveInterestRateStrategy,
  DefaultReserveInterestRateStrategyV2,
} from "generated";
import {
  getOrInitSubToken,
  getOrInitReserve,
  getOrInitReserveConfigurationHistoryItem,
} from "../helpers/v3/initializers";
import { zeroAddress, zeroBI } from "../utils/converters";

// Helper function to save reserve configuration history
async function saveReserve(reserve: any, event: any, context: any) {
  const timestamp = event.block.timestamp;
  const txHash = event.transaction.hash;

  reserve.lastUpdateTimestamp = timestamp;
  await context.Reserve.set(reserve);

  const configurationHistoryItem = getOrInitReserveConfigurationHistoryItem(txHash, reserve);
  configurationHistoryItem.usageAsCollateralEnabled = reserve.usageAsCollateralEnabled;
  configurationHistoryItem.borrowingEnabled = reserve.borrowingEnabled;
  configurationHistoryItem.stableBorrowRateEnabled = reserve.stableBorrowRateEnabled;
  configurationHistoryItem.isActive = reserve.isActive;
  configurationHistoryItem.isFrozen = reserve.isFrozen;
  configurationHistoryItem.reserveInterestRateStrategy = reserve.reserveInterestRateStrategy;
  configurationHistoryItem.baseLTVasCollateral = reserve.baseLTVasCollateral;
  configurationHistoryItem.reserveLiquidationThreshold = reserve.reserveLiquidationThreshold;
  configurationHistoryItem.reserveLiquidationBonus = reserve.reserveLiquidationBonus;
  configurationHistoryItem.timestamp = timestamp;
  await context.ReserveConfigurationHistory.set(configurationHistoryItem);
}

// Update interest rate strategy
async function updateInterestRateStrategy(reserve: any, strategy: string, init: boolean, context: any) {
  const strategyAddress = Address.fromString(strategy);
  const interestRateStrategyContract = DefaultReserveInterestRateStrategy.bind(strategyAddress);
  const interestRateStrategyContractV2 = DefaultReserveInterestRateStrategyV2.bind(strategyAddress);

  reserve.reserveInterestRateStrategy = strategy;
  const underlyingAsset = Address.fromString(reserve.underlyingAsset);

  const baseVariableBorrowRate = interestRateStrategyContract.try_getBaseVariableBorrowRate();
  if (baseVariableBorrowRate.ok) {
    reserve.baseVariableBorrowRate = baseVariableBorrowRate.value;
  } else {
    const baseVariableBorrowRateV2 = interestRateStrategyContractV2.try_getBaseVariableBorrowRate(underlyingAsset);
    if (baseVariableBorrowRateV2.ok) {
      reserve.baseVariableBorrowRate = baseVariableBorrowRateV2.value;
    }
  }

  if (init) {
    reserve.variableBorrowRate = reserve.baseVariableBorrowRate;
  }

  // Set optimal utilization rate
  const optimalUsageRatio = interestRateStrategyContract.try_OPTIMAL_USAGE_RATIO();
  if (optimalUsageRatio.ok) {
    reserve.optimalUtilisationRate = optimalUsageRatio.value;
  } else {
    const optimalUsageRatioV2 = interestRateStrategyContractV2.try_getOptimalUsageRatio(underlyingAsset);
    if (optimalUsageRatioV2.ok) {
      reserve.optimalUtilisationRate = optimalUsageRatioV2.value;
    }
  }

  // Set variable rate slopes
  const variableRateSlope1 = interestRateStrategyContract.try_getVariableRateSlope1();
  if (variableRateSlope1.ok) {
    reserve.variableRateSlope1 = variableRateSlope1.value;
  } else {
    const variableRateSlope1V2 = interestRateStrategyContractV2.try_getVariableRateSlope1(underlyingAsset);
    if (variableRateSlope1V2.ok) {
      reserve.variableRateSlope1 = variableRateSlope1V2.value;
    }
  }

  const variableRateSlope2 = interestRateStrategyContract.try_getVariableRateSlope2();
  if (variableRateSlope2.ok) {
    reserve.variableRateSlope2 = variableRateSlope2.value;
  } else {
    const variableRateSlope2V2 = interestRateStrategyContractV2.try_getVariableRateSlope2(underlyingAsset);
    if (variableRateSlope2V2.ok) {
      reserve.variableRateSlope2 = variableRateSlope2V2.value;
    }
  }

  const stableRateSlope1 = interestRateStrategyContract.try_getStableRateSlope1();
  reserve.stableRateSlope1 = stableRateSlope1.ok ? stableRateSlope1.value : zeroBI();

  const stableRateSlope2 = interestRateStrategyContract.try_getStableRateSlope2();
  reserve.stableRateSlope2 = stableRateSlope2.ok ? stableRateSlope2.value : zeroBI();
}

// Handle events
PoolConfigurator.ReserveInterestRateStrategyChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  if (reserve.aToken === zeroAddress().toHexString()) {
    return;
  }
  await updateInterestRateStrategy(reserve, event.params.newStrategy, false, context);
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ReserveBorrowing.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.borrowingEnabled = event.params.enabled;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.SiloedBorrowingChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.siloedBorrowing = event.params.newState;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ReserveStableRateBorrowing.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.stableBorrowRateEnabled = event.params.enabled;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ReserveActive.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.isActive = event.params.active;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ReserveFrozen.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.isFrozen = event.params.frozen;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.CollateralConfigurationChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.usageAsCollateralEnabled = event.params.liquidationThreshold.gt(zeroBI());
  reserve.baseLTVasCollateral = event.params.ltv;
  reserve.reserveLiquidationThreshold = event.params.liquidationThreshold;
  reserve.reserveLiquidationBonus = event.params.liquidationBonus;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ReserveFactorChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.reserveFactor = event.params.newFactor;
  await saveReserve(reserve, event, context);
});

PoolConfigurator.ATokenUpgraded.handler(async ({ event, context }) => {
  const aToken = await getOrInitSubToken(event.params.proxy);
  aToken.tokenContractImpl = event.params.newImplementation;
  await context.AToken.set(aToken);
});

PoolConfigurator.StableDebtTokenUpgraded.handler(async ({ event, context }) => {
  const sToken = await getOrInitSubToken(event.params.proxy);
  sToken.tokenContractImpl = event.params.newImplementation;
  await context.StableDebtToken.set(sToken);
});

PoolConfigurator.VariableDebtTokenUpgraded.handler(async ({ event, context }) => {
  const vToken = await getOrInitSubToken(event.params.proxy);
  vToken.tokenContractImpl = event.params.newImplementation;
  await context.VariableDebtToken.set(vToken);
});

PoolConfigurator.ReservePaused.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.isPaused = event.params.paused;
  await context.Reserve.set(reserve);
});

PoolConfigurator.ReserveDropped.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.isDropped = true;
  await context.Reserve.set(reserve);
});

PoolConfigurator.BorrowCapChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.borrowCap = event.params.newCap;
  await context.Reserve.set(reserve);
});

PoolConfigurator.SupplyCapChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.supplyCap = event.params.newCap;
  await context.Reserve.set(reserve);
});

PoolConfigurator.LiquidationProtocolFeeChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.liquidationProtocolFee = event.params.newFee;
  await context.Reserve.set(reserve);
});

PoolConfigurator.UnbackedMintCapChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.unbackedMintCap = event.params.newCap;
  await context.Reserve.set(reserve);
});

PoolConfigurator.EModeAssetCategoryChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event);
  reserve.eMode = event.params.newCategory.toString();
  await context.Reserve.set(reserve);
});

PoolConfigurator.EModeCategoryAdded.handler(async ({ event, context }) => {
  const id = event.params.categoryId.toString();
  let eModeCategory = await context.EModeCategory.get(id);
  if (!eModeCategory) {
    eModeCategory = {
      id,
      ltv: event.params.ltv,
      oracle: event.params.priceSource,
      liquidationBonus: event.params.liquidationBonus,
      liquidationThreshold: event.params.liquidationThreshold,
      label: event.params.label,
    };
    await context.EModeCategory.set(eModeCategory);
  }
});

PoolConfigurator.AssetCollateralInEModeChanged.handler(async ({ event, context }) => {
  const id = event.params.categoryId.toString();
  const eModeCategory = await context.EModeCategory.get(id);
  const categoryId = eModeCategory ? eModeCategory.id : id;

  const configId = `${event.params.asset}-${categoryId}`;
  let config = await context.EModeCategoryConfig.get(configId);
  if (!config) {
    config = { id: configId, borrowable: false };
  }
  config.category = categoryId;
  config.asset = event.params.asset;
  config.collateral = event.params.collateral;
  await context.EModeCategoryConfig.set(config);
});

PoolConfigurator.AssetBorrowableInEModeChanged.handler(async ({ event, context }) => {
  const id = event.params.categoryId.toString();
  const eModeCategory = await context.EModeCategory.get(id);
  const categoryId = eModeCategory ? eModeCategory.id : id;

  const configId = `${event.params.asset}-${categoryId}`;
  let config = await context.EModeCategoryConfig.get(configId);
  if (!config) {
    config = { id: configId, collateral: false };
  }
  config.category = categoryId;
  config.asset = event.params.asset;
  config.borrowable = event.params.borrowable;
  await context.EModeCategoryConfig.set(config);
});

PoolConfigurator.DebtCeilingChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event, context);
  reserve.debtCeiling = event.params.newDebtCeiling;
  await context.Reserve.set(reserve);
});

PoolConfigurator.BridgeProtocolFeeUpdated.handler(async ({ event, context }) => {
  const pool = await context.Pool.get(event.address.toString());
  if (pool) {
    pool.bridgeProtocolFee = event.params.newBridgeProtocolFee;
    await context.Pool.set(pool);
  }
});

PoolConfigurator.FlashloanPremiumTotalUpdated.handler(async ({ event, context }) => {
  const pool = await context.Pool.get(event.address.toString());
  if (pool) {
    pool.flashloanPremiumTotal = event.params.newFlashloanPremiumTotal;
    await context.Pool.set(pool);
  }
});

PoolConfigurator.FlashloanPremiumToProtocolUpdated.handler(async ({ event, context }) => {
  const pool = await context.Pool.get(event.address.toString());
  if (pool) {
    pool.flashloanPremiumToProtocol = event.params.newFlashloanPremiumToProtocol;
    await context.Pool.set(pool);
  }
});

PoolConfigurator.BorrowableInIsolationChanged.handler(async ({ event, context }) => {
  const reserve = await getOrInitReserve(event.params.asset, event, context);
  reserve.borrowableInIsolation = event.params.borrowable;
  await context.Reserve.set(reserve);
});

PoolConfigurator.ReserveInitialized.handler(async ({ event, context }) => {
  const underlyingAssetAddress = event.params.asset;
  const reserve = await getOrInitReserve(underlyingAssetAddress, event, context);

  // Load or create tokens for aToken, sToken, vToken and configure them
  const aToken = await getOrInitSubToken(event.params.aToken, context);
  aToken.underlyingAssetAddress = underlyingAssetAddress;
  await context.AToken.set(aToken);

  const sToken = await getOrInitSubToken(event.params.stableDebtToken, context);
  sToken.underlyingAssetAddress = underlyingAssetAddress;
  await context.StableDebtToken.set(sToken);

  const vToken = await getOrInitSubToken(event.params.variableDebtToken, context);
  vToken.underlyingAssetAddress = underlyingAssetAddress;
  await context.VariableDebtToken.set(vToken);

  reserve.aToken = aToken.id;
  reserve.sToken = sToken.id;
  reserve.vToken = vToken.id;
  reserve.isActive = true;
  await saveReserve(reserve, event, context);
});
