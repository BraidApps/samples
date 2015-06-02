Polymer('cells-applet', {
  onReady: function() {
    if (!this.$.braid.properties.rows) {
      this.$.braid.properties.rows = 2;
    }
    if (!this.$.braid.properties.cols) {
      this.$.braid.properties.cols = 2;
    }
    this.rows = new Array(this.$.braid.properties.rows);
    this.cols = new Array(this.$.braid.properties.cols);
  },
  
  onAddRow: function(e) {
    this.$.braid.properties.rows++;
  },
  
  onAddCol: function(e) {
    this.$.braid.properties.cols++;
  },
  
  onPropChanged: function(e) {
    if (e.detail.name == "rows") {
      this.rows = new Array(this.$.braid.properties.rows);
    } else if (e.detail.name == "cols") {
      this.cols = new Array(this.$.braid.properties.cols);
    }
  },
  
  onCellBlur: function(e) {
    var i = e.target.attributes.row.value;
    var j = e.target.attributes.col.value;
    var content = e.target.textContent.trim();
    this.async(function(data) {
      this.$.braid.properties['r' + i + ',c' + j] = data.value;
    }, { value:content }, 100);
    e.preventDefault();
  }
  
});