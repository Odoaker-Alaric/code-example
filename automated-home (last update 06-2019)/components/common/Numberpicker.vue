<template>
<div class="numberpicker">
    <div class="numberpicker__block">
        <button @click.prevent="decreaseNumber" tabindex="-1">▼</button>
        <input class="small" type="text" v-model="number" @keyup.up="increaseNumber" @keyup.down="decreaseNumber" @focus="$event.target.select()">
        <button @click.prevent="increaseNumber" tabindex="-1">▲</button>
    </div>
</div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 0.5
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      number: 20
    };
  },
  mounted() {
    this.$emit('changed', this.number);
  },
  watch: {
     number() {
        this.$emit('changed', this.number);
     }
  },
  methods: {
    increaseNumber() {
      this.number = this.number + this.step;
      if (this.number > this.max) {
        this.number = this.max;
      }
    },
    decreaseNumber() {
      this.number = this.number - this.step;
      if (this.number < this.min) {
        this.number = this.min;
      }
    }
  }
};
</script>

<style lang="scss">
.numberpicker {
  &__block {
    display: inline-flex;
    flex-flow: column-reverse;
  }

  input {
    text-align: center;
  }
  button {
    border: 0;
    background: 0;
  }
}

//states
.numberpicker {
    button:hover {
        cursor: pointer;
    }
}
</style>
