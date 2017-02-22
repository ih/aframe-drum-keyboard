AFRAME.registerComponent('mallet', {
  schema: {
    hand: {type: 'selector'},
    color: {type: 'color', default: 'blue'}
  },

  init: function () {
    // create the geometry of the mallet
    let ball = document.createElement('a-entity');
    ball.setAttribute('geometry', {
      primitive: 'sphere',
      radius: .1
    });
    ball.setAttribute('material', {color: this.data.color});
    ball.setAttribute('position', {x: 0, y: 0, z: -.3});

    let handle = document.createElement('a-entity');
    handle.setAttribute('geometry', {
      primitive: 'cylinder',
      radius: .01,
      height: .3
    });
    handle.setAttribute('material', {color: this.data.color});
    handle.setAttribute('rotation', {x: 90, y: 0, z: 0});
    handle.setAttribute('position', {x: 0, y: 0, z: -.25});
    this.el.appendChild(ball);
    this.el.appendChild(handle);
  },

  tick: function (time, timeDelta) {
    if (!this.data.hand) {
      return;
    }
    let newMalletPosition = this.data.hand.getAttribute('position');
    let newMalletRotation = this.data.hand.getAttribute('rotation');
    //newMalletRotation.z += 90;
    //newMalletRotation.y += 90;
    // newMalletRotation.z += -45;

    this.el.setAttribute('position', newMalletPosition);
    this.el.setAttribute('rotation', newMalletRotation);
  }
});
