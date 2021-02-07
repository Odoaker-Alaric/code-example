<template>
  <div class="map" v-if="lights && lights.length > 0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 282.159 225.221"
    >
      <g transform="translate(131.139 -25.254)">
        <path d="M-131.139 25.254v225.22H151.021v-78.27h-46.68V34.22H41.406v-8.966z" fill="#b3b3b3"></path>

        <path
          v-for="room in roomsWithLights"
          :key="room.name"
          :d="room.path"
          class="map__room"
          :class="{['map__room--' + room.name]:true}"
          :style="{fill: room.light.isActive ? 'yellow':'black'}"
          @click="room.light.toggle()"
        ></path>
        <!-- <path d="M34.371 128.006v17.239h7.367v1.207h11.009v-16.726H43.86v-1.72z" fill="blue"></path> -->
        <path d="M336.217 60.035l32.594-32.15 10.9 11.05-32.593 32.15z" ></path>
        <path d="M104.34 181.887h41.01v68.588h-41.01z"></path>
      </g>
    </svg>
    
    <!-- <button v-for="light in lights" @click="light.toggle()" :key="light">svetlo {{ light.name }}</button> -->
  </div>
</template>

<script>
import IconGaragedoor from "~/components/icons/devices/IconGaragedoor";

export default {
  name: "Map",
  components: { IconGaragedoor },
  data() {
    return {
      rooms: [
        {
          name: "garage",
          path: "M-116.398 38.934h80.474v43.833h-80.474z"
        },
        {
          name: "backhall",
          path: "M-32.65 38.934H4.367v43.833H-32.65z"
        },
        {
          name: "backroom",
          path: "M9.178 38.934v43.833H90.56V45.75H32.163v-6.816z"
        },
        {
          name: "midhall",
          path: "M-11.402 82.767v36.748l-15.988 15.77h-7.532v32.995h15.502v-7.871h3.074v-14.214l23.252-22.937V89.315H3.164v-6.548z"
        },
        {
          name: "smallroom",
          path: "M8.242 89.315v34.01H8.24v2.48h37.086v1.796l45.369-.067v-38.22z"
        },
        {
          name: "wc2",
          path: "M4.593 128.006l-17.476 17.239h44.46v-17.239z"
        },
        {
          name: "bathroom",
          path: "M-65.039 89.315v44.5h36.78l15.605-15.393V92.455h.01v-3.14z"
        },
        {
          name: "largeroom",
          path: "M-116.398 89.315h49.515v71.028h-49.515z"
        },
        {
          name: "storageroom",
          path: "M-65.039 135.285h27.538v25.257H-65.04z"
        },
        {
          name: "livingroom",
          path: "M-116.398 168.28H-2.06v71.249h-114.338z"
        },
        {
          name: "kitchen",
          path: "M4.933 168.28h47.814v32.128H4.933z"
        },
        {
          name: "passhall",
          path: "M4.932 202.015v.874H-2.06v15.119h6.992v3.85h47.815v-3.85h5.008v-15.12h-5.008v-.873z"
        },
        {
          name: "fridgeroom",
          path: "M4.933 224.504h34.962v15.025H4.933z"
        },
        {
          name: "washroom",
          path: "M41.88 224.362v15.167h10.867v-5.056h5.008v-10.11z"
        },
        {
          name: "wc1",
          path: "M57.755 220.96h34.49v18.569h-34.49z"
        },
        {
          name: "fronthall",
          path: "M57.755 145.245h34.49v74.326h-34.49z"
        },
        {
          name: "cellar",
          path: "M57.755 129.726h34.49v13.911h-34.49z"
        },
        {
          name: "stairs",
          path: "M-14.58 146.452h67.327v13.796H-14.58z"
        }
      ]
    };
  },
  computed: {
    roomsWithLights() {
      const rooms = this.rooms.map(room => ({
        ...room,
        light: this.getLightByRoomName(room.name)
      }));
      return rooms;
    },
    lights() {
      const lights = this.$store.getters.devices.filter(
        x => x.name === "light"
      );

      console.log("lights :", lights.map(x => x.room));
      return lights;
    }
  },
  methods: {
    isLightActiveInRoom(roomName) {
      const index = this.lights.findIndex(x => x.room === roomName);
      console.log(index);

      if (~index) {
        this.lights[index].toggle();
      } else {
        console.warn(`Lights not found in room called:${roomName}`);
      }
    },
    getLightByRoomName(roomName) {
      const index = this.lights.findIndex(x => x.room === roomName);

      if (~index) {
        return this.lights[index];
      } else {
        console.warn(`Lights not found in room called:${roomName}`);
      }
    }
  }
};
</script>

<style lang="scss">
.map {

  &__room {
    transition: .3s fill;
  }
}

// states
.map {
  &__room:hover {
    cursor: pointer;
  }
}
</style>
