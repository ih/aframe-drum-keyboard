AFRAME.registerComponent('keyboard-key', {
  schema: {
    value: {type: 'string'}
  },

  init: function () {
    var _this = this;
    this.el.addEventListener('pressed', function () {
      console.log(_this.data.value);
    });
  }
})
