<template>
  <div class="data-container mb-2">
    <div
      v-if="data"
      class="card-body d-flex justify-content-between align-items-center"
    >
      <div>
        {{ data.title }}
      </div>
      <b-row class="d-flex justify-content-between" align-v="baseline">
        <div class="d-flex mr-10 align-items-center">
          <b-icon class="mr-10" :icon="icon" :variant="icon_color"></b-icon>
          <p :class="text_color_class">{{ formatStatus(data.status) }}</p>
        </div>
        <b-dropdown
          id="actions"
          no-caret
          right
          text="..."
          toggle-class='customDropdown'
          variant='none'
          size="md"
          class="mx-2"
        >
          <b-dropdown-item @click="$emit('removeBooking', data.id)">Delete</b-dropdown-item>
        </b-dropdown>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      icon: '',
      icon_color: '',
      text_color_class: ''
    }
  },
  mounted () {
    this.renderStatus(this.data.status)
  },
  methods: {
    formatStatus (status) {
      switch (status) {
        case 'completed':
          return status.charAt(0).toUpperCase() + status.slice(1)
        case 'booked':
          return status.charAt(0).toUpperCase() + status.slice(1)
        case 'unset':
          status = 'book now'
          return status.charAt(0).toUpperCase() + status.slice(1)
      }
    },
    renderStatus (status) {
      switch (status) {
        case 'completed':
          this.icon = 'check-circle'
          this.icon_color = 'success'
          this.text_color_class = 'success-text'
          break
        case 'booked':
          this.icon = 'calendar4-week'
          this.icon_color = 'primary'
          this.text_color_class = 'primary-text'
          break
        case 'unset':
          this.icon = 'calendar4'
          this.icon_color = 'info'
          this.text_color_class = 'info-text'
          break
      }
    }
  }
}
</script>

<style lang="scss">

.card-body {
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 74px;
  width: 100%;

  p {
    margin-bottom: 0;
  }

  .mr-10 {
    margin-right: 10px;
  }

  .show > .btn-secondary.dropdown-toggle {
    border: none;
    background: transparent;
    color: #818080;
  }

  .customDropdown {
      border: 1px solid;
  }

  .dropdown-toggle {
    border: none;
    background: transparent;
    color: #818080;
    font-size: 26px;
    padding: 0;

    &:focus{
      -webkit-box-shadow: none;
    }
  }

  .dropdown-item{
    text-align: center !important;
    font-size: 13px !important;
    color: red !important;
  }

  .success-text {
    color: #37da37;
    opacity: 0.5;
  }

  .primary-text {
    color: #007bff;
  }

  .info-text {
    color: #17a2b8;
    opacity: 0.7;
  }
}
</style>
