import Vue from 'vue'
import VueMqtt from 'vue-mqtt';

Vue.use(VueMqtt, 'mqtt://185.64.41.222:4584/');

export default ({ store }) => {
	const vueMqttClient = new Vue({
		mqtt: {
			//devices
			'response/devices'(data) {
				data = JSON.parse(data);
				store.dispatch('initDevices', data);
			},
			'device/+/added': function (data, topic) {
				let device = JSON.parse(data);
				store.dispatch('addDevice', device);
			},
			'device/+/changed': function (data, topic) {
				let device = JSON.parse(data);
				store.dispatch('changeDevice', device);
			},
			'device/+/removed': function (data, topic) {
				let deviceId = parseInt(topic.split('/')[1]);
				store.dispatch('removeDevice', deviceId);
			},
			'device/+/changed/+/+': function (data, topic) {
				topic = topic.split('/');
				let deviceId = parseInt(topic[1]);
				let propertyName = topic[3];
				let propertyType = topic[4];
				store.commit('changeDeviceProperty', { deviceId, propertyName, propertyType, newValue: data })
			},

			//sensors
			'response/sensors': function (data, topic) {
				data = JSON.parse(data);
				store.dispatch('initSensors', data);
			},
			'sensor/+/added': function (data, topic) {
				let sensor = JSON.parse(data);
				store.dispatch('addSensor', sensor);
			},
			'sensor/+/removed': function (data, topic) {
				let sensorId = parseInt(topic.split('/')[1]);
				store.dispatch('removeSensor', sensorId);
			},

			//tickers
			'response/tickers': function (data, topic) {
				data = JSON.parse(data);
				store.dispatch('initTickers', data);
			},
			'ticker/+/added': function (data, topic) {
				let ticker = JSON.parse(data);
				store.dispatch('addTicker', ticker);
			},
			'ticker/+/removed': function (data, topic) {
				let tickerId = parseInt(topic.split('/')[1]);
			},

			//schedules
			'response/schedules': function (data, topic) {
				data = JSON.parse(data);
				store.dispatch('initSchedules', data);
			},
			'schedule/+/added': function (data, topic) {
				let schedule = JSON.parse(data);
				store.dispatch('addSchedule', schedule);
			},
			'schedule/+/removed': function (data, topic) {
				let scheduleId = parseInt(topic.split('/')[1]);
				store.dispatch('removeSchedule', scheduleId);
			},

			//errors, warnings, alerts
			'error': function (data, topic) {
				console.log(data.toString());

			},
			'warning': function (data, topic) {
				// this.flash(data.toString(), 'warning');
			},
			'info': function (data, topic) {
				// this.flash(data.toString(), 'info');
			},

			'#'(data, topic) {
				// console.log('topic: ' + topic + ', message: ' + data);

				store.dispatch('addMqttMessage', { topic, data });
			}

		},
		computed: {
			logAllMessages() {
				return store.getters.options.logAllMessages;
			}
		},
		watch: {
			logAllMessages(val) {
				if (val === true) {
					this.$mqtt.subscribe("#");
				} else {
					this.$mqtt.unsubscribe("#");
				}
			}
		},
		created: function () {
			this.$mqtt.publish('request/tickers', '');
			this.$mqtt.publish('request/schedules', '');
			this.$mqtt.publish('request/sensors', '');
			this.$mqtt.publish('request/devices', '');
		}
	})


	vueMqttClient.$mqtt.subscribe("device/+/added");
	vueMqttClient.$mqtt.subscribe("device/+/removed");
	vueMqttClient.$mqtt.subscribe("device/+/changed/#");
	vueMqttClient.$mqtt.subscribe("device/+/changed");
	vueMqttClient.$mqtt.subscribe("schedule/+/added");
	vueMqttClient.$mqtt.subscribe("schedule/+/removed");
	vueMqttClient.$mqtt.subscribe("ticker/+/added");
	vueMqttClient.$mqtt.subscribe("ticker/+/removed");
	vueMqttClient.$mqtt.subscribe("sensor/+/added");
	vueMqttClient.$mqtt.subscribe("sensor/+/removed");
	vueMqttClient.$mqtt.subscribe("response/+");
	vueMqttClient.$mqtt.subscribe("error");
	vueMqttClient.$mqtt.subscribe("warning");
	vueMqttClient.$mqtt.subscribe("info");
}