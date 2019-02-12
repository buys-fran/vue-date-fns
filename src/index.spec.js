/* eslint-env node, mocha */

let Vue = require("vue");
let formatDate = require("date-fns/format");
let distanceInWords = require("date-fns/distance_in_words");
let expect = require("chai").expect;
let { mount, createLocalVue } = require("@vue/test-utils");

let DateFnsPlugin = require(".");
let { dateFilter, createDateFilter } = DateFnsPlugin;

describe("using filter in component", function () {
  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { locale }) }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("with for humans format", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date));
    });
  });

  describe("with for humans format and options", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";
      let addSuffix = true;

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { addSuffix }) }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
            addSuffix: addSuffix,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date, { addSuffix }));
    });
  });

  describe("creating own filter with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("creating own filter with custom format and custom defaults", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat, { locale }),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("creating own filter with for humans format", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date, customFormat));
    });
  });

  describe("creating own filter with for humans format and custom defaults", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";
      let addSuffix = true;

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat, { addSuffix }),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date, { addSuffix }));
    });
  });
});

describe("using global filter", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin);
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("with for humans format", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date));
    });
  });

  describe("with for humans format and options", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";
      let addSuffix = true;

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { addSuffix }) }}</p>`,
        data () {
          return {
            myDate: date,
            addSuffix: addSuffix,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date, { addSuffix }));
    });
  });
});

describe("using global filter with custom format", function () {
  let localVue;
  let customFormat = "DD MMMM YYYY";

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, customFormat);
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale }));
    });
  });

  describe("with for humans format", function () {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let differentCustomFormat = "for humans";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date));
    });
  });

  describe("with for humans format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "for humans";
      let addSuffix = true;

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}', { addSuffix }) }}</p>`,
        data () {
          return {
            myDate: date,
            addSuffix: addSuffix,
          };
        },
      });

      let wrapper = mount(Wrapper, { addSuffix });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date, { addSuffix }));
    });
  });
});

describe("using global filter with custom format and custom defaults", function () {
  let localVue;
  let customFormat = "DD MMMM YYYY";
  let locale = require("date-fns/locale/ar");
  let addSuffix = true;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, customFormat, { locale, addSuffix });
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale }));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";
      let differentLocale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: differentLocale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale: differentLocale }));
    });
  });

  // describe("with for humans format", function () {
  // it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
  //   let date = new Date();
  //   let differentCustomFormat = "for humans";

  //   let Wrapper = localVue.extend({
  //     template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
  //     data () {
  //       return {
  //         myDate: date,
  //       };
  //     },
  //   });

  //   let wrapper = mount(Wrapper, { localVue });
  //   let text = wrapper.find("p").text();
  //   expect(text).to.be.ok;
  //   expect(text).to.equal(distanceInWords(new Date(), date));
  // });
  // });

  // describe("with for humans format and options", function () {
  //   it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
  //     let date = new Date();
  //     let differentCustomFormat = "for humans";
  //     let addSuffix = true;

  //     let Wrapper = localVue.extend({
  //       template: `<p>{{ myDate | date('${differentCustomFormat}', { addSuffix }) }}</p>`,
  //       data () {
  //         return {
  //           myDate: date,
  //           addSuffix: addSuffix,
  //         };
  //       },
  //     });

  //     let wrapper = mount(Wrapper, { localVue });
  //     let text = wrapper.find("p").text();
  //     expect(text).to.be.ok;
  //     expect(text).to.equal(distanceInWords(new Date(), date, { addSuffix: addSuffix }));
  //   });
  // });
});

describe("using mixin", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin);
  });

  describe("without any options", function () {
    it("should use mixin and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ $date(myDate) }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use mixin and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ $date(myDate, '${customFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY HH:mm";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ $date(myDate, '${customFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });
});

describe("for humans format", () => {
  describe("in components", () => {
    it("should use the filter and produce the same output as date-fns/distanceInWords", function () {
      let date = new Date();
      let customFormat = "for humans";

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(new Date(), date));
    });

    it("should take from date option and produce the same output as date-fns/distanceInWords", () => {
      let date = new Date();
      let customFormat = "for humans";
      let yesterday = new Date().setDate(new Date().getDate() - 1);
      console.log(yesterday);

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { from: yesterday }) }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
            yesterday,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(distanceInWords(yesterday, date));
    });
  });
});

describe("falsy values", function () {
  for (let testCase of [undefined, null, "", NaN]) {
    it(`should return empty string for '${testCase}'`, function () {
      expect(dateFilter(testCase)).to.equal("");
    });
  }
});
