import now from '~/functions/now';

export default {
    //devices
    addDevice(state, device) {
        state.devices.push(device);
        state.devices = state.devices.sort((a, b) => a.id - b.id);
    },
    removeDeviceById(state, deviceId) {
        var index = state.devices.findIndex(x => x.id == deviceId);
        if (~index) {
            state.devices.splice(index, 1);
        }
    },
    changeDeviceProperty(state, payload) {
        var deviceId = payload.deviceId;
        var propertyName = payload.propertyName;
        var newValue = payload.newValue;
        var propertyType = payload.propertyType;
        switch (propertyType) {
            case "int":
            case "long":
                newValue = parseInt(newValue);
                break;
            case "bool":
                newValue = (newValue.toString() === "True");
                break;
            default:
                newValue = newValue.toString();
        }
        try {
            state.devices.find(x => x.id === deviceId)[propertyName] = newValue;
        } catch (err) {
            //Devices are not initialized yet. Fill the array "devices" first.
        }
    },
	changeDevice(state, device) {
		var index = state.devices.findIndex(x => x.id === device.id);
		if (~index) {
			state.devices.splice(index, 1, device);
		}
	},


    addSensor(state, sensor) {
        state.sensors.push(sensor);
        state.sensors.sort((a, b) => a.id - b.id);
    },
    removeSensorById(state, sensorId) {
        var index = state.sensors.findIndex(x => x.id == sensorId);
        if (~index) {
            state.sensors.splice(index, 1);
        }
    },



    addTicker(state, ticker) {
        state.tickers.push(ticker);
        state.tickers = state.tickers.sort((a, b) => a.id - b.id);
    },
    removeTickerByID(state, tickerId) {
        var index = state.tickers.findIndex(x => x.id == tickerId);
        if (~index) {
            state.tickers.splice(index, 1);
        }
    },


    addSchedule(state, schedule) {
        state.schedules.push(schedule);
        state.schedules = state.schedules.sort((a, b) => a.id - b.id);
    },
    removeScheduleById(state, scheduleId) {
        var index = state.schedules.findIndex(x => x.id == scheduleId);
        if (~index) {
            state.schedules.splice(index, 1);
        }
    },

    addMqttMessage(state, object) {
        if (state.mqttMessages.length > state.options.maxMqttMessageBuffer) state.mqttMessages.shift();
        state.mqttMessages.push({
            date: now(),
            topic: object.topic,
            data: object.data.toString()
        });
    },
    saveOptions(state, options) {
        state.options = options;
    }

}