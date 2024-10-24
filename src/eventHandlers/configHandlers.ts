import {
  PoolAddressesProviderInstance,
  PoolAddressesProviderInstance_AddressesProviderRegistered,
  PoolAddressesProviderInstance_AddressesProviderUnregistered,
  PoolAddressesProviderInstance_ProxyCreated,
  PoolAddressesProviderInstance_PriceOracleUpdated,
  PoolAddressesProviderInstance_PoolUpdated,
  PoolAddressesProviderInstance_PoolConfiguratorUpdated,
  PoolAddressesProviderInstance_PoolDataProviderUpdated,
  PoolConfiguratorInstance_ReserveInitialized,
  PoolConfiguratorInstance_ReserveActivated,
  PoolConfiguratorInstance_ReserveFrozen,
  PoolConfiguratorInstance_ReserveBorrowing,
  PoolConfiguratorInstance_CollateralConfigurationChanged,
  PoolConfiguratorInstance_ReserveStableRateBorrowing,
  PoolConfiguratorInstance_ReservePaused,
  PoolConfiguratorInstance_ReserveDropped,
  PoolConfiguratorInstance_ReserveFactorChanged,
  PoolConfiguratorInstance_ATokenUpgraded,
  PoolConfiguratorInstance_BorrowCapChanged,
  PoolConfiguratorInstance_BorrowableInIsolationChanged,
  PoolConfiguratorInstance_BridgeProtocolFeeUpdated,
  PoolConfiguratorInstance_DebtCeilingChanged,
  PoolConfiguratorInstance_EModeAssetCategoryChanged,
  PoolConfiguratorInstance_EModeCategoryAdded,
  PoolConfiguratorInstance_AssetCollateralInEModeChanged,
  PoolConfiguratorInstance_AssetBorrowableInEModeChanged,
  PoolConfiguratorInstance_FlashloanPremiumToProtocolUpdated,
  PoolConfiguratorInstance_FlashloanPremiumTotalUpdated,
  PoolConfiguratorInstance_LiquidationProtocolFeeChanged,
  PoolConfiguratorInstance_ReserveInterestRateStrategyChanged,
  PoolConfiguratorInstance_SiloedBorrowingChanged,
  PoolConfiguratorInstance_StableDebtTokenUpgraded,
  PoolConfiguratorInstance_SupplyCapChanged,
  PoolConfiguratorInstance_UnbackedMintCapChanged,
  PoolConfiguratorInstance_VariableDebtTokenUpgraded,
} from "generated";

// Handle registration of new address providers
PoolAddressesProviderInstance.AddressesProviderRegistered.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_AddressesProviderRegistered = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    addressesProvider: event.params.addressesProvider,
    providerId: event.params.id,
  };
  context.PoolAddressesProviderInstance_AddressesProviderRegistered.set(entity);
});

// Handle unregistration of address providers
PoolAddressesProviderInstance.AddressesProviderUnregistered.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_AddressesProviderUnregistered = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    addressesProvider: event.params.addressesProvider,
  };
  context.PoolAddressesProviderInstance_AddressesProviderUnregistered.set(entity);
});

// Handle proxy creation
PoolAddressesProviderInstance.ProxyCreated.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_ProxyCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    proxyAddress: event.params.proxy,
    implementation: event.params.implementation,
  };
  context.PoolAddressesProviderInstance_ProxyCreated.set(entity);
});

// Handle price oracle updates
PoolAddressesProviderInstance.PriceOracleUpdated.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_PriceOracleUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    priceOracle: event.params.newPriceOracle,
  };
  context.PoolAddressesProviderInstance_PriceOracleUpdated.set(entity);
});

// Handle pool updates
PoolAddressesProviderInstance.PoolUpdated.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_PoolUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.newPool,
  };
  context.PoolAddressesProviderInstance_PoolUpdated.set(entity);
});

// Handle pool configurator updates
PoolAddressesProviderInstance.PoolConfiguratorUpdated.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_PoolConfiguratorUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    poolConfigurator: event.params.newPoolConfigurator,
  };
  context.PoolAddressesProviderInstance_PoolConfiguratorUpdated.set(entity);
});

// Handle pool data provider updates
PoolAddressesProviderInstance.PoolDataProviderUpdated.handler(async ({ event, context }) => {
  const entity: PoolAddressesProviderInstance_PoolDataProviderUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    poolDataProvider: event.params.newPoolDataProvider,
  };
  context.PoolAddressesProviderInstance_PoolDataProviderUpdated.set(entity);
});

