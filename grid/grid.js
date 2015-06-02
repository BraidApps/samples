Polymer('grid-applet', {
    grid: {},
    
    // The data model consists of three record collections.  One contains an ordered list
    // of rows, another an ordered list of columns, and the third contains cells that contain
    // content.  The row and column collections have no data, but depend on the recordId
    // to uniquely identify the row or column.  
    // The cell records identify a row and column (using GUIDs) and provide the content of 
    // Although not yet supported, inserting, deleting, and moving rows and columns all
    // are just operations on the sort key for row and column records.
    
    onReady: function() {
      this.refreshGrid();      
	    if (this.$.rows.records.length === 0) {
	      // If empty, add two rows and two columns
  			this.onAddRowClick();
  			this.onAddRowClick();
  			this.onAddColumnClick();
  			this.onAddColumnClick();
	    }
	  },
	  
	  // this.grid is an object whose members are the GUIDs of the rows.  And the row objects
	  // contain members that the GUIDs of the columns, containing the corresponding cell
	  // data.
	  
	  refreshGrid: function() {
	    this.grid = {};
	    for (var i = 0; i < this.$.rows.records.length; i++) {
	      var row = this.$.rows.records[i];
	      this.grid[row.recordId] = {};
	      for (var j = 0; j < this.$.columns.records.length; j++) {
	        var col = this.$.columns.records[j];
	        this.grid[row.recordId][col.recordId] = " ";
	      }
	    }
	    for (var k = 0; k < this.$.cells.records.length; k++) {
	      var cell = this.$.cells.records[k];
	      this.grid[cell.data.rowId][cell.data.colId] = cell.data.content;
	    }
	  },
	  
	  onAddRowClick: function(event) {
			this.$.rows.addRecord({});
	  },
	  
	  onAddColumnClick: function(event) {
			this.$.columns.addRecord({});
	  },
	  
	  // The only row update should be when it is added.  So we just
	  // add a new element in the grid object accordingly.
	  
	  onRowUpdated: function(event) {
      var rowId = event.detail.recordId;
      if (!this.grid[rowId]) {
        this.grid[rowId] = {};
      }
	  },
	  
	  // If a column is added, we need to go through all rows, and add a column
	  // member to it accordingly.
	  onColumnUpdated: function(event) {
	    var columnId = event.detail.recordId;
	    for (var row in this.grid) {
	      if (this.grid.hasOwnProperty(row)) {
	        if (!row.columnId) {
	          row.columnId = " ";
	        }
	      }
	    }
	  },
	  
	  onCellUpdated: function(event) {
	    this.grid[event.detail.data.rowId][event.detail.data.colId] = event.detail.data.content;
	  },
	  
	  // When the user leaves a cell, we add/update a cell record accordingly
	  onCellBlur: function(event) {
	    console.log("cell blur", event);
	    var rowId = event.path[0].attributes.rowid.value;
	    var colId = event.path[0].attributes.colid.value;
	    var content = event.path[0].textContent.trim();
	    var cellData = {
	      rowId: rowId,
	      colId: colId,
	      content: content
	    };
	    var cellRecordId = rowId + "," + colId;
	    this.$.cells.addRecord(cellData, cellRecordId);
	  }
});