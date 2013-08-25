/* Backbone API: iTunes
 *
 * Created by Makis Tracend (@tracend)
 *
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(_, Backbone) {

	// support the APP namespace (if available)
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var View = (typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	var Collection = (typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;


	// main request method
	var iTunes = new Backbone.Model({

	});

	// namespace
	iTunes.Models = {};
	iTunes.Collections = {};
	iTunes.Views = {};

	// **Models**: ...

	iTunes.Models.Item = Model.extend({
		defaults: { },
		url: function(){ return "https://itunes.apple.com/lookup?id="+ this.get("id") +"&callback=?"; },
		initialize: function(){
			// call cache on every state change
		},
		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});


	// **Collections**: ...

	iTunes.Collections.Search = Collection.extend({
		model: iTunes.Models.Item,
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

	iTunes.Collections.Lookup = Collection.extend({
		model: iTunes.Models.Item,
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

	// Store in selected namespace(s)
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	Backbone.API.iTunes = iTunes;

	// alias APP.API
	if( typeof APP != "undefined" && (_.isUndefined( APP.API) || _.isUndefined( APP.API.iTunes) ) ){
		APP.API = APP.API || {};
		APP.API.iTunes = Backbone.API.iTunes;
	}

	// Shortcut
	if(typeof window.iTunes == "undefined"){
		window.iTunes = iTunes;
	}


})(this._, this.Backbone);