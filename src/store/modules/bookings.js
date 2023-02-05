export default {
  state: {
    bookings: [
      {id: 1, title: 'Hormone replacement therapy', status: 'completed', month: 'june'},
      {id: 2, title: 'Ozone therapy', status: 'completed', month: 'june'},
      {id: 3, title: 'NAD', status: 'completed', month: 'june'},
      {id: 4, title: 'Hormone replacement therapy', status: 'completed', month: 'june'},
      {id: 5, title: 'Ozone therapy', status: 'booked', month: 'february'},
      {id: 6, title: 'NAD', status: 'booked', month: 'february'},
      {id: 7, title: 'Hormone replacement therapy', status: 'unset', month: 'april'}
    ],
    months: {
      'january': 'Jan',
      'february': 'Feb',
      'march': 'Mar',
      'april': 'Apr',
      'may': 'May',
      'june': 'Jun',
      'july': 'Jul',
      'august': 'Aug',
      'september': 'Sep',
      'october': 'Oct',
      'november': 'Nov',
      'december': 'Dec'
    }
  },
  getters: {
    getBooking: (state) => state.bookings,
    getMonths: (state) => state.months
  }
}
