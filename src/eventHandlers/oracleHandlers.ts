import { AaveOracle, ChainlinkAggregator, PoolAddressesProvider } from "generated";

// Handle asset source updates
AaveOracle.AssetSourceUpdated.handler(async ({ event, context }) => {
  const assetId = event.params.asset; // Assuming asset is an address
  const source = event.params.source;

  // Fetch the PriceOracleAsset associated with this asset
  let priceOracleAsset = await context.PriceOracleAsset.get(assetId);

  if (priceOracleAsset !== undefined) {
    // Update the priceSource field with the new source
    priceOracleAsset = {
      ...priceOracleAsset,
      priceSource: source,
    };

    // Save the updated entity back to the database
    context.PriceOracleAsset.set(priceOracleAsset);
  } else {
    // If the asset does not exist, you may want to log this
    context.log.warn(`PriceOracleAsset not found for asset: ${assetId}`);
  }
});

// Handle fallback oracle updates
AaveOracle.FallbackOracleUpdated.handler(async ({ event, context }) => {
  const fallbackOracleAddress = event.params.fallbackOracle;

  // Fetch the PriceOracle entity (assuming there's only one main PriceOracle)
  let priceOracle = await context.PriceOracle.get("main_oracle");

  if (priceOracle !== undefined) {
    // Update the fallbackPriceOracle field with the new fallback address
    priceOracle = {
      ...priceOracle,
      fallbackPriceOracle: fallbackOracleAddress,
    };

    // Save the updated entity back to the database
    context.PriceOracle.set(priceOracle);
  } else {
    // Log a warning if the PriceOracle entity is not found
    context.log.warn("PriceOracle entity not found.");
  }
});

// Handle base currency updates
AaveOracle.BaseCurrencySet.handler(async ({ event, context }) => {
  const baseCurrency = event.params.baseCurrency;
  const baseUnit = event.params.baseUnit;

  // Fetch the PriceOracle entity (assuming there's only one main PriceOracle)
  let priceOracle = await context.PriceOracle.get("main_oracle");

  if (priceOracle !== undefined) {
    // Update the baseCurrency and baseCurrencyUnit fields
    priceOracle = {
      ...priceOracle,
      baseCurrency: baseCurrency,
      baseCurrencyUnit: baseUnit,
    };

    // Save the updated entity back to the database
    context.PriceOracle.set(priceOracle);
  } else {
    // Log a warning if the PriceOracle entity is not found
    context.log.warn("PriceOracle entity not found.");
  }
});

// PoolAddressesProvider.PriceOracleUpdated.handler(async ({ event, context }) => {
//   const oldPriceOracle = event.params.oldPriceOracle;
//   const newPriceOracle = event.params.newPriceOracle;

//   context.PriceOracle.set({
//     id: newPriceOracle,
//     proxyPriceProvider: newPriceOracle,
//     lastUpdateTimestamp: event.block.timestamp,
//   });
// });