import {
  AaveOracle,
  AaveOracle_AssetSourceUpdated,
  AaveOracle_FallbackOracleUpdated,
  AaveOracle_BaseCurrencySet,
  ChainlinkAggregator_AnswerUpdated,
} from "generated";

// Handle asset source updates
AaveOracle.AssetSourceUpdated.handler(async ({ event, context }) => {
  const entity: AaveOracle_AssetSourceUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    asset: event.params.asset,
    source: event.params.source,
  };

  context.AaveOracle_AssetSourceUpdated.set(entity);
});

// Handle fallback oracle updates
AaveOracle.FallbackOracleUpdated.handler(async ({ event, context }) => {
  const entity: AaveOracle_FallbackOracleUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    fallbackOracle: event.params.fallbackOracle,
  };

  context.AaveOracle_FallbackOracleUpdated.set(entity);
});

// Handle base currency updates
AaveOracle.BaseCurrencySet.handler(async ({ event, context }) => {
  const entity: AaveOracle_BaseCurrencySet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    baseCurrency: event.params.baseCurrency,
    baseCurrencyUnit: event.params.baseUnit,
  };

  context.AaveOracle_BaseCurrencySet.set(entity);
});

// // Handle Chainlink price updates
// ChainlinkAggregator.AnswerUpdated.handler(async ({ event, context }) => {
//   const entity: ChainlinkAggregator_AnswerUpdated = {
//     id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
//     current: event.params.current,
//     roundId: event.params.roundId,
//     updatedAt: event.params.updatedAt,
//   };

//   context.ChainlinkAggregator_AnswerUpdated.set(entity);
// });
