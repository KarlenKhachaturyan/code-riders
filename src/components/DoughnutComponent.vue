<template>
  <div>
    <div class="donut-chart-container">
      <div class="donut-chart-inner-text">
        <div class="donut-chart-inner-value">{{ updatedPercentage }}<sup>%</sup></div>
        <br>
        <div>
          <div class="donut-chart-inner-desc">
            <span>Completed appointments</span>
          </div>
        </div>
      </div>
      <canvas width="500" id="doughnut-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'BarChart',
  props: {
    percentage: {
      type: Number,
      default: () => 0
    }
  },
  watch: {
    percentage: {
      handler () {
        this.draw(this.percentage)
      },
      immediate: true
    }
  },
  data () {
    return {
      updatedPercentage: 0
    }
  },
  mounted () {
    this.draw(this.percentage)
  },
  methods: {
    draw (percentage) {
      setTimeout(() => {
        const ctx = document.getElementById('doughnut-chart').getContext('2d')
        const competitorGradientStroke = ctx.createLinearGradient(0, 250, 0, 0)
        competitorGradientStroke.addColorStop(0, '#37da37')
        competitorGradientStroke.addColorStop(1, '#b0d4e2')

        const placeboGradientStroke = ctx.createLinearGradient(0, 250, 0, 0)
        placeboGradientStroke.addColorStop(0, '#cdcdcd')
        placeboGradientStroke.addColorStop(1, '#6e6e6e')
        // eslint-disable-next-line no-new
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              label: '',
              data: [percentage, 100 - percentage],
              backgroundColor: [competitorGradientStroke, '#e1e1e1'],
              hoverOffset: 4
            }]
          },
          options: {
            tooltips: {enabled: false},
            hover: {mode: null},
            cutoutPercentage: 80,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true
            }
          }
        })
        this.updatedPercentage = percentage
      }, 2000)
    }
  }
}
</script>

<style scoped>
canvas {
  width: 500px;
}

.donut-chart-container {
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
}

.donut-chart-inner-text {
  width: 100%;
  position: absolute;
  top: 40%;
  left: 0;
  margin-top: -20px;
  line-height: 19px;
  text-align: center;
  z-index: 1;
}

.donut-chart-inner-value {
  margin-top: calc(100% - 94%);
  font-size: 3em;
  font-weight: 600;
  color: #000;
}

.donut-chart-inner-value sup {
  font-size: 1.75rem;
}

.donut-chart-inner-desc {
  font-size: 1rem;
  max-width: 30%;
  text-align: center;
  position: relative;
  margin: calc(100% - 77%) auto auto auto;
}
</style>
