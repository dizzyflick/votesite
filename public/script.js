var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    num: 0,
    show: 'all',
    itemIndex: 0,
  },
  created: function() {
    this.getItems();
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
	return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	return this.items.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	return this.items.filter(function(item) {
	  return item.completed;
	});
      return this.items;
    },
	randomIndex: function() {
		this.itemIndex = Math.floor(Math.random() * items.length);
	},
    randomItem: function() {
    	var i = 0;
    	var rando = (Math.floor(Math.random() * this.items.length)) +1;
	return this.items.filter(function(item) {
		++i;
    	if (i === rando) {
    		return !item.completed;
    	}
	});
    },
    randomItemz: function() {
    	var i = 0;
    	var rando = (Math.floor(Math.random() * this.items.length)) +1;
	return this.items.filter(function(item) {
		++i;
    	if (i === rando) {
    		return !item.completed;
    	}
	});
    },
    sortItems: function() {
    	return this.items.sort(function(a, b){
    		var keyA = a.num,
        	keyB = b.num;
    		if(keyA < keyB) return 1;
    		if(keyA > keyB) return -1;
    		return 0;
		});
    },
  }, 
 methods: {
    addItem: function() {
      axios.post("/api/items", {
	text: this.text,
	num: 0,
	completed: false
      }).then(response => {
	this.text = "";
	this.num = 0;
	this.getItems();
	return true;
      }).catch(err => {
      });
    },
     getItems: function() {
      axios.get("/api/items").then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
	text: item.text,
	num: num + 1,
	completed: !item.completed,
	orderChange: false,
      }).then(response => {
	return true;
      }).catch(err => {
      });
    },
    voteItem: function(item) {
      axios.put("/api/items/" + item.id, {
	text: item.text,
	num: item.num + 1,
      }).then(response => {
	return true;
      }).catch(err => {
      });
    },
    getItem: function(item) {
      return this.items[Math.floor(Math.random() * this.items.length)];
    },
    }
});
