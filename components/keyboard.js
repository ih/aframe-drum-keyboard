AFRAME.registerComponent('keyboard', {

  init: function () {
    let defaultKeysData = this.generateDefaultKeyData();
    // create key entities i.e. entities w/ ui-button and keyboard-key components
    let keys = this.constructDefaultKeys(defaultKeysData);
    // build the layout which is a dictionary of positions for the keys
    let layout = this.constructDefaultLayout(defaultKeysData);
    // forward the key events as well as add the keys to the document and set
    // their position
    this.addKeysToKeyboard(defaultKeysData, keys, layout);
  },

  generateDefaultKeyData: function () {
    return '1234567890qwertyuiopasdfghjkl\nzxcvbnm '.split('').map((character) => {
      var keyData = {value: character};
      switch (character) {
        case '\n':
        keyData.label = 'enter';
        break;
        case ' ':
        keyData.label = 'space';
        break;
      }
      return keyData;
    });
  },

  constructDefaultKeys: function (keysData) {
    let keyEntities = {};
    keysData.forEach((keyData) => {
      let keyEntity = document.createElement('a-entity');
      keyEntity.setAttribute('ui-button', '');
      keyEntity.setAttribute('keyboard-key', {
        value: keyData.value,
        label: keyData.label
      });
      keyEntities[keyData.value] = keyEntity;
    });
    return keyEntities;
  },

  constructDefaultLayout: function (keysData) {
    let row1 = keysData.slice(0, 10);
    let row2 = keysData.slice(10, 20);
    let row3 = keysData.slice(20, 30);
    let row4 = keysData.slice(30, 37);
    let space = keysData[37];
    let layout = {};
    let height = 0;
    let keySpacing = .4;
    let rowSpacing = .5;
    let currentZ = 0;
    let leftRowPadding = .3;
    [row1, row2, row3, row4].forEach((row, index) => {
      let currentX = -1.5 + (index * leftRowPadding);
      row.forEach((keyData) => {
        layout[keyData.value] = {x: currentX, y: height, z: currentZ};
        currentX += keySpacing;
      });
      currentZ += rowSpacing;
    });
    layout[space.value] = {x: 0, y: height, z: currentZ};
    return layout;
  },

  addKeysToKeyboard: function (keysData, keys, layout) {
    keysData.forEach((keyData) => {
      // add and position keys in the scene
      let keyEntity = keys[keyData.value];
      let keyPosition = layout[keyData.value];
      keyEntity.setAttribute('position', keyPosition);
      this.el.appendChild(keyEntity);
      // pass through key events
      let _this = this;
      keyEntity.addEventListener('keypress', (event) => {
        // in the future keyboard can maintain state of modifiers like shift/ctrl
        // and add those to the event
        _this.el.emit('keypress', event.detail);
      });
    });
  }
});