// Handle initialization of reserves
PoolConfiguratorInstance.ReserveInitialized.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveInitialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    aToken: event.params.aToken,
    stableDebtToken: event.params.stableDebtToken,
    variableDebtToken: event.params.variableDebtToken,
    interestRateStrategyAddress: event.params.interestRateStrategyAddress,
  };
  context.PoolConfiguratorInstance_ReserveInitialized.set(entity);
});

// Handle activation of reserves
PoolConfiguratorInstance.ReserveActivated.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveActivated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    active: event.params.active,
  };
  context.PoolConfiguratorInstance_ReserveActivated.set(entity);
});

// Handle freezing of reserves
PoolConfiguratorInstance.ReserveFrozen.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveFrozen = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    frozen: event.params.frozen,
  };
  context.PoolConfiguratorInstance_ReserveFrozen.set(entity);
});

// Handle borrowing configuration
PoolConfiguratorInstance.ReserveBorrowing.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveBorrowing = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    borrowingEnabled: event.params.borrowingEnabled,
  };
  context.PoolConfiguratorInstance_ReserveBorrowing.set(entity);
});

// Handle collateral configuration changes
PoolConfiguratorInstance.CollateralConfigurationChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_CollateralConfigurationChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    ltv: event.params.ltv,
    liquidationThreshold: event.params.liquidationThreshold,
    liquidationBonus: event.params.liquidationBonus,
  };
  context.PoolConfiguratorInstance_CollateralConfigurationChanged.set(entity);
});

// Handle reserve stable rate borrowing configuration
PoolConfiguratorInstance.ReserveStableRateBorrowing.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveStableRateBorrowing = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    stableRateBorrowingEnabled: event.params.stableRateBorrowingEnabled,
  };
  context.PoolConfiguratorInstance_ReserveStableRateBorrowing.set(entity);
});

// Handle reserve paused
PoolConfiguratorInstance.ReservePaused.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReservePaused = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    paused: event.params.paused,
  };
  context.PoolConfiguratorInstance_ReservePaused.set(entity);
});

// Handle reserve dropped
PoolConfiguratorInstance.ReserveDropped.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveDropped = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
  };
  context.PoolConfiguratorInstance_ReserveDropped.set(entity);
});

// Handle reserve factor changes
PoolConfiguratorInstance.ReserveFactorChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveFactorChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldReserveFactor: event.params.oldReserveFactor,
    newReserveFactor: event.params.newReserveFactor,
  };
  context.PoolConfiguratorInstance_ReserveFactorChanged.set(entity);
});

// Handle AToken upgrades
PoolConfiguratorInstance.ATokenUpgraded.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ATokenUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldAToken: event.params.oldAToken,
    newAToken: event.params.newAToken,
  };
  context.PoolConfiguratorInstance_ATokenUpgraded.set(entity);
});

// Handle borrow cap changes
PoolConfiguratorInstance.BorrowCapChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_BorrowCapChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldBorrowCap: event.params.oldBorrowCap,
    newBorrowCap: event.params.newBorrowCap,
  };
  context.PoolConfiguratorInstance_BorrowCapChanged.set(entity);
});

// Handle borrowable in isolation change
PoolConfiguratorInstance.BorrowableInIsolationChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_BorrowableInIsolationChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    borrowableInIsolation: event.params.borrowableInIsolation,
  };
  context.PoolConfiguratorInstance_BorrowableInIsolationChanged.set(entity);
});

// Handle bridge protocol fee update
PoolConfiguratorInstance.BridgeProtocolFeeUpdated.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_BridgeProtocolFeeUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldBridgeProtocolFee: event.params.oldBridgeProtocolFee,
    newBridgeProtocolFee: event.params.newBridgeProtocolFee,
  };
  context.PoolConfiguratorInstance_BridgeProtocolFeeUpdated.set(entity);
});

// Handle debt ceiling changes
PoolConfiguratorInstance.DebtCeilingChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_DebtCeilingChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldDebtCeiling: event.params.oldDebtCeiling,
    newDebtCeiling: event.params.newDebtCeiling,
  };
  context.PoolConfiguratorInstance_DebtCeilingChanged.set(entity);
});

// Handle e-mode asset category changes
PoolConfiguratorInstance.EModeAssetCategoryChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_EModeAssetCategoryChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldCategory: event.params.oldCategory,
    newCategory: event.params.newCategory,
  };
  context.PoolConfiguratorInstance_EModeAssetCategoryChanged.set(entity);
});

