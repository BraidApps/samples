Polymer('task-list-item', {
	recordId: "",
	record: {},
	name: "",
	description: "",
	user: "unassigned",
	
	recordChanged: function() {
		this.$.check.checked = this.record.completed;
		this.name = this.record.name;
		this.description = this.record.description;
		this.user = this.record.user ? this.record.user : "unassigned";
	},
	
	onStateChange: function() {
		this.$.container.style.background = this.$.check.checked ? "#f0f0f0" : null;
	},
	
	onValueChanged: function() {
		var detail = {
			recordId: this.recordId,
			checked: this.$.check.checked
		};
		this.fire('change', detail);
	},
	
	onEdit: function() {
		var detail = {
			recordId: this.recordId
		};
		this.fire('edit', detail);
	},
	
	onDelete: function() {
		var detail = {
			recordId: this.recordId
		};
		this.fire('delete', detail);
	}
});