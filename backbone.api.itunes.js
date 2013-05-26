/* Backbone API: iTunes
 *
 * Created by Makis Tracend (@tracend)
 *
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(_, Backbone) {

	// Fallbacks
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	//APP = window.APP || (APP = { Models: {}, Collections: {}, Views: {} });
	// support the APP namespace (if available)
	var Model = APP.Model || Backbone.Model;
	var View = APP.View || Backbone.View;
	var Collection = APP.Collection || Backbone.Collection;


	// main request method
	Backbone.API.iTunes = Collection.extend({

	});

	// namespace
	Backbone.API.iTunes.Models = {};
	Backbone.API.iTunes.Collection = {};
	Backbone.API.iTunes.Views = {};


	// **Models**: ...

	Backbone.API.iTunes.Models.Item = Model.extend({
		defaults: { },
		url: function(){ return "https://itunes.apple.com/lookup?id="+ this.get("id") },
		initialize: function(){
			// call cache on every state change
		},
		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});


	// **Collections**: ...

	Backbone.API.iTunes.Collections.Search = Collection.extend({
		model: Backbone.API.iTunes.Models.Item,
		options: {
			term: "",
			limit: false,
			entity: false,
			country: false
		},
		url: function(){ return "https://itunes.apple.com/search?term="+ this.options.term
							+ ( this.options.limit ) ? "&limit="+ this.options.term : ""
							+ ( this.options.entity ) ? "&entity="+ this.options.entity : ""
							+ ( this.options.country ) ? "&country="+ this.options.country : ""
					},
		initialize: function(){
			// call cache on every state change

		},
		parse: function( data ){
			console.log(data);
			return (data.tips) ? data.tips.items : data;
		}
	});

	Backbone.API.iTunes.Collections.Lookup = Collection.extend({
		model: Backbone.API.iTunes.Models.Item,
		options: {
			limit: false,
			entity: false,
			country: false
		},
		url: function(){ return "https://itunes.apple.com/lookup?id="+ this.get("id")
							+ ( this.options.limit ) ? "&limit="+ this.options.term : ""
							+ ( this.options.entity ) ? "&entity="+ this.options.entity : ""
							+ ( this.options.country ) ? "&country="+ this.options.country : ""
					},
		initialize: function(){
			// call cache on every state change
		},
		parse: function( data ){
			return (data.friends) ? data.friends.items : data;
		}
	});


// Shortcut
if(typeof window.iTunes == "undefined"){
	window.iTunes = Backbone.API.iTunes;
}

})(this._, this.Backbone);