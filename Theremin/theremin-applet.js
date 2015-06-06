window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();

Polymer('theremin-applet', {
  maxFreq: 6000,
  maxVol: 0.1,
  sounds: {},
  hooked: false,
  lastUpdate: 0,
	
	onReady: function() {
	  this.sounds = {};
	  this.reset();
	},
	
	reset: function() {
	  for (var i = 0; i < this.$.braid.members.length; i++) {
	    var member = this.$.braid.members[i];
      this.sounds[member.jid] = this.createSound();
	  }
	  this.hooked = true;
	  window.setInterval(function() {
	    var now = (new Date()).getTime();
	    if ((now - this.lastUpdate) > 2000) {
	      this.updateSound(this.$.braid.profile.jid, 0, 0);
	      for (var i = 0; i < this.$.braid.members.length; i++) {
    	    var member = this.$.braid.members[i];
    	    this.updateSound(member.jid, 0, 0);
    	  }
	    }
	  }.bind(this), 1500);
	},
	
	createSound: function() {
	  var sound = {
      oscillator: context.createOscillator(),
      amp: context.createGain()
    };
    sound.oscillator.connect(sound.amp);
    sound.amp.connect(context.destination);
    sound.oscillator.type = 'square';
    sound.oscillator.frequency.value = 0;
    sound.oscillator.detune.value = 100;
    sound.oscillator.start(0);
    sound.amp.gain.value = 0;
    return sound;
	},
	
	updateSound: function(originator, frequency, volume) {
	  var jid = originator.split("/")[0];
	  var member = this.$.braid.membersByJid[jid];
    if (member) {
      if (!this.sounds[jid]) {
        this.sounds[jid] = this.createSound();
      }
      // console.log("draw " + frequency + " " + volume + " " + jid);
      this.sounds[jid].oscillator.frequency.value = frequency * this.maxFreq;
      this.sounds[jid].amp.gain.value = volume * this.maxVol;
      this.draw(frequency, volume);
      this.lastUpdate = (new Date()).getTime();
    }
	},
	
	draw: function(f, v) {
	  if (f && v) {
  	  var color = 'rgb(120,' + Math.floor(v * 255) + ',' + Math.floor(f * 255) + ')';
  	  var div = document.createElement("div");
  	  div.className = "disc";
  	  div.style.top = v * this.$.canvas.offsetHeight;
  	  div.style.left = f * this.$.canvas.offsetWidth;
  	  div.style.backgroundColor = color;
  	  this.$.canvas.appendChild(div);
  	  this.async(function() {
        div.style.opacity = 0;
        this.async(function() {
          div.remove();
        }, null, 800);
      }, null, 200);
	  }
	},
	
	mouseOut: function(event) {
	  if (this.hooked) {
	    this.broadcast(0, 0);
	    this.updateSound(this.$.braid.profile.jid, 0, 0);
	  }
	},
	
	mouseMove: function(event) {
	  if (this.hooked) {
  	  var x = event.offsetX ? event.offsetX : 0;
  	  var y = event.offsetY ? event.offsetY : 0;
  	  var f =  x / this.$.canvas.offsetWidth;
  	  var v = y / this.$.canvas.offsetHeight;
  	  this.broadcast(f, v);
  	  this.updateSound(this.$.braid.profile.jid, f, v);
	  }
	},
	
	broadcast: function(f, v) {
	  if (!this.broadcasting) {
	    this.broadcasting = true;
	    this.pendingBroadcast = null;
	    this.$.braid.broadcastMessage({
	      frequency: f,
	      volume: v
	    }, function() {
	      this.broadcasting = false;
	      if (this.pendingBroadcast) {
	        this.broadcast(this.pendingBroadcast.frequency, this.pendingBroadcast.volume);
	      }
	    }.bind(this), function(error) {
	      this.broadcasting = false;
	      console.log(error);
	    }.bind(this));
	  } else {
	    this.pendingBroadcast = {
	      frequency: f,
	      volume: v
	    };
	  }
	},
	
	broadcastReceived: function(event) {
	  var jid = event.detail.originator;
	  if (jid) {
	    var f = event.detail.payload.frequency;
	    var v = event.detail.payload.volume;
	    this.updateSound(jid, f, v);
	  }
	}
	
});