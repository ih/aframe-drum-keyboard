AFRAME.registerComponent('keyboard-key', {
  schema: {
    value: {type: 'string'},
    label: {type: 'string'},
    collidable: {type: 'string'}
  },

  init: function () {
    let _this = this;
    // comes from the button component
    this.el.addEventListener('pressed', () => {
      // don't bubble, instead the keyboard will receive the event
      // then emit it's own event that may take into account other factors e.g. shift key
      _this.el.emit('keypress', {
        value: _this.data.value,
        label: _this.data.label
      }, false);
    });

    let uiButtonAttributes = this.el.getAttribute('ui-button');
    // why can't we create this directly from HTML?
    let label = document.createElement('a-entity');
    label.setAttribute('text', {
      value: this.data.label ? this.data.label : this.data.value,
      align: 'center',
      width: 3
    });
    label.setAttribute('rotation', { x: -90, y: 0, z: 0 });
    label.setAttribute('position', {x: 0, y: uiButtonAttributes.size, z: 0});
    this.el.appendChild(label);

    this.collidables = this.el.sceneEl.querySelectorAll(this.data.collidable);
  },

  tick: function () {
    let top = this.el.querySelector('.top');
    let mesh = top.getObject3D('mesh');
    let topBB = new THREE.Box3().setFromObject(mesh);
    let self = this;
    // move definition of collidables to udpate?
    this.collidables.forEach(function(collidable) {
      let collidableBB = new THREE.Box3().setFromObject(collidable.object3D);
      let collision = topBB.intersectsBox(collidableBB);

      if (collision) {
        // get the button to do a keypress
        self.el.emit('hit');
      }
    });
  }
});
