AFRAME.registerComponent('simple-display', {
  schema: {
    inputDevice: {type: 'selector'}
  },

  init: function () {
    this.textData = {
      value: '',
      align: 'center',
      width: 3
    };

    this.el.setAttribute('text', this.textData);
    let _this = this;
    this.data.inputDevice.addEventListener('keypress', (event) => {
      this.textData.value = this.textData.value + event.detail.key;
      _this.el.setAttribute('text', this.textData);
    });
  }
});
