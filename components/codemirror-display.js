AFRAME.registerComponent('codemirror-display', {
  schema: {
    inputDevice: {type: 'selector'}
  },

  init: function () {
    this.initEditor();
    this.el.setAttribute('geometry', 'primitive: plane; width: 2; height: 2;');
    this.el.setAttribute('htmltexture', 'asset: #editor;');
  },

  initEditor: function () {
    this.editorElement = document.createElement('div');
    this.editorElement.setAttribute('id', 'editor');
    this.el.appendChild(this.editorElement);

    this.editor = CodeMirror(this.editorElement, {
      mode: 'javascript'
    });

    let _this = this;

    this.data.inputDevice.addEventListener('keypress', (event) => {
      let key = event.detail.key;
      if (/\w?/.test(key)) {
        _this.editor.insert(event.detail.key);
      } else if (key === 'Space') {
        _this.editor.insert(' ');
      }
    });
  }
});
