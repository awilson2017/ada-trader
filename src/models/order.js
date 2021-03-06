import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    targetPrice: 9.00,
    buy: true,
  },
  validate: function(attributes) {
    let error = '';

    if (attributes.buy && (attributes.targetPrice >= attributes.quote.get('price'))) {
      error = 'Price higher than market price!';
    } else if (!attributes.buy && (attributes.targetPrice <= attributes.quote.get('price'))) {
      error = 'Price lower than market price!';
    } else if (isNaN(attributes.targetPrice)) {
      error = 'Invalid Target Price';
    }

    if (error != '') {
      return error
    } else {
      return false
    }
  },
})

export default Order
