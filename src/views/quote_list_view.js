import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
// import Quote from '../models/quote';
// import CurrentQuoteView from './current_selected_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
    console.log(this.model);
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {
    'update this': 'checkQuote',
  },
  checkQuote() {
    this.bus.trigger('completeOrder', this)
  }
});

export default QuoteListView;
