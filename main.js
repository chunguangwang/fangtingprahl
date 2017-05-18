//set precision
function setPrecision(prec){
	math.config({
    number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
    precision: prec        // Number of significant digits for BigNumbers
});
}
//add a new character or function to display
function addChar(input, ch) {
	if(input.value == null || input.value == "0")
		input.value = ch;
	else{
			input.value += ch;
	}			
}





// set caret position for keyboard input convenience
function setCaretPosition(elem, caretPos) {
    var range;

    if (elem.createTextRange) {
        range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
    } else {
        elem.focus();
        if (elem.selectionStart !== undefined) {
            elem.setSelectionRange(caretPos, caretPos);
        }
    }
}

// delete a char at the end
function deleteChar(input) {
	input.value = input.value.substring(0, input.value.length - 1)
}

//change the singe
function changeSign(input) {
	if(input.value.substring(0, 1) == "-")
		input.value = input.value.substring(1, input.value.length)
	else
		input.value = "-" + input.value
}

// do the computation of the expression in the display, if correct, a result will be displayed;
// or an alert will appear hinting that the input is not mathematically meaningful
function compute(form) {

	var temp = form.display.value;
	if(form.display.value = math.eval(form.display.value)){
	//if the computation is successfully executed, the executed expression will be recorded by lruIns
		lruIns.set(indexLru++, temp);
		// Find a <table> element with id="myTable":
		var table = document.getElementById("myMemory");
		if(numExp<10){
			var row = table.insertRow(0);

			// Insert new cells (<td> elements) at the 1stposition of the "new" <tr> element:
			var cell1 = row.insertCell(0);	

			// Add expression to the new cells:
			cell1.innerHTML = "<input type='button' value='"+JSON.stringify(temp)+"' onclick='addMemory("+JSON.stringify(temp)+");'>";
			numExp++;
		}else{
			$("#myMemory tr").remove(); 
			lruIns.forEachRecordTable();
		}
		//update cookie
		lruIns.forEachUpdateCookie();
	}
}


//function to add Computed Expression
function addMemory(input){
	disp.value = input;
}

//for recording last 10 evaluated expressions, a LRU data structrue is implemented below

/* Initialize LRU cache with default limit being 10 items */
function lru(limit) {
    this.size = 0;
    (typeof limit == "number") ? this.limit = limit : this.limit = 10;
    this.map = {};
    this.head = null;
    this.tail = null;
}

lru.prototype.lrunode = function(key, value) {
    if (typeof key != "undefined" && key !== null) {
        this.key = key;
    }
    if (typeof value != "undefined" && value !== null) {
        this.value = value;
    }
    this.prev = null;
    this.next = null;
}

lru.prototype.setHead = function(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head !== null) {
        this.head.prev = node;
    }
    this.head = node;
    if (this.tail === null) {
        this.tail = node;
    }
    this.size++;
    this.map[node.key] = node;
}

/* Remove a single entry from the cache */
lru.prototype.remove = function(key) {
    var node = this.map[key];
    if (node.prev !== null) {
        node.prev.next = node.next;
    } else {
        this.head = node.next;
    }
    if (node.next !== null) {
        node.next.prev = node.prev;
    } else {
        this.tail = node.prev;
    }
    delete this.map[key];
    this.size--;
};

/* Change or add a new value in the cache
 * We overwrite the entry if it already exists
 */
lru.prototype.set = function(key, value) {
    var node = new lru.prototype.lrunode(key, value);
    if (this.map[key]) {
        this.map[key].value = node.value;
        this.remove(node.key);
    } else {
        if (this.size >= this.limit) {
            delete this.map[this.tail.key];
            this.size--;
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }
    this.setHead(node);
};

/* Retrieve a single entry from the cache */
lru.prototype.get = function(key) {
    if (this.map[key]) {
        var value = this.map[key].value;
        var node = new lru.prototype.lrunode(key, value);
        this.remove(key);
        this.setHead(node);
        return value;
    } else {
		alert("Key " + key + " does not exist in the cache.");
        console.log("Key " + key + " does not exist in the cache.");
    }
};


/* Traverse through the cache elements using a callback function
 * Returns args [node element, element number, cache instance] for the callback function to use
 */
lru.prototype.forEachRecordTable = function(callback) {


	// get lru head node
    var node = this.tail;
    while (node) {
        console.log(node.value);
		// Create an empty <tr> element and add it to the 1st position of the table:
       	// Find a <table> element with id="myTable":
		var table = document.getElementById("myMemory");
		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1stposition of the "new" <tr> element:
		var cell1 = row.insertCell(0);	
		// Add expression to the new cells:
		cell1.innerHTML = "<input type='button' value='"+node.value+"' onclick='addMemory("+node.value+");'>";

        node = node.prev;
    }
}


lru.prototype.forEachRecordTable = function(callback) {


	// get lru head node
    var node = this.tail;
    while (node) {
        console.log(node.value);
		// Create an empty <tr> element and add it to the 1st position of the table:
       	// Find a <table> element with id="myTable":
		var table = document.getElementById("myMemory");
		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1stposition of the "new" <tr> element:
		var cell1 = row.insertCell(0);	
		// Add expression to the new cells:
		cell1.innerHTML = "<input type='button' value='"+node.value+"' onclick='addMemory("+node.value+");'>";

        node = node.prev;
    }
}



lru.prototype.forEachUpdateCookie = function(callback) {

	var lruStr = new Array();
	// get lru head node
    var node = this.tail;
    while (node) {
 
		lruStr.push(node.value);

        node = node.prev;
    }

    var	time = 3600 * 1000;

	$.cookie('lruStr', jsonStr, {expires: time});
}

//save in cookie
function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}


//when the scirpt is loaded a lru instance will cre created with capacity limit equal to 10
var lruIns = new lru(10);
//intialize the lru node index
var indexLru = 0;
//initialize number of recorded expressions
var numExp = 0;
//get display
var disp = document.getElementById("calcDisplay");

if($.cookie('lruStr')!== undefined){
	var lruStr = JSON.parse($.cookie('lruStr'));
	var table = document.getElementById("myMemory");
	
	numExp = lruStr.length;
	for(var ii=0;ii<lruStr.length;ii++){
		lruIns.set(indexLru++, lruStr[ii]);

		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1stposition of the "new" <tr> element:
		var cell1 = row.insertCell(0);	
		// Add expression to the new cells:
		cell1.innerHTML = "<input type='button' value='"+JSON.stringify(lruStr[ii])+"' onclick='addMemory("+JSON.stringify(lruStr[ii])+");'>";
	}
}