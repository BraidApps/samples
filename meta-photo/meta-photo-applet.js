Polymer('meta-photo-applet', {
  imageUrl: "",
  hideOnImage: "hidden",
  showOnImage: "hidden",
	
	onReady: function() {
	  if (!this.$.braid.properties.zoom) {
	    this.$.braid.properties.zoom = 1;
	  }
	  this.refreshFile();
	},
	
	onUpload: function() {
	  this.$.filePicker.click();
	},
	
	handleFile: function(event) {
	  var files = this.$.filePicker.files;
	  if (files && files[0]) {
	    var file = files[0];
	    this.$.braid.updateFile("image", file);
	  }
	},
	
	refreshFile: function() {
	  this.$.braid.getFileUrl("image", function(url) {
	      this.imageUrl = url;
	      this.hideOnImage = url ? "hidden" : null;
	      this.showOnImage = url ? null : "hidden";
	  }.bind(this));
	},
	
	onImageClick: function(event) {
	  var name = this.$.braid.profile.fullName;
	  if (!name) {
	    name = this.$.braid.profile.jid;
	    name = name.split("@")[0];
	  }
	  var data = {
	    x: event.offsetX,
	    y: event.offsetY,
	    user: name
	  };
	  this.$.braid.prompts.answer("Enter a comment", function(newComment) {
	    if (newComment){
	      data.comment = newComment;
    	  this.$.comments.addRecord(data);
	    }
	  }.bind(this));
	},
	
	onItemMouseOver: function(event) {
	  var recordId = event.target.getAttribute("record-id");
	  if (recordId) {
	    this.shadowRoot.querySelector(".tag[record-id='" + recordId + "']").style.opacity = 1;
	    this.shadowRoot.querySelector(".commentItem[record-id='" + recordId + "']").style.backgroundColor = "rgba(0,0,255,0.2)";
	  }
	},
	
	onItemMouseOut: function(event) {
	  var recordId = event.target.getAttribute("record-id");
	  if (recordId) {
	    this.shadowRoot.querySelector(".tag[record-id='" + recordId + "']").style.opacity = null;
	    this.shadowRoot.querySelector(".commentItem[record-id='" + recordId + "']").style.backgroundColor = null;
	  }
	},
	
	removeComment: function(event) {
	  var recordId = event.target.getAttribute("record-id");
	  if (recordId) {
	    this.$.comments.deleteRecord(recordId);
	  }
	}
	
});