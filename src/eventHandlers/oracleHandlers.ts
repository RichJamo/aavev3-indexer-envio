import {
  AaveOracleInstance,
  AaveOracleInstance_AssetSourceUpdated,
  AaveOracleInstance_FallbackOracleUpdated,
  AaveOracleInstance_BaseCurrencySet,
  ChainlinkOracleInstance_AnswerUpdated,
} from "generated";

// Handle asset source updates
AaveOracleInstance.AssetSourceUpdated.handler(async ({ event, context }) => {
  const entity: AaveOracleInstance_AssetSourceUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    source: event.params.source,
  };

  context.AaveOracleInstance_AssetSourceUpdated.set(entity);
});

// Handle fallback oracle updates
AaveOracleInstance.FallbackOracleUpdated.handler(async ({ event, context }) => {
  const entity: AaveOracleInstance_FallbackOracleUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    fallbackOracle: event.params.fallbackOracle,
  };

  context.AaveOracleInstance_FallbackOracleUpdated.set(entity);
});

// Handle base currency updates
AaveOracleInstance.BaseCurrencySet.handler(async ({ event, context }) => {
  const entity: AaveOracleInstance_BaseCurrencySet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    baseCurrency: event.params.baseCurrency,
    baseCurrencyUnit: event.params.baseCurrencyUnit,
  };

  context.AaveOracleInstance_BaseCurrencySet.set(entity);
});

// Handle Chainlink price updates
ChainlinkOracleInstance.AnswerUpdated.handler(async ({ event, context }) => {
  const entity: ChainlinkOracleInstance_AnswerUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    current: event.params.current,
    roundId: event.params.roundId,
    updatedAt: event.params.updatedAt,
  };

  context.ChainlinkOracleInstance_AnswerUpdated.set(entity);
});
