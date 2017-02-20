AFRAME.registerComponent('keyboard', {

  init: function () {
    let defaultKeyValues = ['q', 'w'];
    let keys = this.constructDefaultKeys(defaultKeyValues);
    let layout = this.constructDefaultLayout(defaultKeyValues);
    this.addKeysToKeyboard(defaultKeyValues, keys, layout);
    // connectKeyboardToDisplay();
  },

  constructDefaultKeys: function (keyValues) {
    let keyEntities = {};
    keyValues.forEach((keyValue) => {
      let keyEntity = document.createElement('a-entity');
      keyEntity.setAttribute('ui-button', '');
      keyEntity.setAttribute('keyboard-key', {
        value: keyValue
      });
      keyEntities[keyValue] = keyEntity;
    });
    return keyEntities;
  },

  constructDefaultLayout: function (keyValues) {
    let layout = {};
    let keySpacing = .3;
    let currentX = 0;
    keyValues.forEach((keyValue) => {
      layout[keyValue] = {x: currentX, y: 0, z: 0};
      currentX += keySpacing;
    });
    return layout;
  },

  addKeysToKeyboard: function (keyValues, keys, layout) {
    keyValues.forEach((keyValue) => {
      let keyEntity = keys[keyValue];
      let keyPosition = layout[keyValue];
      keyEntity.setAttribute('position', keyPosition);
      this.el.appendChild(keyEntity);
    });
  }
});
