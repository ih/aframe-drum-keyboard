AFRAME.registerComponent('keyboard', {

  init: function () {
    let defaultKeysData = [{value: 'q'}, {value: 'w'}, {value: '\n', label: 'enter'}];
    let keys = this.constructDefaultKeys(defaultKeysData);
    let layout = this.constructDefaultLayout(defaultKeysData);
    this.addKeysToKeyboard(defaultKeysData, keys, layout);
    // connectKeyboardToDisplay();
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
    let layout = {};
    let keySpacing = .3;
    let currentX = 0;
    keysData.forEach((keyData) => {
      layout[keyData.value] = {x: currentX, y: 0, z: 0};
      currentX += keySpacing;
    });
    return layout;
  },

  addKeysToKeyboard: function (keysData, keys, layout) {
    keysData.forEach((keyData) => {
      let keyEntity = keys[keyData.value];
      let keyPosition = layout[keyData.value];
      keyEntity.setAttribute('position', keyPosition);
      this.el.appendChild(keyEntity);
    });
  }
});
