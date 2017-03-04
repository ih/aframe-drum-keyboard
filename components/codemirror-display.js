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
    _this.editor.focus();
    this.data.inputDevice.addEventListener('keypress', (event) => {
      // needs keyCode to be present on the event
      // https://github.com/codemirror/CodeMirror/blob/96cd8885ad759350273c71235493f6b225590442/src/edit/key_events.js#L106
      // let keyboardEvent = event.detail;
      // _this.editor.triggerOnKeyPress(keyboardEvent);
      // _this.editor.focus();
      // _this.editorElement.dispatchEvent(event.detail);
      // _this.editor.insert(event.detail.key);
    });
  }
});
