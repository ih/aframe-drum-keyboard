AFRAME.registerComponent('keyboard-key', {
  schema: {
    code: {type: 'string'},
    label: {type: 'string'},
    collidable: {type: 'string'}
  },

  init: function () {
    let _this = this;
    // comes from the button component
    this.el.addEventListener('pressed', () => {
      _this.el.emit('keypress', {
        code: _this.data.code,
        label: _this.data.label
      });
    });

    let uiButtonAttributes = this.el.getAttribute('ui-button');
    // why can't we create this directly from HTML?
    let label = document.createElement('a-entity');
    label.setAttribute('text', {
      value: this.data.label ? this.data.label : this.data.code,
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
