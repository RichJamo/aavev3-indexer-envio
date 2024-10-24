import assert from "assert";
import { 
  TestHelpers,
  L2PoolInstance_BackUnbacked
} from "generated";
const { MockDb, L2PoolInstance } = TestHelpers;

describe("L2PoolInstance contract BackUnbacked event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for L2PoolInstance contract BackUnbacked event
  const event = L2PoolInstance.BackUnbacked.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("L2PoolInstance_BackUnbacked is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await L2PoolInstance.BackUnbacked.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualL2PoolInstanceBackUnbacked = mockDbUpdated.entities.L2PoolInstance_BackUnbacked.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedL2PoolInstanceBackUnbacked: L2PoolInstance_BackUnbacked = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      reserve: event.params.reserve,
      backer: event.params.backer,
      amount: event.params.amount,
      fee: event.params.fee,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualL2PoolInstanceBackUnbacked, expectedL2PoolInstanceBackUnbacked, "Actual L2PoolInstanceBackUnbacked should be the same as the expectedL2PoolInstanceBackUnbacked");
  });
});
