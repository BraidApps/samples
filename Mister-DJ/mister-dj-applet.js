Polymer('mister-dj-applet', {
  currentSong: null,
	
	onReady: function() {
	  this.refreshSong();
	},
	
	onAdd: function() {
    this.$.filepicker.click();
  },
  
  handleFiles: function(event) {
    var files = this.$.filepicker.files;
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileName = file.name;
        this.$.braid.updateFile(fileName, file);
      }
    }
  },
  
  togglePlay: function(event) {
    this.$.braid.properties.playing = event.detail.play;
  },
  
  onPlay: function(event) {
    var fileName = event.detail.name;
    if (fileName) {
      this.$.braid.properties.song = fileName;
      this.$.braid.properties.playing = true;
    }
  },
  
  refreshSong: function(e) {
    if (this.currentSong) {
      window.URL.revokeObjectURL(this.currentSong);
      this.currentSong = null;
    }
    if (this.$.braid.properties.song) {
      this.$.braid.getFileUrl(this.$.braid.properties.song, function(result) {
        this.currentSong = result;
			}.bind(this));
    }
  },
  
  propertyChanged: function(e) {
    switch (e.detail.name) {
      case "song":
        this.refreshSong();
        break;
    }
  },
  
  trackPositionChanged: function(event) {
    var time = event.detail.time;
    this.$.player.setCurrentTime(time);
    this.$.braid.broadcastMessage({
      currentTime: time
    });
  },
  
  receiveBroadcast: function(event) {
    var time = event.detail.payload.currentTime;
    if (!time) {
      time = 0;
    }
    this.$.player.setCurrentTime(time);
  }
	
});