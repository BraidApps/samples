Polymer('editable-applet', {
  contentEditable: true,
  inProgress: false,
  lastUpdated: 0,
 
   // The data model has a single record whose key is "main".  
  // The data in the model is simply the current HTML content.
  // We use the metadata with the record to tell us who last 
  // edited and when.  If it was last edited by someone else
  // less than 3 seconds ago, we disable editing by the current
  // user.
  
  onReady: function() {
    var inputRecord = this.getRecord();
    if (inputRecord) {
      this.$.container.innerHTML = inputRecord.data.html; 
    }
    this.refreshEditable();
  },
  
  getRecord: function() {
    return this.$.inputs.recordsById['main'];
  },
  
  refreshEditable: function() {
	this.contentEditable = true;
    var inputRecord = this.getRecord();
    if (inputRecord && Date.now() - inputRecord.updated < 3000 && inputRecord.updatedBy != this.$.braid.profile.fullJid) {
	    this.contentEditable = false;
	    this.async(this.refreshEditable, 250);
    }
  },
  
  // Whenever the user types, we will periodically update the record with the latest content
  // (In Polymer 1.0, there is a new throttle mechanism to handle this more easily.)
  
  onContentInput: function() {
    if (!this.inProgress || (this.inProgress && Date.now() - this.lastUpdated > 2000)) {
      this.$.inputs.addRecord({html: this.$.container.innerHTML}, "main");
      this.inProgress = true;
      this.lastUpdated = Date.now();
      this.async(this.refreshInProgress, 250);
    }
  },
  
  refreshInProgress: function() {
    if (this.inProgress) {
      var updated = false;
      if (Date.now() - this.lastUpdated > 2000) {
        var inputRecord = this.getRecord();
        if (inputRecord && inputRecord.data.html != this.$.container.innerHTML) {
          this.$.inputs.addRecord({html: this.$.container.innerHTML}, "main");
          this.lastUpdated = Date.now();
          updated = true;
        }
      } 
      if (!updated && Date.now() - this.lastUpdated > 3000) {
        this.inProgress = false;
      }
      if (this.inProgress) {
        this.async(this.refreshInProgress, 250);
      }
    }
  },
  
  // Whenever the record is updated in the model, we update the content accordingly
  // But if the current user was the one that made the latest update, we don't need
  // to overwrite the content they have just entered.
  
  onInputsUpdated: function() {
    var inputRecord = this.getRecord();
    if (inputRecord) {
      if (inputRecord.updatedBy != this.$.braid.profile.fullJid) {
        this.$.container.innerHTML = inputRecord.data.html;
      }
    }
    this.refreshEditable();
  }
  
});