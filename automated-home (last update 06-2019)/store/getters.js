export default {
    test(state) {
        return state.testProp;
    },
    devices(state) {
        return state.devices;
    },
    device: state => deviceId => state.devices.find(device => {
        if (device.id !== deviceId) return false;
        else {
            switch (device.name) {
                case "thermostat":
                    device.scheduleObjects = device.schedules.map(x => state.schedules.find(y => {
                        return x === y.id
                    }));
                    break;
            }
            return true;
        }
    }),
    schedules(state) {
        console.log(state.schedules);

        return state.schedules
    },
    tickers(state) {
        console.log(state.tickers);

        return state.tickers
    },
    sensors(state) {
        console.log(state.sensors);

        return state.sensors
    },
    mqttMessages(state) {
        return state.mqttMessages;
    },
    options(state) {
        return state.options;
    },
    status(state) {
        return state.status;
    },
    loading(state) {
        return state.status.loadingDevices || state.status.loadingSensors
    }
}