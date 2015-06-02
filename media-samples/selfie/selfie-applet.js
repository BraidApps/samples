Polymer('selfie-applet', {
	tile: "",
	width: 320,
	height: 0,
	streaming: false,
	
	onReady: function() {
		navigator.getMedia = (navigator.getUserMedia ||
				              navigator.webkitGetUserMedia ||
				              navigator.mozGetUserMedia ||
				              navigator.msGetUserMedia);
		navigator.getMedia({ video: true, audio: false }, function(stream) {
			if (navigator.mozGetUserMedia) {
				this.$.video.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				this.$.video.src = vendorURL.createObjectURL(stream);
			}
			this.$.video.play();
		}.bind(this), function(err) {
			console.log("Selfie Applet: An error occured - " + err);
		});
	},
	
	onVideoCanPlay: function(event) {
		if (!this.streaming) {
			this.height = this.$.video.videoHeight / (this.$.video.videoWidth / this.width);
			if (isNaN(this.height)) {
				this.height = this.width / (4/3);
	        }
			
			this.$.video.setAttribute('width', this.width);
			this.$.video.setAttribute('height', this.height);
			this.$.canvas.setAttribute('width', this.width);
			this.$.canvas.setAttribute('height', this.height);
	        this.streaming = true;
		}
	},
	
	takePhoto: function(event) {
		var context = this.$.canvas.getContext('2d');
	    if (this.width && this.height) {
	    	this.$.canvas.width = this.width;
	    	this.$.canvas.height = this.height;
	    	context.drawImage(this.$.video, 0, 0, this.width, this.height);
	    
	    	var data = this.$.canvas.toDataURL('image/png');
	    	console.log("storing data: " + data);
	    	var record = {
	    		width: this.$.canvas.width,
	    		height: this.$.canvas.height,
	    		url: data,
	    		likers: []
	    	};
	    	this.$.images.addRecord(record);
	    } else {
	    	this.clearPhoto();
	    }
		event.preventDefault();
	},
	
	clearPhoto: function() {
	    var context = this.$.canvas.getContext('2d');
	    context.fillStyle = "#AAA";
	    context.fillRect(0, 0, this.$.canvas.width, this.$.canvas.height);

	    var data = this.$.canvas.toDataURL('image/png');
	},
	
	toggleFavorite: function(event) {
		var recordId = event.detail.recordId;
		var record = event.detail.record;
		if (recordId) {
			if (!record.likers) {
				record.likers = [];
			}
			var ix = record.likers.indexOf(this.$.braid.profile.jid);
			if (ix < 0) {
				record.likers.push(this.$.braid.profile.jid);
			} else {
				record.likers.splice(ix, 1);
			}
			this.$.images.updateRecord(recordId, record);
		}
	}
});
