<template>
  <svg
    class="icon icon-graph"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background:new 0 0 512 512;"
    xml:space="preserve"
  >
    <path
      class="icon-graph__line"
      style="fill:#FEA832;"
      d="M15,347.642c-3.838,0-7.676-1.465-10.605-4.395c-5.859-5.859-5.859-15.352,0-21.211l181-180
	c5.859-5.859,15.352-5.859,21.211,0L286,221.431L486.395,22.036c5.859-5.859,15.352-5.859,21.211,0
	c5.859,5.859,5.859,15.352,0,21.211l-211,210c-5.859,5.859-15.352,5.859-21.211,0L196,173.853L25.605,343.247
	C22.676,346.177,18.838,347.642,15,347.642z"
      fill="none"
      stroke-width="4"
      stroke-miterlimit="10"
    ></path>
    <path
      style="fill:#FE9923;"
      d="M497,107.5c-8.291,0-15-6.709-15-15v-45h-45c-8.291,0-15-6.709-15-15s6.709-15,15-15h60
	c8.291,0,15,6.709,15,15v60C512,100.791,505.291,107.5,497,107.5z"
    ></path>
    <path
      style="fill:#1DE8F1;"
      d="M106,306.289L4.395,406.895C1.582,409.707,0,413.516,0,417.5v62c0,8.291,6.709,15,15,15h91
	l16.855-13.125V323.144L106,306.289z"
    ></path>
    <path
      style="fill:#18A7FC;"
      d="M212.874,254.375L196,222.5c-3.838,0-7.676,1.465-10.605,4.395L106,306.289V494.5h90l21.249-12.501
	L212.874,254.375z"
    ></path>
    <path
      style="fill:#1DE8F1;"
      d="M286,306.289l-79.395-79.395c-0.417-0.417-0.963-0.582-1.414-0.939
	c-2.717-2.155-5.9-3.455-9.192-3.455v2.142V494.5h90l17.499-19.374V328.751L286,306.289z"
    ></path>
    <polygon
      style="fill:#1689FC;"
      points="376,216.289 286,306.289 286,494.5 376,494.5 398.855,469.501 398.855,238.145 "
    ></polygon>
    <path
      style="fill:#1BD9DE;"
      d="M376,494.5h91c8.291,0,15-6.709,15-15v-332c0-6.064-3.647-11.543-9.258-13.857
	c-5.625-2.358-12.07-1.04-16.348,3.252L376,216.289V494.5z"
    ></path>
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
.icon-graph {
  &__line {
    stroke-dasharray: 1441;
    stroke-dashoffset: 1441;
    animation: dash 5s linear alternate infinite;
  }
}
@keyframes dash {
  from {
    stroke-dashoffset: 1441;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
