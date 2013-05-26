# Backbone API: iTunes

Backbone.js helper for API requests to the iTunes service


## Install

Using Bower:
```
bower install backbone.api.itunes
```

## Usage

The namespace used for this extension is ```Backbone.API.iTunes```, and everything lives under that
````
Backbone.API.iTunes
				|- Models
				|	|- Item
				|
				|- Collections
					|- Search
					|- Lookup

````

Optionally, the namespace is mapped to the global ```iTunes```, in which case the ```Backbone.API.``` prefix can be left out.

### Examples

* [Publisher listings](http://rawgithub.com/backbone-api/itunes/master/examples/publisher.html)
* [Search results](http://rawgithub.com/backbone-api/itunes/master/examples/search.html)

Look into the examples folder for the code.


## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

### Trivia

* Originally used in [Amigame](http://am.i-ga.me)

### License

Released under the [MIT license](http://makesites.org/licenses/MIT)
