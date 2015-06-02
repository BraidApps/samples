Polymer('countdown-applet', {
	days : 0,
	hours : 0,
	mins : 0,
	secs : 0,
	running : false,
	timer: null,
	
	onReady: function() {
		this.$.overdue.style.display = "none";
		if (this.$.braid.properties.deadline) {
			this.running = true;
		} 
		setInterval(this.refreshClock.bind(this), 1000);
	},
	
	refreshClock: function() {
		if (this.running) {
			var ref = moment();
			var deadline = moment(this.$.braid.properties.deadline);
			if (ref.diff(deadline) > 0) {
				this.days = ref.diff(deadline, 'days');
				this.hours = ref.subtract(this.days, 'days').diff(deadline, 'hours');
				this.mins = ref.subtract(this.hours, 'hours').diff(deadline, 'minutes');
				this.secs = ref.subtract(this.mins, 'minutes').diff(deadline, 'seconds');
				this.$.overdue.style.display = "";
			} else {
				this.days = deadline.diff(ref, 'days');
				this.hours = deadline.subtract(this.days, 'days').diff(ref, 'hours');
				this.mins = deadline.subtract(this.hours, 'hours').diff(ref, 'minutes');
				this.secs = deadline.subtract(this.mins, 'minutes').diff(ref, 'seconds');
				this.$.overdue.style.display = "none";
			}
		} else {
			this.days = 0;
			this.hours = 0;
			this.mins = 0;
			this.secs = 0;
		}
	},
	
	onSettingsClick: function() {
		this.$.settingTitle.value = this.$.braid.properties.heading;
		var deadline = new Date().getTime();
		if (this.$.braid.properties.deadline) {
			deadline = this.$.braid.properties.deadline;
		}
		var dd = moment(deadline);
		this.$.settingDateInput.value = dd.format("YYYY-MM-DD");
		this.$.settingTimeInput.value = dd.format("HH:mm");
		this.$.dlgSettings.open();
	},
	
	onDateSelect: function() {
		this.$.datePicker.open();
	},
	
	onSettingsUpdate: function() {
		this.$.braid.properties.heading = this.$.settingTitle.value;
		
		var deadline = moment(this.$.settingDateInput.value + " " + this.$.settingTimeInput.value, "YYYY-MM-DD HH:mm");
		if (!deadline.isValid()) {
			deadline = moment(this.$.settingDateInput.value + " 17:00", "YYYY-MM-DD HH:mm");
		}
		this.$.braid.properties.deadline = deadline.valueOf();
		this.running = true;
		this.$.dlgSettings.close();
	},
	
	onPropertyChanged: function(event) {
	    if (this.$.braid.properties.deadline > 0) {
	    	this.running = true;
	    }
		this.refreshClock();
	}
	
});
