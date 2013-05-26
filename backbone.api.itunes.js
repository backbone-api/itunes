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
	var Model = (typeof APP != "undefined") ? APP.Model : Backbone.Model;
	var View = (typeof APP != "undefined") ? APP.View : Backbone.View;
	var Collection = (typeof APP != "undefined") ? APP.Collection : Backbone.Collection;


	// main request method
	Backbone.API.iTunes = Collection.extend({

	});

	// namespace
	Backbone.API.iTunes.Models = {};
	Backbone.API.iTunes.Collections = {};
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
		url: function(){ var url = "https://itunes.apple.com/search?term="+ this.options.term;
							url += ( this.options.limit ) ? "&limit="+ this.options.term : "";
							url += ( this.options.entity ) ? "&entity="+ this.options.entity : "";
							url += ( this.options.country ) ? "&country="+ this.options.country : "";
							url += "&callback=?"; // JSONP
						return url;
					},
		initialize: function(){
			// call cache on every state change

		},
		parse: function( data ){
			return (data.results) ? data.results : data;
		}
	});

	Backbone.API.iTunes.Collections.Lookup = Collection.extend({
		model: Backbone.API.iTunes.Models.Item,
		options: {
			id: false,
			limit: false,
			entity: false,
			country: false
		},
		url: function(){ var url = "https://itunes.apple.com/lookup?id="+ this.options.id;
							url += ( this.options.limit ) ? "&limit="+ this.options.limit : "";
							url += ( this.options.entity ) ? "&entity="+ this.options.entity : "";
							url += ( this.options.country ) ? "&country="+ this.options.country : "";
							url += "&callback=?"; // JSONP
						return url;
					},
		initialize: function( models, options ){
			// call cache on every state change
		},
		parse: function( data ){
			return (data.results) ? data.results : data;
		}
	});


// Shortcut
if(typeof window.iTunes == "undefined"){
	window.iTunes = Backbone.API.iTunes;
}

})(this._, this.Backbone);