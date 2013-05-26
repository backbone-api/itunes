// Blueprint
var MyApps = iTunes.Collections.Lookup.extend({
	options: {
		id : 419312881,
		entity : "software",
		limit : 15
	}
});

var MySearch = iTunes.Collections.Search.extend({
	options: {
		term : "Music",
		entity : "software",
		limit : 15
	}
});

// Example view (replace with your own logic)
var MyView = Backbone.View.extend({
	render: function(){
		$(this.el).html( this.options.template( this.collection.toJSON() ) );
	}
});



// Example Initialization
// ( this should be replaced with Backbone.Router logic)
function init( data ){

	data.fetch();

	var view = new MyView({
		el : ".items",
		collection: data,
		template: Handlebars.compile( $("#items-template").html() )
	});

	// render when the data arrives
	data.on("sync", _.bind(view.render, view));

}