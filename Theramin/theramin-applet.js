window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();

Polymer('theramin-applet', {
  maxFreq: 6000,
  maxVol: 0.05,
	
	onReady: function() {
	  this.sounds = {};
	  this.reset();
	},
	
	reset: function() {
	  for (var i = 0; i < this.$.braid.members.length; i++) {
	    var member = this.$.braid.members[i];
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
	  }
	},
	
	refresh: function() {
		for (var i = 0; i < this.$.braid.members.length; i++) {
			var member = this.$.braid.members[i];
			this.positions[member.jid] = {
				x: -100,
				y: -100
			};
			this.letters[member.jid] = member.jid.substring(0, 1).toUpperCase();
		}		
	},
	
	mouseOut: function(event) {
	  this.volume = 0;
	  this.frequency = 0;
	  this.updateSound();
	},
	
	updateSound: function() {
    oscillator.frequency.value = this.frequency;
    gainNode.gain.value = this.volume;
	}
	
});