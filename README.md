# Aave v3 Indexer (Envio)

An [Envio HyperIndex](https://docs.envio.dev) indexer for Aave v3 on Base. It follows the
protocol's pool, token, oracle and rewards contracts, and exposes the result as a GraphQL
schema built along the lines of Aave's own subgraph.

## What it indexes

Thirteen contract groups, configured in `config.yaml` against Base mainnet (chain 8453) from
block 2357100:

- **Pool, PoolConfigurator, PoolAddressesProvider** and its registry, covering supply,
  borrow, repay, liquidation and reserve configuration.
- **AToken, StableDebtToken, VariableDebtToken**, for balances and transfers.
- **AaveOracle, ChainlinkAggregator, FallbackPriceOracle**, for price feeds and their
  history.
- **RewardsController**, for incentive accrual.
- **DefaultReserveInterestRateStrategy**, both versions.

`schema.graphql` defines around twenty entities. `Supply`, `Borrow`, `Repay`,
`RedeemUnderlying`, `SwapBorrowRate`, `UsageAsCollateral`, `RebalanceStableBorrowRate` and
`LiquidationCall` all implement a shared `UserTransaction` interface, so user activity can be
queried across types rather than one event at a time. `FlashLoan`, `PriceHistoryItem`,
`PriceOracleAsset` and `SubToken` sit alongside them.

Handlers live in `src/eventHandlers/`, one module per contract group. The reserve maths,
price updates and initialisers are in `src/helpers/`, including a separate GHO path.

## Running it

```bash
pnpm install
cp .env.example .env     # ENVIO_API_TOKEN, from envio.dev/app/api-tokens
pnpm codegen
pnpm dev
```

## Status

Experimental, and written to learn the Envio framework rather than to run in production.
Some addresses in `config.yaml` still carry placeholder comments, so check them before
pointing this at anything that matters.
