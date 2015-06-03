Polymer('song-item', {
  name: "",
  playIcon: "av:play-circle-fill",
  
  onPlay: function(e) {
    var detail = {
      name: this.name
    };
    this.fire('play', detail);
  }
});