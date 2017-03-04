AFRAME.registerComponent('keyboard', {

  schema: {
    collidable: {type: 'string'}
  },

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
    return '1234567890\bQWERTYUIOPASDFGHJKL\nZXCVBNM '.split('').map((character) => {
      var keyData = {};
      if (/\d/.test(character)) {
        keyData.code = `Digit${character}`;
        keyData.label = character;
      } else if (/\w/.test(character)) {
        keyData.code = `Key${character}`;
        keyData.label = character;
      } else if (character === '\n') {
        keyData.label = 'enter';
        keyData.code = 'Enter';
      } else if (character === ' ') {
          keyData.label = 'space';
          keyData.code = 'Space';
      } else if (character === '\b') {
          keyData.label = 'Backspace';
          keyData.value = 'Backspace';
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
        code: keyData.code,
        label: keyData.label,
        collidable: this.data.collidable
      });
      keyEntities[keyData.code] = keyEntity;
    });
    return keyEntities;
  },

  constructDefaultLayout: function (keysData) {
    let row1 = keysData.slice(0, 11);
    let row2 = keysData.slice(11, 21);
    let row3 = keysData.slice(21, 31);
    let row4 = keysData.slice(31, 38);
    let space = keysData[38];
    let layout = {};
    let height = 0;
    let keySpacing = .4;
    let rowSpacing = .5;
    let currentZ = 0;
    let leftRowPadding = .3;
    [row1, row2, row3, row4].forEach((row, index) => {
      let currentX = -1.5 + (index * leftRowPadding);
      row.forEach((keyData) => {
        layout[keyData.code] = {x: currentX, y: height, z: currentZ};
        currentX += keySpacing;
      });
      currentZ += rowSpacing;
    });
    layout[space.code] = {x: 0, y: height, z: currentZ};
    return layout;
  },

  addKeysToKeyboard: function (keysData, keys, layout) {
    keysData.forEach((keyData) => {
      // add and position keys in the scene
      let keyEntity = keys[keyData.code];
      let keyPosition = layout[keyData.code];
      keyEntity.setAttribute('position', keyPosition);
      this.el.appendChild(keyEntity);

      // add listeners to the keys
      // we create the keyboardevents here instead of the individual keys
      // so we can set things like shift
      keyEntity.addEventListener('keypress', (event) => {
        let keyPressData = event.detail;
        let keyboardEvent = new KeyboardEvent('keypress', {
          code: keyPressData.code,
          keyCode: _this.labelToKeyCode(_this.data.label),
          target: document
        });
        document.dispatchEvent(keyboardEvent);
      });
    });
  },

    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  // chrome for now...
  // kind of a hack, should really do codeToKeyCode
  labelToKeyCode: function (label) {
    return 65;
    if (/\d/.test(label)) {
      let numberValue = Number(label);
      return numberValue + 48;
    } else {
      return 65;
    }
  }
});
