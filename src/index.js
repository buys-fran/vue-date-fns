var formatDate = require("date-fns/format");
let forHumans = require("date-fns/distance_in_words");

function createDateFilter (defaultFormat, defaultOptions) {
  return function dateFilter (date, format, opts) {
    if (!date) {
      return "";
    }

    if (((/for humans/i).test(format) || (/for humans/i).test(defaultFormat))) {
      const from = opts && opts.from ? new Date(opts.from) : new Date();
      return forHumans(from, date, Object.assign(defaultOptions || {}, opts));
    }

    return formatDate(date, format || defaultFormat, Object.assign(defaultOptions || {}, opts));
  };
}

function install (Vue, defaultFormat, defaultOptions) {
  var dateFilter = createDateFilter(defaultFormat, defaultOptions);

  Vue.filter("date", dateFilter);

  Vue.mixin({
    methods: {
      $date: dateFilter,
    },
  });
}

module.exports = install;

module.exports.createDateFilter = createDateFilter;

module.exports.dateFilter = createDateFilter();
