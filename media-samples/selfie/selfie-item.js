Polymer('selfie-item', {
	record: null,
	recordId: "",
	favicon: "favorite-outline",
	jid: "",
	
	recordChanged: function() {
		var effectiveWidth = (this.record.width/this.record.height) * 180;
		var lo = (effectiveWidth - 180)/2.0;
		if (lo < 0) {
			lo = 0;
		}
		this.$.image.style.left = -lo + "px";
		this.favicon = "favorite-outline";
		if (this.record.likers) {
			if (this.record.likers.indexOf(this.jid) >= 0) {
				this.favicon = "favorite";
			}
		}
	},
	
	onFavClick: function(event) {
		var detail = {
			recordId: this.recordId,
			record: this.record
		};
		this.fire('toggle-favorite', detail);
		event.stopPropagation();
	}
});