<template>
  <div class="calendar-body px-4 py-3">
    <div class="d-flex justify-content-between">
      <div
        v-for="(month, index) in months"
        :key="index"
        class="calendar-element"
      >
        <p class="calendar-text">{{ month }}</p>
        <div v-for="(block, i) in blocks" :key="i">
          <div v-if="month === block.month">
            <div v-for="i in block.count" :key="i">
              <div
                :class="block.class_name"
                class="calendar-step"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    calendar_list: {
      type: Array,
      default: () => []
    },
    months: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    calendar_list: {
      handler () {
        this.generateBlocks()
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      blocks: []
    }
  },
  methods: {
    generateBlocks () {
      setTimeout(() => {
        if (this.blocks.length) this.blocks = []

        if (this.calendar_list && this.calendar_list.length) {
          for (let month in this.months) {
            this.calendar_list.forEach(l => {
              if (month === l.month) {
                this.blocks.push({
                  month: this.months[month],
                  count: 1,
                  class_name: l.status
                })
              }
            })
          }
        }
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.calendar-body {
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 100px;
  width: 100%;

  .calendar-element {
    width: 100px;
    text-align: center;

    .calendar-step {
      width: 70px;
      height: 5px;
      border-radius: 10px;
      margin-bottom: 4px;
      margin-left: 5px;
    }
    .completed {
      background-color:  #37da37;
    }
    .unset {
      background-color: #67daec;
    }
    .booked {
      background-color: #007bff;
    }

    .calendar-text {
      font-size: 14px;
      color: #17a2b8;
    }
  }
}

</style>
