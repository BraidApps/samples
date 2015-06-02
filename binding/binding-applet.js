Polymer('binding-applet', {

	onReady: function() {
		console.log("Demo App: braid ready");
	},

	onCollapseClick: function(event) {
		this.$.braid.properties.collpsedItem = !(this.$.collapse1.opened);
	}

});