// Handle e-mode category added
PoolConfiguratorInstance.EModeCategoryAdded.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_EModeCategoryAdded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    categoryId: event.params.categoryId,
    ltv: event.params.ltv,
    liquidationThreshold: event.params.liquidationThreshold,
    liquidationBonus: event.params.liquidationBonus,
    priceSource: event.params.priceSource,
    label: event.params.label,
  };
  context.PoolConfiguratorInstance_EModeCategoryAdded.set(entity);
});

// Handle collateral in e-mode changes
PoolConfiguratorInstance.AssetCollateralInEModeChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_AssetCollateralInEModeChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    categoryId: event.params.categoryId,
    collateralInEMode: event.params.collateralInEMode,
  };
  context.PoolConfiguratorInstance_AssetCollateralInEModeChanged.set(entity);
});

// Handle asset borrowable in e-mode changes
PoolConfiguratorInstance.AssetBorrowableInEModeChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_AssetBorrowableInEModeChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    categoryId: event.params.categoryId,
    borrowableInEMode: event.params.borrowableInEMode,
  };
  context.PoolConfiguratorInstance_AssetBorrowableInEModeChanged.set(entity);
});

// Handle flashloan premium to protocol updated
PoolConfiguratorInstance.FlashloanPremiumToProtocolUpdated.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_FlashloanPremiumToProtocolUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldFlashloanPremiumToProtocol: event.params.oldFlashloanPremiumToProtocol,
    newFlashloanPremiumToProtocol: event.params.newFlashloanPremiumToProtocol,
  };
  context.PoolConfiguratorInstance_FlashloanPremiumToProtocolUpdated.set(entity);
});

// Handle flashloan premium total updated
PoolConfiguratorInstance.FlashloanPremiumTotalUpdated.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_FlashloanPremiumTotalUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldFlashloanPremiumTotal: event.params.oldFlashloanPremiumTotal,
    newFlashloanPremiumTotal: event.params.newFlashloanPremiumTotal,
  };
  context.PoolConfiguratorInstance_FlashloanPremiumTotalUpdated.set(entity);
});

// Handle liquidation protocol fee changes
PoolConfiguratorInstance.LiquidationProtocolFeeChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_LiquidationProtocolFeeChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldLiquidationProtocolFee: event.params.oldLiquidationProtocolFee,
    newLiquidationProtocolFee: event.params.newLiquidationProtocolFee,
  };
  context.PoolConfiguratorInstance_LiquidationProtocolFeeChanged.set(entity);
});

// Handle reserve interest rate strategy changes
PoolConfiguratorInstance.ReserveInterestRateStrategyChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_ReserveInterestRateStrategyChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldInterestRateStrategyAddress: event.params.oldInterestRateStrategyAddress,
    newInterestRateStrategyAddress: event.params.newInterestRateStrategyAddress,
  };
  context.PoolConfiguratorInstance_ReserveInterestRateStrategyChanged.set(entity);
});

// Handle siloed borrowing changes
PoolConfiguratorInstance.SiloedBorrowingChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_SiloedBorrowingChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldSiloedBorrowing: event.params.oldSiloedBorrowing,
    newSiloedBorrowing: event.params.newSiloedBorrowing,
  };
  context.PoolConfiguratorInstance_SiloedBorrowingChanged.set(entity);
});

// Handle stable debt token upgrades
PoolConfiguratorInstance.StableDebtTokenUpgraded.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_StableDebtTokenUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldStableDebtToken: event.params.oldStableDebtToken,
    newStableDebtToken: event.params.newStableDebtToken,
  };
  context.PoolConfiguratorInstance_StableDebtTokenUpgraded.set(entity);
});

// Handle supply cap changes
PoolConfiguratorInstance.SupplyCapChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_SupplyCapChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldSupplyCap: event.params.oldSupplyCap,
    newSupplyCap: event.params.newSupplyCap,
  };
  context.PoolConfiguratorInstance_SupplyCapChanged.set(entity);
});

// Handle unbacked mint cap changes
PoolConfiguratorInstance.UnbackedMintCapChanged.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_UnbackedMintCapChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldUnbackedMintCap: event.params.oldUnbackedMintCap,
    newUnbackedMintCap: event.params.newUnbackedMintCap,
  };
  context.PoolConfiguratorInstance_UnbackedMintCapChanged.set(entity);
});

// Handle variable debt token upgrades
PoolConfiguratorInstance.VariableDebtTokenUpgraded.handler(async ({ event, context }) => {
  const entity: PoolConfiguratorInstance_VariableDebtTokenUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    oldVariableDebtToken: event.params.oldVariableDebtToken,
    newVariableDebtToken: event.params.newVariableDebtToken,
  };
  context.PoolConfiguratorInstance_VariableDebtTokenUpgraded.set(entity);
});
