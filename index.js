const { Client } = require("tplink-smarthome-api");
const BulbWrapper = require("./bulb");

const client = new Client();

(async () => {
  // Get all devices
  const device1 = await client.getDevice({ host: "192.168.1.85" });
  const device2 = await client.getDevice({ host: "192.168.1.241" });
  const device3 = await client.getDevice({ host: "192.168.1.89" });
  const device4 = await client.getDevice({ host: "192.168.1.55" });

  // Array to manage devices
  const devices = [device1, device2, device3, device4];

  // Toggle power state if any device is off
  for (const device of devices) {
    const isOn = await device.getPowerState();
    if (!isOn) {
      await device.togglePowerState();
    }
  }

  // Create BulbWrapper instances and start the effect on each bulb
  const bulbs = devices.map((device) => new BulbWrapper(device));
  for (const bulb of bulbs) {
    const randomInterval = 10000 + Math.floor(Math.random() * 15000); // Random interval between 2000ms and 5000ms
    bulb.startFlagLoop(randomInterval); // Apply the lighting effect with random intervals
  }
})();
