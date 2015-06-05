Polymer('sliders-applet', {
  onReady: function() {
    if (!this.$.braid.properties.red) {
      this.$.braid.properties.red = 0;
    }
    if (!this.$.braid.properties.blue) {
      this.$.braid.properties.blue = 0;
    }
    if (!this.$.braid.properties.green) {
      this.$.braid.properties.green = 0;
    }
  }
});