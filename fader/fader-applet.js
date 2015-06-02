Polymer('fader-applet', {
	opacity: 1,
	
	onReady: function() {
	  this.refreshOpacity();
	},
	
	refreshOpacity: function() {
	  this.opacity = (100 - this.$.braid.properties.fade) / 100.0;
	},
	
	onPropertyChanged: function(event){
	  this.refreshOpacity();
	} 
	

});