Polymer('hello-applet', {
	applyClick: function() {
		this.$.braid.properties.message = this.$.entry.value;
		this.$.entry.value = "";
	}
});