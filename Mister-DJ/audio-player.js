Polymer('audio-player', {
  name: "",
  url: "",
  playing: false,
  playIcon: "av:play-arrow",
  playTime: 0,
  progress: 0,
  duration: "",
  position: "0:0",
  
  attached: function() {
    this.$.slider.disabled = true;
  },
  
  playingChanged: function() {
    this.playIcon = this.playing ? "av:stop" : "av:play-arrow";
    if (this.playing && this.url) {
      this.$.audio.play();
    } else {
      this.$.audio.pause();
    }
  },
  
  togglePlay: function() {
    var detail = {
      play: !this.playing
    };
    this.fire('toogle-play', detail);
  },
  
  canPlay: function() {
    if (this.playing && this.url) {
      this.$.audio.play();
    }
  },
  
  getTimeAsString: function(d) {
    if (isNaN(d)) {
      d = 0;
    }
    var hours = Math.floor(d / 3600);
    d = d - (hours * 3600);
    var minutes = Math.floor(d / 60);
    var seconds = Math.floor(d - minutes * 60);
    if (hours) {
      return (hours + ":" + minutes + ":" + seconds);
    } else {
      return (minutes + ":" + seconds);
    }
  },
  
  durationChanged: function() {
    var d = this.$.audio.duration;
    if (isNaN(d)) {
      d = 0;
    }
    this.$.slider.disabled = d <= 0;
    this.playTime = d;
    this.progress = 0;
    this.duration = this.getTimeAsString(d);
  },
  
  timeChanged: function() {
    if (this.$.slider.dragging) {
      return;
    }
    if (this.playTime) {
      var t = this.$.audio.currentTime;
      this.progress = (t/this.playTime) * 100;
      this.position = this.getTimeAsString(t);
    } else {
      this.progress = 0;
      this.position = this.getTimeAsString(0);
    }
    if (this.progress == 100) {
      this.async(function() {
        this.canPlay();
      }, null, 1000);
    }
  },
  
  sliderChanged: function(e) {
    if (this.playTime) {
      var detail = {
        time: (this.$.slider.value / 100) * this.playTime
      };
      this.fire('position-changed', detail);
    }
  },
  
  setCurrentTime: function(time) {
    this.$.audio.currentTime = time;
  }
  
});