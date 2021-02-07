import devicePrototypes from '~/prototypes/devices'
import Sensor from '~/prototypes/Sensor'
import Schedule from '~/prototypes/Schedule'
import Ticker from '~/prototypes/Ticker'
import Device from '~/prototypes/devices/Device'
import MqttPublisher from '~/plugins/mqttPublisher'

export default {
    initDevices({ state, dispatch }, objects) {
        state.devices = []

        console.log(new devicePrototypes['light']);

        objects.forEach(object => {
            dispatch('addDevice', object)
        })
        state.status.loadingDevices = false;
    },

    addDevice({ commit }, object) {
        if (devicePrototypes[object.name] !== undefined) {
            Object.setPrototypeOf(object, devicePrototypes[object.name].prototype);
            
        } else {
            Object.setPrototypeOf(object, new Device);
        }
        commit('addDevice', object)
    },

    removeDevice({ commit }, deviceId) {
        commit('removeDeviceById', deviceId)
    },

    newDevice({ }, payload) {
        MqttPublisher.publish('device/' + payload.id + '/add', payload.name + ',' + payload.room)
    },

    changeDevice({ commit }, object) {
        if (devicePrototypes[object.name] !== undefined) {
            Object.setPrototypeOf(object, new devicePrototypes[object.name]);
        } else {
            Object.setPrototypeOf(object, new Device);
        }
        commit('changeDevice', object)
    },

    initSchedules({ state, dispatch }, objects) {
        state.schedules = []
        objects.forEach(object => {
            dispatch('addSchedule', object)
        })

    },

    addSchedule({ commit }, object) {
        Object.setPrototypeOf(object, new Schedule)
        commit('addSchedule', object)
    },

    initSensors({ state, dispatch }, objects) {
        state.sensors = []
        objects.forEach(object => {
            dispatch('addSensor', object)
        })
        state.status.loadingSensors = false;
    },

    addSensor({ commit }, object) {
        Object.setPrototypeOf(object, new Sensor)
        commit('addSensor', object)
    },

    removeSensor({ commit }, sensorId) {
        commit('removeSensorById', sensorId)
    },

    newSensor({ }, payload) {
        MqttPublisher.publish('sensor/' + payload.id + '/add', payload.name + ',' + payload.station + ',' + payload.pin)
    },

    initTickers({ state, dispatch }, objects) {
        state.tickers = []
        objects.forEach(object => {
            dispatch('addTicker', object)
        })

    },

    addTicker({ commit }, object) {
        Object.setPrototypeOf(object, new Ticker)
        commit('addTicker', object)
    },

    addMqttMessage({ commit }, object) {
        commit('addMqttMessage', object)
    },
    save() {
        MqttPublisher.publish('request/save','');
    }
}