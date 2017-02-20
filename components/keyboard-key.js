AFRAME.registerComponent('keyboard-key', {
  schema: {
    value: {type: 'string'}
  },

  init: function () {
    let _this = this;
    this.el.addEventListener('pressed', () => {
      console.log(_this.data.value);
    });

    let uiButtonAttributes = this.el.getAttribute('ui-button');
    // why can't we create this directly from HTML?
    let label = document.createElement('a-entity');
    label.setAttribute('text', {
      value: this.data.value,
      align: 'center',
      width: 3
    });
    label.setAttribute('rotation', { x: -90, y: 0, z: 0 });
    label.setAttribute('position', {x: 0, y: uiButtonAttributes.size, z: 0});
    this.el.appendChild(label);
  }
})
