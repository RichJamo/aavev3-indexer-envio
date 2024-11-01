import { PoolAddressesProvider } from "generated";
import { createMapContractToPool, getOrInitPriceOracle } from "../helpers/v3/initializers";

// Define pool component names to validate them during updates
const POOL_COMPONENTS = [
  "poolDataProvider",
  "poolDataProviderImpl",
  "poolConfigurator",
  "poolConfiguratorImpl",
  "pool",
  "poolImpl",
  "proxyPriceProvider",
];

// Generic function to handle updates to Pool components
async function genericAddressProviderUpdate({
  component,
  newAddress,
  event,
  context,
  createMapContract = true,
}: {
  component: string;
  newAddress: string;
  event: any;
  context: any;
  createMapContract?: boolean;
}) {
  if (!POOL_COMPONENTS.includes(component)) {
    throw new Error("Invalid pool component name: " + component);
  }

  const poolAddress = event.address;
  let pool = await context.Pool.get(poolAddress);

  if (!pool) {
    context.log.error(`Pool ${poolAddress} is not registered!`);
    throw new Error(`Pool ${poolAddress} is not registered!`);
  }

  // Update the specified component address
  pool[component] = newAddress;

  // Create contract-to-pool mapping if required
  if (createMapContract) {
    createMapContractToPool(newAddress, pool.id);
  }

  pool.lastUpdateTimestamp = event.block.timestamp;
  await context.Pool.set(pool);

  if (component === "poolConfigurator") {
    const configuratorMapping = await context.ContractToPoolMapping.get(newAddress);
    if (!configuratorMapping) {
      const mapping = { id: newAddress, pool: poolAddress };
      await context.ContractToPoolMapping.set(mapping);
    }
  }
}

// Handlers for each specific event type

// ProxyCreated Event Handler
PoolAddressesProvider.ProxyCreated.handler(async ({ event, context }) => {
  const newProxyAddress = event.params.proxyAddress;
  const contractId = event.params.id.toString();
  let poolComponent = "";

  if (contractId === "POOL_CONFIGURATOR") {
    poolComponent = "poolConfigurator";
  } else if (contractId === "POOL") {
    poolComponent = "pool";
  } else {
    return;
  }

  await genericAddressProviderUpdate({
    component: poolComponent,
    newAddress: newProxyAddress,
    event,
    context,
  });
});

// AddressSet Event Handler
PoolAddressesProvider.AddressSet.handler(async ({ event, context }) => {
  let mappedId = "";
  switch (event.params.id.toString()) {
    case "POOL":
      mappedId = "pool";
      break;
    case "POOL_CONFIGURATOR":
      mappedId = "poolConfigurator";
      break;
    case "POOL_ADMIN":
      mappedId = "configurationAdmin";
      break;
    case "EMERGENCY_ADMIN":
      mappedId = "emergencyAdmin";
      break;
    case "COLLATERAL_MANAGER":
      mappedId = "poolCollateralManager";
      break;
    case "PRICE_ORACLE":
      mappedId = "proxyPriceProvider";
      break;
  }

  if (mappedId) {
    await genericAddressProviderUpdate({
      component: mappedId,
      newAddress: event.params.newAddress,
      event,
      context,
      createMapContract: false,
    });
  } else {
    context.log.error(`Address set error: ${event.params.newAddress}, Contract ID: ${event.params.id}`);
  }
});

// PriceOracleUpdated Event Handler
PoolAddressesProvider.PriceOracleUpdated.handler(async ({ event, context }) => {
  await genericAddressProviderUpdate({
    component: "proxyPriceProvider",
    newAddress: event.params.newPriceOracle,
    event,
    context,
    createMapContract: false,
  });

  const priceOracle = await getOrInitPriceOracle();
  priceOracle.proxyPriceProvider = event.params.newPriceOracle;
  context.PriceOracle.set(priceOracle);
});

// PoolUpdated Event Handler
PoolAddressesProvider.PoolUpdated.handler(async ({ event, context }) => {
  await genericAddressProviderUpdate({
    component: "poolImpl",
    newAddress: event.params.newPool,
    event,
    context,
    createMapContract: false,
  });
});

// PoolConfiguratorUpdated Event Handler
PoolAddressesProvider.PoolConfiguratorUpdated.handler(async ({ event, context }) => {
  await genericAddressProviderUpdate({
    component: "poolConfiguratorImpl",
    newAddress: event.params.newConfigurator,
    event,
    context,
    createMapContract: false,
  });
});

// PoolDataProviderUpdated Event Handler
PoolAddressesProvider.PoolDataProviderUpdated.handler(async ({ event, context }) => {
  await genericAddressProviderUpdate({
    component: "poolDataProviderImpl",
    newAddress: event.params.newAddress,
    event,
    context,
    createMapContract: false,
  });
});
