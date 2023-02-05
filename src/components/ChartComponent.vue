<template>
  <div class="custom-container  mt-3">
    <b-row class="">
      <h2>2021 Wellness Plan</h2>
    </b-row>
    <b-row>
      <div class="chart-component py-4 px-3 mb-5">
        <div class="d-flex justify-content-between">
          <div>
            <h4>
              <b>Your Progress</b>
              <span class="step-count">
                {{ steps }} steps to complete
              </span>
            </h4>
          </div>
          <div>
            <button
              v-b-toggle.chart-data
              class="hide-button"
            >
              hide
            </button>
          </div>
        </div>
        <b-collapse id="chart-data" class="grid-container">
          <div class="chart">
            <doughnut-component :percentage="percentage"/>
          </div>
          <div class="calendar-data">
            <div class="calendar mb-3">
              <calendar-component :calendar_list="calendar_list" :months="months"/>
            </div>
            <div class="bookings" v-for="booking in bookings" :key="booking.id">
              <data-component :data="booking" @removeBooking="removeBookingById"/>
            </div>
          </div>
        </b-collapse>
      </div>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ChartComponent',
  data () {
    return {
      steps: 0,
      bookings: [],
      calendar_list: null,
      percentage: 0,
      months: {}
    }
  },
  computed: {
    ...mapGetters(['getBooking', 'getMonths'])
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    getData (bookings) {
      let data = bookings || this.getBooking
      this.bookings = data
      this.months = this.getMonths
      this.calendar_list = this.getMonthWithCount(data, this.months)
      this.percentage = this.getPercentage(data)
      this.steps = data.filter(elem => elem.status !== 'completed').length
    },
    getMonthWithCount: (bookings, months) => {
      let result = []
      for (let month in months) {
        bookings.forEach(booking => {
          if (month === booking.month) {
            let res = {
              'month': month,
              'status': booking.status
            }
            result.push(res)
            res = {}
          }
        })
      }
      return result
    },
    getPercentage: (bookings) => {
      let total = bookings.filter(elem => elem.status !== 'unset')
      let completed = bookings.filter(elem => elem.status === 'completed')
      return Math.ceil((completed.length * 100) / total.length)
    },
    removeBookingById (id) {
      let filteredBookings = this.bookings.filter(booking => booking.id !== id)
      this.getData(filteredBookings)
    }
  }
}
</script>

<style scoped lang="scss">
.custom-container {
  width: 80%;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 0;
  gap: 0 10px;
  grid-template-areas:
    "chart calendar calendar"
    "chart bookings bookings";

  .chart {
    grid-area: chart;
  }

  .calendar-data {
    grid-area: calendar;
  }

  .bookings {
    grid-area: bookings;
  }
}

.chart-component {
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 100%;
  height: 100%;

  .step-count {
    font-size: 13px;
    opacity: 0.5;
  }

  .hide-button {
    background: transparent;
    border: none;
    border-bottom: 1px solid #807f7f;
    color: #807f7f;
    cursor: pointer;
    padding: 0;
  }
}
</style>
