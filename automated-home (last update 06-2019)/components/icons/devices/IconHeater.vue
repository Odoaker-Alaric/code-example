<template>

<svg class="icon icon-heater" v-if="active" :class="{ 'animate': animate}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
<path style="fill:#D6CBC7;" d="M48.067,58H9.933C9.694,58,9.5,57.806,9.5,57.567V0h39v57.567C48.5,57.806,48.306,58,48.067,58z"/>
<rect x="12.5" y="31" style="fill:#AFA7A5;" width="20" height="13"/>
<path style="fill:#EDE5E2;" d="M48.067,58H9.933C9.694,58,9.5,57.806,9.5,57.567V46h39v11.567C48.5,57.806,48.306,58,48.067,58z"/>
<line style="fill:none;stroke:#4C4C4F;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" x1="26.5" y1="52" x2="31.5" y2="52"/>
<rect x="14.5" y="33" style="fill:#A4CA83;" width="16" height="9"/>
<rect x="17.5" y="36" style="fill:#475B34;" width="3" height="3"/>
<rect x="24.5" y="36" style="fill:#475B34;" width="3" height="3"/>
<circle style="fill:#556080;stroke:#556080;stroke-width:2;stroke-miterlimit:10;" cx="39.5" cy="38" r="4"/>
<line style="fill:none;stroke:#7383BF;stroke-width:2;stroke-miterlimit:10;" x1="39.5" y1="38" x2="42.5" y2="35"/>
</svg>

<svg v-else class="icon icon-heater" :class="{ 'animate': animate && animatePassive}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<g>
	<path d="M9.5,0v46v12.567c0,0.79,0.643,1.433,1.433,1.433h38.135c0.79,0,1.433-0.643,1.433-1.433V46V0H9.5z M48.5,58h-37V48h37V58z
		 M11.5,46V2h37v44H11.5z"/>
	<path d="M27.5,54h5c0.553,0,1-0.447,1-1s-0.447-1-1-1h-5c-0.553,0-1,0.447-1,1S26.947,54,27.5,54z"/>
	<path d="M14.5,44h18V33h-18V44z M16.5,35h14v7h-14V35z"/>
	<path d="M17.5,41h5v-5h-5V41z M19.5,38h1v1h-1V38z"/>
	<path d="M24.5,41h5v-5h-5V41z M26.5,38h1v1h-1V38z"/>
	<path d="M40.5,34c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S43.257,34,40.5,34z M40.5,42c-1.654,0-3-1.346-3-3s1.346-3,3-3
		c0.462,0,0.894,0.114,1.285,0.301l-1.992,1.992l1.414,1.414l1.992-1.992C43.387,38.106,43.5,38.538,43.5,39
		C43.5,40.654,42.154,42,40.5,42z"/>
</g>
</svg>

</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
    },
    animatePassive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.icon-heater {

}
</style>
