Polymer('task-list-applet', {
	tile: "",
	taskItems: [],
	records: [],
	editingItem: null,
	createButtonText: "Create",
	
	onReady: function() {
		this.refresh();
	},
	
	refresh: function() {
		console.log("refreshing task list");
		this.$.itemsCollection.loadRecords(function(result) {
			this.records = [];
			this.taskItems = [];
			if (result && result.length) {
				for (var i = 0; i < result.length; i++) {
					var item = result[i];
					this.records.push(item.recordId);
					this.taskItems.push(item);
				}
			}
		}.bind(this), true);
	},
	
	onNewItem: function() {
		this.editingItem = null;
		this.createButtonText = "Create";
		this.$.newTaskDlg.opened = true;
	},
	
	onNameChanged: function() {
		this.$.nameDecorator.isInvalid = false;
	},
	
	clearFields: function() {
		this.$.name.value = "";
		this.$.description.value = "";
		this.$.user.value = "";
		this.$.nameDecorator.isInvalid = false;
	},
	
	onCancel: function() {
		this.clearFields();
	},

	onCreate: function() {
		var _name = this.$.name.value;
		if (_name === null || _name.trim() === "") {
			this.$.nameDecorator.isInvalid = true;
			return;
		} else {
			this.$.nameDecorator.isInvalid = false;
		}
		var _desc = this.$.description.value;
		var _user = this.$.user.value.trim();
		var d = (new Date()).getTime();
		
		if (this.editingItem) {
			this.editingItem.data.name = _name;
			this.editingItem.data.description = _desc;
			this.editingItem.data.user = _user;
			console.log("Updating item from dlg");
			this.$.itemsCollection.updateRecord(this.editingItem.recordId, this.editingItem.data, this.editingItem.sort);
		} else {
			var item = {
				created: d,
				name: _name,
				description: _desc,
				user: _user,
				completed: false
			};
			this.$.itemsCollection.addRecord(item);
		}
		
		this.clearFields();
		this.$.newTaskDlg.opened = false;
	},
	
	onRecordUpdated: function(event) {
		console.log("Record updated: " + event.detail.recordId);
		var item = event.detail;
		var ix = this.records.indexOf(item.recordId);
		if (ix >= 0) {
			this.taskItems[ix] = item;
		} else {
			this.refresh();
		}
	},
	
	onRecordDeleted: function(event) {
		console.log("Record deleted: " + event.detail.recordId);
		this.refresh();
	},
	
	onTaskItemChecked: function(event) {
		var ix = this.records.indexOf(event.detail.recordId);
		if (ix >= 0) {
			var item = this.taskItems[ix];
			item.data.completed = event.detail.checked;
			console.log("Updating record: " + item.recordId);
			this.$.itemsCollection.updateRecord(item.recordId, item.data, item.sort);
		}
	},
	
	onTaskItemEdit: function(event) {
		this.clearFields();
		var ix = this.records.indexOf(event.detail.recordId);
		if (ix >= 0) {
			var item = this.taskItems[ix];
			this.$.name.value = item.data.name;
			this.$.description.value = item.data.description;
			this.$.user.value = item.data.user;
			
			this.editingItem = item;
			this.createButtonText = "Save";
			this.$.newTaskDlg.opened = true;
		} else {
			this.onNewItem();
		}
	},
	
	onTaskItemDelete: function(event) {
		this.$.itemsCollection.deleteRecord(event.detail.recordId);
	}
});
