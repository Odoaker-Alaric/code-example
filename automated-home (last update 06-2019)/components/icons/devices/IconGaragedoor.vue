<template>
  <svg
    class="icon icon-garagedoor"
    v-if="active"
    :class="{ 'animate': animate}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16.9333 16.9333"
  >
    <g>
      <defs>
        <clipPath id="wtf" class="garage__door-container" clipPathUnits="userSpaceOnUse">
          <rect
            style="opacity:1;fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:0.01;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="rect4952"
            width="11.3"
            height="10"
            x="2.9104166"
            y="5"
          ></rect>
        </clipPath>
      </defs>
      <path
        class="garage__walls"
        d="M0 2.1167v12.7h2.9104V5.027h11.203v9.7896h2.9104v-12.7H2.9104z"
      ></path>
      <g class="garage__car" stroke="#000">
        <g stroke-miterlimit="0" stroke-width=".0577" transform="translate(.127 -279.9663)">
          <rect width="1.4205" height="1.7796" x="10.5269" y="292.9745" rx=".3543"></rect>
          <rect width="1.4205" height="1.7796" x="4.8214" y="292.9745" rx=".3543"></rect>
        </g>
        <path
          fill="#fff"
          stroke-width=".42"
          d="M4.137 13.5465h8.735c.1771 0 .3101-.1182.3198-.2646l.1262-1.9096c.0097-.1464-.1426-.2646-.3199-.2646H4.0245c-.1772 0-.3285.1181-.3199.2646l.1125 1.9096c.0086.1464.1427.2646.3199.2646z"
        ></path>
        <g fill="none" stroke-width=".143">
          <path
            d="M4.5994 12.2477H6.154c.0316 0 .0552-.0254.057-.0569l.0224-.411c.0017-.0314-.0254-.0564-.057-.0568-1.632-.0208-1.5893-.01-1.597 0-.0194.0249-.0585.0254-.057.0569l.02.411c.0016.0314.0254.0568.057.0568zM10.8662 12.2137h1.5546c.0316 0 .0552-.0254.057-.0569l.0224-.411c.0017-.0314-.0254-.0568-.0569-.0568h-1.5971c-.0316 0-.0585.0254-.057.0569l.02.411c.0016.0314.0255.0568.057.0568z"
          ></path>
        </g>
        <path
          fill="none"
          stroke-width=".171"
          d="M7.2213 12.0079h2.576c.0523 0 .0915.0422.0944.0946l.0372.683c.0029.0524-.042.0946-.0943.0946H7.188c-.0522 0-.0968-.0422-.0943-.0946l.0332-.683c.0025-.0524.042-.0946.0943-.0946z"
        ></path>
        <g fill="none" stroke-miterlimit="0" stroke-width=".05">
          <path
            d="M7.3713 12.0542v.8394M7.6246 12.0396v.8394M7.878 12.0594v.8394M8.1313 12.0406v.8394M8.3847 12.0427v.8394M8.638 12.049v.8394M8.8914 12.047v.8393M9.1447 12.0532v.8394M9.398 12.0386v.8394M9.6514 12.024v.8393"
          ></path>
        </g>
        <path
          fill="#fff"
          stroke-width=".42"
          d="M6.2376 8.27h4.5476c.1963 0 .263.1806.3543.3544l1.0513 2.4568H4.832l1.0513-2.4568c.0913-.1738.158-.3544.3543-.3544z"
        ></path>
        <g>
          <path
            stroke-width=".17099805399999998"
            d="M3.3672 9.8842a.0262.0262 0 0 0-.0263.0264v.6087c0 .0147.0117.0264.0263.0264h1.2702a.0262.0262 0 0 0 .0264-.0264v-.6087a.0262.0262 0 0 0-.0264-.0264zm1.2997.3256h.4444z"
          ></path>
          <path
            stroke-width=".171"
            d="M13.6555 9.9466a.0262.0262 0 0 1 .0264.0264v.6087a.0262.0262 0 0 1-.0264.0264h-1.2702a.0262.0262 0 0 1-.0264-.0264V9.973a.0262.0262 0 0 1 .0264-.0264zm-1.2997.3255h-.4444z"
          ></path>
        </g>
      </g>
      <g clip-path="url(#wtf)">
        <g id="garage__door" class="garage__door" fill="#fff" stroke="#000" stroke-width=".1381">
          <path d="M2.9104 5.0272h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 7.4486h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 9.87h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 12.2914h11.1811v2.4568H2.9104z"></path>
        </g>
      </g>
    </g>
  </svg>
  <svg
    class="icon icon-garagedoor"
    v-else
    :class="{ 'animate': animate}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16.9333 16.9333"
  >
    <g>
      <defs>
        <clipPath id="wtf" class="garage__door-container" clipPathUnits="userSpaceOnUse">
          <rect
            style="opacity:1;fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:0.01;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            id="rect4952"
            width="11.3"
            height="10"
            x="2.9104166"
            y="5"
          ></rect>
        </clipPath>
      </defs>
      <path
        class="garage__walls"
        d="M0 2.1167v12.7h2.9104V5.027h11.203v9.7896h2.9104v-12.7H2.9104z"
      ></path>
      <g class="garage__car" stroke="#000">
        <g stroke-miterlimit="0" stroke-width=".0577" transform="translate(.127 -279.9663)">
          <rect width="1.4205" height="1.7796" x="10.5269" y="292.9745" rx=".3543"></rect>
          <rect width="1.4205" height="1.7796" x="4.8214" y="292.9745" rx=".3543"></rect>
        </g>
        <path
          fill="#fff"
          stroke-width=".42"
          d="M4.137 13.5465h8.735c.1771 0 .3101-.1182.3198-.2646l.1262-1.9096c.0097-.1464-.1426-.2646-.3199-.2646H4.0245c-.1772 0-.3285.1181-.3199.2646l.1125 1.9096c.0086.1464.1427.2646.3199.2646z"
        ></path>
        <g fill="none" stroke-width=".143">
          <path
            d="M4.5994 12.2477H6.154c.0316 0 .0552-.0254.057-.0569l.0224-.411c.0017-.0314-.0254-.0564-.057-.0568-1.632-.0208-1.5893-.01-1.597 0-.0194.0249-.0585.0254-.057.0569l.02.411c.0016.0314.0254.0568.057.0568zM10.8662 12.2137h1.5546c.0316 0 .0552-.0254.057-.0569l.0224-.411c.0017-.0314-.0254-.0568-.0569-.0568h-1.5971c-.0316 0-.0585.0254-.057.0569l.02.411c.0016.0314.0255.0568.057.0568z"
          ></path>
        </g>
        <path
          fill="none"
          stroke-width=".171"
          d="M7.2213 12.0079h2.576c.0523 0 .0915.0422.0944.0946l.0372.683c.0029.0524-.042.0946-.0943.0946H7.188c-.0522 0-.0968-.0422-.0943-.0946l.0332-.683c.0025-.0524.042-.0946.0943-.0946z"
        ></path>
        <g fill="none" stroke-miterlimit="0" stroke-width=".05">
          <path
            d="M7.3713 12.0542v.8394M7.6246 12.0396v.8394M7.878 12.0594v.8394M8.1313 12.0406v.8394M8.3847 12.0427v.8394M8.638 12.049v.8394M8.8914 12.047v.8393M9.1447 12.0532v.8394M9.398 12.0386v.8394M9.6514 12.024v.8393"
          ></path>
        </g>
        <path
          fill="#fff"
          stroke-width=".42"
          d="M6.2376 8.27h4.5476c.1963 0 .263.1806.3543.3544l1.0513 2.4568H4.832l1.0513-2.4568c.0913-.1738.158-.3544.3543-.3544z"
        ></path>
        <g>
          <path
            stroke-width=".17099805399999998"
            d="M3.3672 9.8842a.0262.0262 0 0 0-.0263.0264v.6087c0 .0147.0117.0264.0263.0264h1.2702a.0262.0262 0 0 0 .0264-.0264v-.6087a.0262.0262 0 0 0-.0264-.0264zm1.2997.3256h.4444z"
          ></path>
          <path
            stroke-width=".171"
            d="M13.6555 9.9466a.0262.0262 0 0 1 .0264.0264v.6087a.0262.0262 0 0 1-.0264.0264h-1.2702a.0262.0262 0 0 1-.0264-.0264V9.973a.0262.0262 0 0 1 .0264-.0264zm-1.2997.3255h-.4444z"
          ></path>
        </g>
      </g>
      <g clip-path="url(#wtf)">
        <g id="garage__door" class="garage__door" fill="#fff" stroke="#000" stroke-width=".1381">
          <path d="M2.9104 5.0272h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 7.4486h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 9.87h11.1811v2.4567H2.9104z"></path>
          <path d="M2.9104 12.2914h11.1811v2.4568H2.9104z"></path>
        </g>
      </g>
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
.icon-garagedoor {
}
.garage__door {
  animation: 10s lift-garage-door linear infinite alternate-reverse;
}
@keyframes lift-garage-door {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.icon-garagedoor.active {
}
</style>
