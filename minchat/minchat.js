Polymer('minchat-applet', {
	
	onReady: function() {
		this.prepareEntry();
	},

	onAddClick: function() {
		var entry = this.$.entry.value;
		if (entry.trim().length > 0) {
			var record = {
				entry: this.$.entry.value
			};
			this.$.entry.value = '';
			this.$.messages.addRecord(record);
		}
	},
	
	prepareEntry: function() {
		this.async(function() {
			this.$.entryPanel.scrollIntoView();
			this.$.entry.focus();
		}, null, 100);		
	},
	
	onKeyDown: function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			event.stopPropagation();
			this.onAddClick();
		}
	},
	
	onRecordUpdated: function(event) {
		this.prepareEntry();
	},
	
	userDisplayFilter: function(jid) {
		if (jid) {
			var member = this.$.braid.membersByJid[jid];
			if (member && member.fullName) {
				return member.fullName.split(" ")[0];
			}
			return jid.split("@")[0];
		}
	}
});