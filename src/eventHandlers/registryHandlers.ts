import { PoolAddressesProviderRegistry } from "generated";
import { zeroAddress } from "../utils/converters";

// Handles the event when an addresses provider is registered
PoolAddressesProviderRegistry.AddressesProviderRegistered.contractRegister(({ event, context }) => {
  context.addPoolAddressesProvider(event.params.provider);
},
  {
    preRegisterDynamicContracts: true
  }
);

// Handles the event when an addresses provider is unregistered
PoolAddressesProviderRegistry.AddressesProviderUnregistered.contractRegister(({ context }) => {
  context.addPoolAddressesProvider(zeroAddress());
}
);
