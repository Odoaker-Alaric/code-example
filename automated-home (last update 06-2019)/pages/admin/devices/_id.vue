<template>
    <div class="a-device">
      <!-- device info -->
      <div class="table b-box">
        <div class="thead">
          <div class="tr text-center">
            <th class="th" colspan="2">
              <component :is="'icon-' + device.name " :active="true" ></component>
            </th>
          </div>
        </div>
        <div class="tr">
          <div class="th">ID</div>
          <div class="td">{{device.id}}</div>
        </div>
        <div class="tr">
          <div class="th">name</div>
          <div class="td">{{device.name}}</div>
        </div>
        <div class="tr">
          <div class="th">room</div>
          <div class="td">{{device.room}}</div>
        </div>
      </div>
      <!-- attach device -->
      <div class="table b-box">
        <div class="thead">
          <div class="tr">
            <th class="th" colspan="4">Attach Device</th>
          </div>
        </div>
        <div class="thead">
          <div class="tr">
            <div class="th"></div>
            <div class="th"><input type="number" @keyup.enter="attachDevice(form.attachDeviceId)" v-model="form.attachDeviceId"></div>
            <div class="th"></div>
            <div class="th"></div>
          </div>
        </div>
        <div class="thead">
          <div class="tr">
            <div class="th">ID</div>
            <div class="th">name</div>
            <div class="th">room</div>
            <div class="th"></div>
          </div>
        </div>
        <div class="tr" v-for="attachedDevice in attachedDevices" :key="attachedDevice.id">
          <div class="th">{{ attachedDevice.id }}</div>
          <div class="th">{{ attachedDevice.name }}</div>
          <div class="th">{{ attachedDevice.room }}</div>
          <div class="pointer" @click.prevent="detachDevice(attachedDevice.id)">X</div>
        </div>
      </div>
      <!-- attach sensor -->
      <div class="table b-box">
        <div class="thead">
          <div class="tr">
            <th class="th" colspan="5">Attach Sensor</th>
          </div>
        </div>
        <div class="thead">
          <div class="tr">
            <div class="th"></div>
            <div class="th"><input type="number" @keyup.enter="attachSensor(form.attachSensorId)" v-model="form.attachSensorId"></div>
            <div class="th"></div>
            <div class="th"><button class="button" @click.prevent="attachSensor(device.id)">Attach sensor with same ID</button></div>
            <div class="th"></div>
          </div>
        </div>
        <div class="thead">
          <div class="tr">
            <div class="th">ID</div>
            <div class="th">name</div>
            <div class="th">station</div>
            <div class="th">pin</div>
            <div class="th"></div>
          </div>
        </div>
        <div class="tr" v-for="attachedSensor in attachedSensors" :key="attachedSensor.id">
          <div class="th">{{ attachedSensor.id }}</div>
          <div class="th">{{ attachedSensor.name }}</div>
          <div class="th">{{ attachedSensor.station }}</div>
          <div class="th">{{ attachedSensor.pin }}</div>
          <div class="pointer" @click.prevent="detachSensor(attachedSensor.id)">X</div>
        </div>
      </div>
    </div>
</template>

<script>
import deviceIcons from "~/components/icons/devices";

export default {
  layout: "admin",
  components: deviceIcons,
  data() {
    return {
      form: {
        attachDeviceId: null,
        attachSensorId: null
      }
    }
  },
  computed: {
    device() {
      let id = this.$route.params.id;
      console.log(this.$store.getters.devices.find(x => x.id === parseInt(id)), "device");

      return this.$store.getters.devices.find(x => x.id === parseInt(id));
    },
    attachedDevices() {
      let devices = this.$store.getters.devices;
      return this.device.devices.map(x => devices.find(y => y.id === x.id));
    },
    attachedSensors() {
      let sensors = this.$store.getters.sensors;
      return this.device.sensors.map(x => sensors.find(y => y.id === x.id));
    }
  },
  methods: {
    attachDevice(deviceId) {
      this.device.attachDevice(deviceId);
      
    },
    detachDevice(deviceId) {
      if (confirm("Opravdu odpojit zařízení s ID: " + deviceId)) {
        this.device.detachDevice(deviceId);
      }
    },
    attachSensor(sensorId) {
      this.device.attachSensor(sensorId);
    },
    detachSensor(sensorId) {
      if (confirm("Opravdu odpojit sensor s ID: " + sensorId)) {       
        this.device.detachSensor(sensorId);
        
      }
    }
  }
};
</script>

<style scoped>
.a-device {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: row wrap;
  margin: -20px;
}

.table {
  margin: 20px;
}
</style>
