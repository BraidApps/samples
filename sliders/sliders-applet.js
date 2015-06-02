Polymer('sliders-applet', {
	size: 50,
	shape: "rectangle",
	tile: "",
	
	sizeChanged: function() {
		this.$.colorPanel.style.minHeight = this.size + "px";
		this.shapeChanged();
	},
	
	shapeChanged: function() {
		if (this.shape == "circle") {
			this.$.colorPanel.style.borderRadius = ((this.size / 2) + 1) + "px";
			this.$.colorPanel.style.width = this.size + "px";
			this.$.colorPanel.style.margin = "20px auto";
		} else {
			this.$.colorPanel.style.borderRadius = null;
			this.$.colorPanel.style.width = null;
			this.$.colorPanel.style.margin = null;
		}
	},
	
	updateTile: function() {
		var r = this.$.red.immediateValue;
		var g = this.$.green.immediateValue;
		var b = this.$.blue.immediateValue;
		this.$.colorPanel.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	},
	
	updateColor: function() {
		var r = this.$.red.value;
		var g = this.$.green.value;
		var b = this.$.blue.value;
		this.$.colorPanel.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	},
	
	onPropertyChanged: function(event) {
		console.log("Sliders: Property changed " + event.detail.name + " = " + event.detail.value);
	},
	
	onPropertiesLoaded: function(event) {
		console.log("Sliders: Braid component ready!!! ");
	}
});