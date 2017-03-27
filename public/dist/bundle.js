'use strict';

angular.module('gibson', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/main.html',
        controller: 'mainCTRL'
    }).state('usa', {
        url: '/usa',
        templateUrl: './views/usa.html',
        controller: 'shopCTRL'
    }).state('memphis', {
        url: '/memphis',
        templateUrl: './views/memphis.html',
        controller: 'shopCTRL'
    }).state('acoustic', {
        url: '/acoustic',
        templateUrl: './views/acoustic.html',
        controller: function controller($scope) {
            console.log("routing to acoustic page");
        }
    }).state('custom', {
        url: '/custom',
        templateUrl: './views/custom.html',
        controller: 'shopCTRL'
    }).state('product', {
        url: "/:shopID/:productID",
        templateUrl: './js/products/productsTMPL.html',
        controller: 'productsCTRL'
    });

    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('gibson').directive('footer', function () {
    return {
        restrict: 'E',
        templateUrl: './views/footer.html'
    };
});
'use strict';

angular.module('gibson').directive('guitar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/guitar.html'
    };
});
'use strict';

angular.module('gibson').directive('header', function () {
    return {
        restrict: 'E',
        templateUrl: './views/header.html'
    };
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery UI - v1.10.3 - 2013-10-28
* http://jqueryui.com
* Includes: jquery.ui.widget.js, jquery.ui.effect.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */

(function ($, undefined) {

	var uuid = 0,
	    slice = Array.prototype.slice,
	    _cleanData = $.cleanData;
	$.cleanData = function (elems) {
		for (var i = 0, elem; (elem = elems[i]) != null; i++) {
			try {
				$(elem).triggerHandler("remove");
				// http://bugs.jquery.com/ticket/8235
			} catch (e) {}
		}
		_cleanData(elems);
	};

	$.widget = function (name, base, prototype) {
		var fullName,
		    existingConstructor,
		    constructor,
		    basePrototype,

		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		    namespace = name.split(".")[0];

		name = name.split(".")[1];
		fullName = namespace + "-" + name;

		if (!prototype) {
			prototype = base;
			base = $.Widget;
		}

		// create selector for plugin
		$.expr[":"][fullName.toLowerCase()] = function (elem) {
			return !!$.data(elem, fullName);
		};

		$[namespace] = $[namespace] || {};
		existingConstructor = $[namespace][name];
		constructor = $[namespace][name] = function (options, element) {
			// allow instantiation without "new" keyword
			if (!this._createWidget) {
				return new constructor(options, element);
			}

			// allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if (arguments.length) {
				this._createWidget(options, element);
			}
		};
		// extend with the existing constructor to carry over any static properties
		$.extend(constructor, existingConstructor, {
			version: prototype.version,
			// copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend({}, prototype),
			// track widgets that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		});

		basePrototype = new base();
		// we need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend({}, basePrototype.options);
		$.each(prototype, function (prop, value) {
			if (!$.isFunction(value)) {
				proxiedPrototype[prop] = value;
				return;
			}
			proxiedPrototype[prop] = function () {
				var _super = function _super() {
					return base.prototype[prop].apply(this, arguments);
				},
				    _superApply = function _superApply(args) {
					return base.prototype[prop].apply(this, args);
				};
				return function () {
					var __super = this._super,
					    __superApply = this._superApply,
					    returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply(this, arguments);

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			}();
		});
		constructor.prototype = $.widget.extend(basePrototype, {
			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for widgets that aren't DOM-based
			widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		});

		// If this widget is being redefined then we need to find all widgets that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if (existingConstructor) {
			$.each(existingConstructor._childConstructors, function (i, child) {
				var childPrototype = child.prototype;

				// redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
			});
			// remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push(constructor);
		}

		$.widget.bridge(name, constructor);
	};

	$.widget.extend = function (target) {
		var input = slice.call(arguments, 1),
		    inputIndex = 0,
		    inputLength = input.length,
		    key,
		    value;
		for (; inputIndex < inputLength; inputIndex++) {
			for (key in input[inputIndex]) {
				value = input[inputIndex][key];
				if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
					// Clone objects
					if ($.isPlainObject(value)) {
						target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend({}, value);
						// Copy everything else by reference
					} else {
						target[key] = value;
					}
				}
			}
		}
		return target;
	};

	$.widget.bridge = function (name, object) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[name] = function (options) {
			var isMethodCall = typeof options === "string",
			    args = slice.call(arguments, 1),
			    returnValue = this;

			// allow multiple hashes to be passed on init
			options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;

			if (isMethodCall) {
				this.each(function () {
					var methodValue,
					    instance = $.data(this, fullName);
					if (!instance) {
						return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
					}
					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						return $.error("no such method '" + options + "' for " + name + " widget instance");
					}
					methodValue = instance[options].apply(instance, args);
					if (methodValue !== instance && methodValue !== undefined) {
						returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
						return false;
					}
				});
			} else {
				this.each(function () {
					var instance = $.data(this, fullName);
					if (instance) {
						instance.option(options || {})._init();
					} else {
						$.data(this, fullName, new object(options, this));
					}
				});
			}

			return returnValue;
		};
	};

	$.Widget = function () /* options, element */{};
	$.Widget._childConstructors = [];

	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: false,

			// callbacks
			create: null
		},
		_createWidget: function _createWidget(options, element) {
			element = $(element || this.defaultElement || this)[0];
			this.element = $(element);
			this.uuid = uuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);

			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();

			if (element !== this) {
				$.data(element, this.widgetFullName, this);
				this._on(true, this.element, {
					remove: function remove(event) {
						if (event.target === element) {
							this.destroy();
						}
					}
				});
				this.document = $(element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element);
				this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
			}

			this._create();
			this._trigger("create", null, this._getCreateEventData());
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,

		destroy: function destroy() {
			this._destroy();
			// we can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element.unbind(this.eventNamespace)
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData(this.widgetName).removeData(this.widgetFullName)
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData($.camelCase(this.widgetFullName));
			this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");

			// clean up events and states
			this.bindings.unbind(this.eventNamespace);
			this.hoverable.removeClass("ui-state-hover");
			this.focusable.removeClass("ui-state-focus");
		},
		_destroy: $.noop,

		widget: function widget() {
			return this.element;
		},

		option: function option(key, value) {
			var options = key,
			    parts,
			    curOption,
			    i;

			if (arguments.length === 0) {
				// don't return a reference to the internal hash
				return $.widget.extend({}, this.options);
			}

			if (typeof key === "string") {
				// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split(".");
				key = parts.shift();
				if (parts.length) {
					curOption = options[key] = $.widget.extend({}, this.options[key]);
					for (i = 0; i < parts.length - 1; i++) {
						curOption[parts[i]] = curOption[parts[i]] || {};
						curOption = curOption[parts[i]];
					}
					key = parts.pop();
					if (value === undefined) {
						return curOption[key] === undefined ? null : curOption[key];
					}
					curOption[key] = value;
				} else {
					if (value === undefined) {
						return this.options[key] === undefined ? null : this.options[key];
					}
					options[key] = value;
				}
			}

			this._setOptions(options);

			return this;
		},
		_setOptions: function _setOptions(options) {
			var key;

			for (key in options) {
				this._setOption(key, options[key]);
			}

			return this;
		},
		_setOption: function _setOption(key, value) {
			this.options[key] = value;

			if (key === "disabled") {
				this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
				this.hoverable.removeClass("ui-state-hover");
				this.focusable.removeClass("ui-state-focus");
			}

			return this;
		},

		enable: function enable() {
			return this._setOption("disabled", false);
		},
		disable: function disable() {
			return this._setOption("disabled", true);
		},

		_on: function _on(suppressDisabledCheck, element, handlers) {
			var delegateElement,
			    instance = this;

			// no suppressDisabledCheck flag, shuffle arguments
			if (typeof suppressDisabledCheck !== "boolean") {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}

			// no element argument, shuffle and use this.element
			if (!handlers) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				// accept selectors, DOM elements
				element = delegateElement = $(element);
				this.bindings = this.bindings.add(element);
			}

			$.each(handlers, function (event, handler) {
				function handlerProxy() {
					// allow widgets to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
						return;
					}
					return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
				}

				// copy the guid so direct unbinding works
				if (typeof handler !== "string") {
					handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
				}

				var match = event.match(/^(\w+)\s*(.*)$/),
				    eventName = match[1] + instance.eventNamespace,
				    selector = match[2];
				if (selector) {
					delegateElement.delegate(selector, eventName, handlerProxy);
				} else {
					element.bind(eventName, handlerProxy);
				}
			});
		},

		_off: function _off(element, eventName) {
			eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
			element.unbind(eventName).undelegate(eventName);
		},

		_delay: function _delay(handler, delay) {
			function handlerProxy() {
				return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
			}
			var instance = this;
			return setTimeout(handlerProxy, delay || 0);
		},

		_hoverable: function _hoverable(element) {
			this.hoverable = this.hoverable.add(element);
			this._on(element, {
				mouseenter: function mouseenter(event) {
					$(event.currentTarget).addClass("ui-state-hover");
				},
				mouseleave: function mouseleave(event) {
					$(event.currentTarget).removeClass("ui-state-hover");
				}
			});
		},

		_focusable: function _focusable(element) {
			this.focusable = this.focusable.add(element);
			this._on(element, {
				focusin: function focusin(event) {
					$(event.currentTarget).addClass("ui-state-focus");
				},
				focusout: function focusout(event) {
					$(event.currentTarget).removeClass("ui-state-focus");
				}
			});
		},

		_trigger: function _trigger(type, event, data) {
			var prop,
			    orig,
			    callback = this.options[type];

			data = data || {};
			event = $.Event(event);
			event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[0];

			// copy original event properties over to the new event
			orig = event.originalEvent;
			if (orig) {
				for (prop in orig) {
					if (!(prop in event)) {
						event[prop] = orig[prop];
					}
				}
			}

			this.element.trigger(event, data);
			return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
		}
	};

	$.each({ show: "fadeIn", hide: "fadeOut" }, function (method, defaultEffect) {
		$.Widget.prototype["_" + method] = function (element, options, callback) {
			if (typeof options === "string") {
				options = { effect: options };
			}
			var hasOptions,
			    effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
			options = options || {};
			if (typeof options === "number") {
				options = { duration: options };
			}
			hasOptions = !$.isEmptyObject(options);
			options.complete = callback;
			if (options.delay) {
				element.delay(options.delay);
			}
			if (hasOptions && $.effects && $.effects.effect[effectName]) {
				element[method](options);
			} else if (effectName !== method && element[effectName]) {
				element[effectName](options.duration, options.easing, callback);
			} else {
				element.queue(function (next) {
					$(this)[method]();
					if (callback) {
						callback.call(element[0]);
					}
					next();
				});
			}
		};
	});
})(jQuery);
(function ($, undefined) {

	var dataSpace = "ui-effects-";

	$.effects = {
		effect: {}
	};

	/*!
  * jQuery Color Animations v2.1.2
  * https://github.com/jquery/jquery-color
  *
  * Copyright 2013 jQuery Foundation and other contributors
  * Released under the MIT license.
  * http://jquery.org/license
  *
  * Date: Wed Jan 16 08:47:09 2013 -0600
  */
	(function (jQuery, undefined) {

		var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",


		// plusequals test for += 100 -= 100
		rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,

		// a set of RE's that can match strings and generate color tuples.
		stringParsers = [{
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function parse(execResult) {
				return [execResult[1], execResult[2], execResult[3], execResult[4]];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function parse(execResult) {
				return [execResult[1] * 2.55, execResult[2] * 2.55, execResult[3] * 2.55, execResult[4]];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function parse(execResult) {
				return [parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16)];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function parse(execResult) {
				return [parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16)];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function parse(execResult) {
				return [execResult[1], execResult[2] / 100, execResult[3] / 100, execResult[4]];
			}
		}],


		// jQuery.Color( )
		color = jQuery.Color = function (color, green, blue, alpha) {
			return new jQuery.Color.fn.parse(color, green, blue, alpha);
		},
		    spaces = {
			rgba: {
				props: {
					red: {
						idx: 0,
						type: "byte"
					},
					green: {
						idx: 1,
						type: "byte"
					},
					blue: {
						idx: 2,
						type: "byte"
					}
				}
			},

			hsla: {
				props: {
					hue: {
						idx: 0,
						type: "degrees"
					},
					saturation: {
						idx: 1,
						type: "percent"
					},
					lightness: {
						idx: 2,
						type: "percent"
					}
				}
			}
		},
		    propTypes = {
			"byte": {
				floor: true,
				max: 255
			},
			"percent": {
				max: 1
			},
			"degrees": {
				mod: 360,
				floor: true
			}
		},
		    support = color.support = {},


		// element for support tests
		supportElem = jQuery("<p>")[0],


		// colors = jQuery.Color.names
		colors,


		// local aliases of functions called often
		each = jQuery.each;

		// determine rgba support immediately
		supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
		support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;

		// define cache name and alpha properties
		// for rgba and hsla spaces
		each(spaces, function (spaceName, space) {
			space.cache = "_" + spaceName;
			space.props.alpha = {
				idx: 3,
				type: "percent",
				def: 1
			};
		});

		function clamp(value, prop, allowEmpty) {
			var type = propTypes[prop.type] || {};

			if (value == null) {
				return allowEmpty || !prop.def ? null : prop.def;
			}

			// ~~ is an short way of doing floor for positive numbers
			value = type.floor ? ~~value : parseFloat(value);

			// IE will pass in empty strings as value for alpha,
			// which will hit this case
			if (isNaN(value)) {
				return prop.def;
			}

			if (type.mod) {
				// we add mod before modding to make sure that negatives values
				// get converted properly: -10 -> 350
				return (value + type.mod) % type.mod;
			}

			// for now all property types without mod have min and max
			return 0 > value ? 0 : type.max < value ? type.max : value;
		}

		function stringParse(string) {
			var inst = color(),
			    rgba = inst._rgba = [];

			string = string.toLowerCase();

			each(stringParsers, function (i, parser) {
				var parsed,
				    match = parser.re.exec(string),
				    values = match && parser.parse(match),
				    spaceName = parser.space || "rgba";

				if (values) {
					parsed = inst[spaceName](values);

					// if this was an rgba parse the assignment might happen twice
					// oh well....
					inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
					rgba = inst._rgba = parsed._rgba;

					// exit each( stringParsers ) here because we matched
					return false;
				}
			});

			// Found a stringParser that handled it
			if (rgba.length) {

				// if this came from a parsed string, force "transparent" when alpha is 0
				// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
				if (rgba.join() === "0,0,0,0") {
					jQuery.extend(rgba, colors.transparent);
				}
				return inst;
			}

			// named colors
			return colors[string];
		}

		color.fn = jQuery.extend(color.prototype, {
			parse: function parse(red, green, blue, alpha) {
				if (red === undefined) {
					this._rgba = [null, null, null, null];
					return this;
				}
				if (red.jquery || red.nodeType) {
					red = jQuery(red).css(green);
					green = undefined;
				}

				var inst = this,
				    type = jQuery.type(red),
				    rgba = this._rgba = [];

				// more than 1 argument specified - assume ( red, green, blue, alpha )
				if (green !== undefined) {
					red = [red, green, blue, alpha];
					type = "array";
				}

				if (type === "string") {
					return this.parse(stringParse(red) || colors._default);
				}

				if (type === "array") {
					each(spaces.rgba.props, function (key, prop) {
						rgba[prop.idx] = clamp(red[prop.idx], prop);
					});
					return this;
				}

				if (type === "object") {
					if (red instanceof color) {
						each(spaces, function (spaceName, space) {
							if (red[space.cache]) {
								inst[space.cache] = red[space.cache].slice();
							}
						});
					} else {
						each(spaces, function (spaceName, space) {
							var cache = space.cache;
							each(space.props, function (key, prop) {

								// if the cache doesn't exist, and we know how to convert
								if (!inst[cache] && space.to) {

									// if the value was null, we don't need to copy it
									// if the key was alpha, we don't need to copy it either
									if (key === "alpha" || red[key] == null) {
										return;
									}
									inst[cache] = space.to(inst._rgba);
								}

								// this is the only case where we allow nulls for ALL properties.
								// call clamp with alwaysAllowEmpty
								inst[cache][prop.idx] = clamp(red[key], prop, true);
							});

							// everything defined but alpha?
							if (inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0) {
								// use the default of 1
								inst[cache][3] = 1;
								if (space.from) {
									inst._rgba = space.from(inst[cache]);
								}
							}
						});
					}
					return this;
				}
			},
			is: function is(compare) {
				var is = color(compare),
				    same = true,
				    inst = this;

				each(spaces, function (_, space) {
					var localCache,
					    isCache = is[space.cache];
					if (isCache) {
						localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [];
						each(space.props, function (_, prop) {
							if (isCache[prop.idx] != null) {
								same = isCache[prop.idx] === localCache[prop.idx];
								return same;
							}
						});
					}
					return same;
				});
				return same;
			},
			_space: function _space() {
				var used = [],
				    inst = this;
				each(spaces, function (spaceName, space) {
					if (inst[space.cache]) {
						used.push(spaceName);
					}
				});
				return used.pop();
			},
			transition: function transition(other, distance) {
				var end = color(other),
				    spaceName = end._space(),
				    space = spaces[spaceName],
				    startColor = this.alpha() === 0 ? color("transparent") : this,
				    start = startColor[space.cache] || space.to(startColor._rgba),
				    result = start.slice();

				end = end[space.cache];
				each(space.props, function (key, prop) {
					var index = prop.idx,
					    startValue = start[index],
					    endValue = end[index],
					    type = propTypes[prop.type] || {};

					// if null, don't override start value
					if (endValue === null) {
						return;
					}
					// if null - use end
					if (startValue === null) {
						result[index] = endValue;
					} else {
						if (type.mod) {
							if (endValue - startValue > type.mod / 2) {
								startValue += type.mod;
							} else if (startValue - endValue > type.mod / 2) {
								startValue -= type.mod;
							}
						}
						result[index] = clamp((endValue - startValue) * distance + startValue, prop);
					}
				});
				return this[spaceName](result);
			},
			blend: function blend(opaque) {
				// if we are already opaque - return ourself
				if (this._rgba[3] === 1) {
					return this;
				}

				var rgb = this._rgba.slice(),
				    a = rgb.pop(),
				    blend = color(opaque)._rgba;

				return color(jQuery.map(rgb, function (v, i) {
					return (1 - a) * blend[i] + a * v;
				}));
			},
			toRgbaString: function toRgbaString() {
				var prefix = "rgba(",
				    rgba = jQuery.map(this._rgba, function (v, i) {
					return v == null ? i > 2 ? 1 : 0 : v;
				});

				if (rgba[3] === 1) {
					rgba.pop();
					prefix = "rgb(";
				}

				return prefix + rgba.join() + ")";
			},
			toHslaString: function toHslaString() {
				var prefix = "hsla(",
				    hsla = jQuery.map(this.hsla(), function (v, i) {
					if (v == null) {
						v = i > 2 ? 1 : 0;
					}

					// catch 1 and 2
					if (i && i < 3) {
						v = Math.round(v * 100) + "%";
					}
					return v;
				});

				if (hsla[3] === 1) {
					hsla.pop();
					prefix = "hsl(";
				}
				return prefix + hsla.join() + ")";
			},
			toHexString: function toHexString(includeAlpha) {
				var rgba = this._rgba.slice(),
				    alpha = rgba.pop();

				if (includeAlpha) {
					rgba.push(~~(alpha * 255));
				}

				return "#" + jQuery.map(rgba, function (v) {

					// default to 0 when nulls exist
					v = (v || 0).toString(16);
					return v.length === 1 ? "0" + v : v;
				}).join("");
			},
			toString: function toString() {
				return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
			}
		});
		color.fn.parse.prototype = color.fn;

		// hsla conversions adapted from:
		// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

		function hue2rgb(p, q, h) {
			h = (h + 1) % 1;
			if (h * 6 < 1) {
				return p + (q - p) * h * 6;
			}
			if (h * 2 < 1) {
				return q;
			}
			if (h * 3 < 2) {
				return p + (q - p) * (2 / 3 - h) * 6;
			}
			return p;
		}

		spaces.hsla.to = function (rgba) {
			if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
				return [null, null, null, rgba[3]];
			}
			var r = rgba[0] / 255,
			    g = rgba[1] / 255,
			    b = rgba[2] / 255,
			    a = rgba[3],
			    max = Math.max(r, g, b),
			    min = Math.min(r, g, b),
			    diff = max - min,
			    add = max + min,
			    l = add * 0.5,
			    h,
			    s;

			if (min === max) {
				h = 0;
			} else if (r === max) {
				h = 60 * (g - b) / diff + 360;
			} else if (g === max) {
				h = 60 * (b - r) / diff + 120;
			} else {
				h = 60 * (r - g) / diff + 240;
			}

			// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
			// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
			if (diff === 0) {
				s = 0;
			} else if (l <= 0.5) {
				s = diff / add;
			} else {
				s = diff / (2 - add);
			}
			return [Math.round(h) % 360, s, l, a == null ? 1 : a];
		};

		spaces.hsla.from = function (hsla) {
			if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
				return [null, null, null, hsla[3]];
			}
			var h = hsla[0] / 360,
			    s = hsla[1],
			    l = hsla[2],
			    a = hsla[3],
			    q = l <= 0.5 ? l * (1 + s) : l + s - l * s,
			    p = 2 * l - q;

			return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255), a];
		};

		each(spaces, function (spaceName, space) {
			var props = space.props,
			    cache = space.cache,
			    to = space.to,
			    from = space.from;

			// makes rgba() and hsla()
			color.fn[spaceName] = function (value) {

				// generate a cache for this space if it doesn't exist
				if (to && !this[cache]) {
					this[cache] = to(this._rgba);
				}
				if (value === undefined) {
					return this[cache].slice();
				}

				var ret,
				    type = jQuery.type(value),
				    arr = type === "array" || type === "object" ? value : arguments,
				    local = this[cache].slice();

				each(props, function (key, prop) {
					var val = arr[type === "object" ? key : prop.idx];
					if (val == null) {
						val = local[prop.idx];
					}
					local[prop.idx] = clamp(val, prop);
				});

				if (from) {
					ret = color(from(local));
					ret[cache] = local;
					return ret;
				} else {
					return color(local);
				}
			};

			// makes red() green() blue() alpha() hue() saturation() lightness()
			each(props, function (key, prop) {
				// alpha is included in more than one space
				if (color.fn[key]) {
					return;
				}
				color.fn[key] = function (value) {
					var vtype = jQuery.type(value),
					    fn = key === "alpha" ? this._hsla ? "hsla" : "rgba" : spaceName,
					    local = this[fn](),
					    cur = local[prop.idx],
					    match;

					if (vtype === "undefined") {
						return cur;
					}

					if (vtype === "function") {
						value = value.call(this, cur);
						vtype = jQuery.type(value);
					}
					if (value == null && prop.empty) {
						return this;
					}
					if (vtype === "string") {
						match = rplusequals.exec(value);
						if (match) {
							value = cur + parseFloat(match[2]) * (match[1] === "+" ? 1 : -1);
						}
					}
					local[prop.idx] = value;
					return this[fn](local);
				};
			});
		});

		// add cssHook and .fx.step function for each named hook.
		// accept a space separated string of properties
		color.hook = function (hook) {
			var hooks = hook.split(" ");
			each(hooks, function (i, hook) {
				jQuery.cssHooks[hook] = {
					set: function set(elem, value) {
						var parsed,
						    curElem,
						    backgroundColor = "";

						if (value !== "transparent" && (jQuery.type(value) !== "string" || (parsed = stringParse(value)))) {
							value = color(parsed || value);
							if (!support.rgba && value._rgba[3] !== 1) {
								curElem = hook === "backgroundColor" ? elem.parentNode : elem;
								while ((backgroundColor === "" || backgroundColor === "transparent") && curElem && curElem.style) {
									try {
										backgroundColor = jQuery.css(curElem, "backgroundColor");
										curElem = curElem.parentNode;
									} catch (e) {}
								}

								value = value.blend(backgroundColor && backgroundColor !== "transparent" ? backgroundColor : "_default");
							}

							value = value.toRgbaString();
						}
						try {
							elem.style[hook] = value;
						} catch (e) {
							// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
						}
					}
				};
				jQuery.fx.step[hook] = function (fx) {
					if (!fx.colorInit) {
						fx.start = color(fx.elem, hook);
						fx.end = color(fx.end);
						fx.colorInit = true;
					}
					jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos));
				};
			});
		};

		color.hook(stepHooks);

		jQuery.cssHooks.borderColor = {
			expand: function expand(value) {
				var expanded = {};

				each(["Top", "Right", "Bottom", "Left"], function (i, part) {
					expanded["border" + part + "Color"] = value;
				});
				return expanded;
			}
		};

		// Basic color names only.
		// Usage of any of the other color names requires adding yourself or including
		// jquery.color.svg-names.js.
		colors = jQuery.Color.names = {
			// 4.1. Basic color keywords
			aqua: "#00ffff",
			black: "#000000",
			blue: "#0000ff",
			fuchsia: "#ff00ff",
			gray: "#808080",
			green: "#008000",
			lime: "#00ff00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			purple: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			teal: "#008080",
			white: "#ffffff",
			yellow: "#ffff00",

			// 4.2.3. "transparent" color keyword
			transparent: [null, null, null, 0],

			_default: "#ffffff"
		};
	})(jQuery);

	/******************************************************************************/
	/****************************** CLASS ANIMATIONS ******************************/
	/******************************************************************************/
	(function () {

		var classAnimationActions = ["add", "remove", "toggle"],
		    shorthandStyles = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
		};

		$.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (_, prop) {
			$.fx.step[prop] = function (fx) {
				if (fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr) {
					jQuery.style(fx.elem, prop, fx.end);
					fx.setAttr = true;
				}
			};
		});

		function getElementStyles(elem) {
			var key,
			    len,
			    style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle,
			    styles = {};

			if (style && style.length && style[0] && style[style[0]]) {
				len = style.length;
				while (len--) {
					key = style[len];
					if (typeof style[key] === "string") {
						styles[$.camelCase(key)] = style[key];
					}
				}
				// support: Opera, IE <9
			} else {
				for (key in style) {
					if (typeof style[key] === "string") {
						styles[key] = style[key];
					}
				}
			}

			return styles;
		}

		function styleDifference(oldStyle, newStyle) {
			var diff = {},
			    name,
			    value;

			for (name in newStyle) {
				value = newStyle[name];
				if (oldStyle[name] !== value) {
					if (!shorthandStyles[name]) {
						if ($.fx.step[name] || !isNaN(parseFloat(value))) {
							diff[name] = value;
						}
					}
				}
			}

			return diff;
		}

		// support: jQuery <1.8
		if (!$.fn.addBack) {
			$.fn.addBack = function (selector) {
				return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
			};
		}

		$.effects.animateClass = function (value, duration, easing, callback) {
			var o = $.speed(duration, easing, callback);

			return this.queue(function () {
				var animated = $(this),
				    baseClass = animated.attr("class") || "",
				    applyClassChange,
				    allAnimations = o.children ? animated.find("*").addBack() : animated;

				// map the animated objects to store the original styles.
				allAnimations = allAnimations.map(function () {
					var el = $(this);
					return {
						el: el,
						start: getElementStyles(this)
					};
				});

				// apply class change
				applyClassChange = function applyClassChange() {
					$.each(classAnimationActions, function (i, action) {
						if (value[action]) {
							animated[action + "Class"](value[action]);
						}
					});
				};
				applyClassChange();

				// map all animated objects again - calculate new styles and diff
				allAnimations = allAnimations.map(function () {
					this.end = getElementStyles(this.el[0]);
					this.diff = styleDifference(this.start, this.end);
					return this;
				});

				// apply original class
				animated.attr("class", baseClass);

				// map all animated objects again - this time collecting a promise
				allAnimations = allAnimations.map(function () {
					var styleInfo = this,
					    dfd = $.Deferred(),
					    opts = $.extend({}, o, {
						queue: false,
						complete: function complete() {
							dfd.resolve(styleInfo);
						}
					});

					this.el.animate(this.diff, opts);
					return dfd.promise();
				});

				// once all animations have completed:
				$.when.apply($, allAnimations.get()).done(function () {

					// set the final class
					applyClassChange();

					// for each animated element,
					// clear all css properties that were animated
					$.each(arguments, function () {
						var el = this.el;
						$.each(this.diff, function (key) {
							el.css(key, "");
						});
					});

					// this is guarnteed to be there if you use jQuery.speed()
					// it also handles dequeuing the next anim...
					o.complete.call(animated[0]);
				});
			});
		};

		$.fn.extend({
			addClass: function (orig) {
				return function (classNames, speed, easing, callback) {
					return speed ? $.effects.animateClass.call(this, { add: classNames }, speed, easing, callback) : orig.apply(this, arguments);
				};
			}($.fn.addClass),

			removeClass: function (orig) {
				return function (classNames, speed, easing, callback) {
					return arguments.length > 1 ? $.effects.animateClass.call(this, { remove: classNames }, speed, easing, callback) : orig.apply(this, arguments);
				};
			}($.fn.removeClass),

			toggleClass: function (orig) {
				return function (classNames, force, speed, easing, callback) {
					if (typeof force === "boolean" || force === undefined) {
						if (!speed) {
							// without speed parameter
							return orig.apply(this, arguments);
						} else {
							return $.effects.animateClass.call(this, force ? { add: classNames } : { remove: classNames }, speed, easing, callback);
						}
					} else {
						// without force parameter
						return $.effects.animateClass.call(this, { toggle: classNames }, force, speed, easing);
					}
				};
			}($.fn.toggleClass),

			switchClass: function switchClass(remove, add, speed, easing, callback) {
				return $.effects.animateClass.call(this, {
					add: add,
					remove: remove
				}, speed, easing, callback);
			}
		});
	})();

	/******************************************************************************/
	/*********************************** EFFECTS **********************************/
	/******************************************************************************/

	(function () {

		$.extend($.effects, {
			version: "1.10.3",

			// Saves a set of properties in a data storage
			save: function save(element, set) {
				for (var i = 0; i < set.length; i++) {
					if (set[i] !== null) {
						element.data(dataSpace + set[i], element[0].style[set[i]]);
					}
				}
			},

			// Restores a set of previously saved properties from a data storage
			restore: function restore(element, set) {
				var val, i;
				for (i = 0; i < set.length; i++) {
					if (set[i] !== null) {
						val = element.data(dataSpace + set[i]);
						// support: jQuery 1.6.2
						// http://bugs.jquery.com/ticket/9917
						// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
						// We can't differentiate between "" and 0 here, so we just assume
						// empty string since it's likely to be a more common value...
						if (val === undefined) {
							val = "";
						}
						element.css(set[i], val);
					}
				}
			},

			setMode: function setMode(el, mode) {
				if (mode === "toggle") {
					mode = el.is(":hidden") ? "show" : "hide";
				}
				return mode;
			},

			// Translates a [top,left] array into a baseline value
			// this should be a little more flexible in the future to handle a string & hash
			getBaseline: function getBaseline(origin, original) {
				var y, x;
				switch (origin[0]) {
					case "top":
						y = 0;break;
					case "middle":
						y = 0.5;break;
					case "bottom":
						y = 1;break;
					default:
						y = origin[0] / original.height;
				}
				switch (origin[1]) {
					case "left":
						x = 0;break;
					case "center":
						x = 0.5;break;
					case "right":
						x = 1;break;
					default:
						x = origin[1] / original.width;
				}
				return {
					x: x,
					y: y
				};
			},

			// Wraps the element around a wrapper that copies position properties
			createWrapper: function createWrapper(element) {

				// if the element is already wrapped, return it
				if (element.parent().is(".ui-effects-wrapper")) {
					return element.parent();
				}

				// wrap the element
				var props = {
					width: element.outerWidth(true),
					height: element.outerHeight(true),
					"float": element.css("float")
				},
				    wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),

				// Store the size in case width/height are defined in % - Fixes #5245
				size = {
					width: element.width(),
					height: element.height()
				},
				    active = document.activeElement;

				// support: Firefox
				// Firefox incorrectly exposes anonymous content
				// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
				try {
					active.id;
				} catch (e) {
					active = document.body;
				}

				element.wrap(wrapper);

				// Fixes #7595 - Elements lose focus when wrapped.
				if (element[0] === active || $.contains(element[0], active)) {
					$(active).focus();
				}

				wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element

				// transfer positioning properties to the wrapper
				if (element.css("position") === "static") {
					wrapper.css({ position: "relative" });
					element.css({ position: "relative" });
				} else {
					$.extend(props, {
						position: element.css("position"),
						zIndex: element.css("z-index")
					});
					$.each(["top", "left", "bottom", "right"], function (i, pos) {
						props[pos] = element.css(pos);
						if (isNaN(parseInt(props[pos], 10))) {
							props[pos] = "auto";
						}
					});
					element.css({
						position: "relative",
						top: 0,
						left: 0,
						right: "auto",
						bottom: "auto"
					});
				}
				element.css(size);

				return wrapper.css(props).show();
			},

			removeWrapper: function removeWrapper(element) {
				var active = document.activeElement;

				if (element.parent().is(".ui-effects-wrapper")) {
					element.parent().replaceWith(element);

					// Fixes #7595 - Elements lose focus when wrapped.
					if (element[0] === active || $.contains(element[0], active)) {
						$(active).focus();
					}
				}

				return element;
			},

			setTransition: function setTransition(element, list, factor, value) {
				value = value || {};
				$.each(list, function (i, x) {
					var unit = element.cssUnit(x);
					if (unit[0] > 0) {
						value[x] = unit[0] * factor + unit[1];
					}
				});
				return value;
			}
		});

		// return an effect options object for the given parameters:
		function _normalizeArguments(effect, options, speed, callback) {

			// allow passing all options as the first parameter
			if ($.isPlainObject(effect)) {
				options = effect;
				effect = effect.effect;
			}

			// convert to an object
			effect = { effect: effect };

			// catch (effect, null, ...)
			if (options == null) {
				options = {};
			}

			// catch (effect, callback)
			if ($.isFunction(options)) {
				callback = options;
				speed = null;
				options = {};
			}

			// catch (effect, speed, ?)
			if (typeof options === "number" || $.fx.speeds[options]) {
				callback = speed;
				speed = options;
				options = {};
			}

			// catch (effect, options, callback)
			if ($.isFunction(speed)) {
				callback = speed;
				speed = null;
			}

			// add options to effect
			if (options) {
				$.extend(effect, options);
			}

			speed = speed || options.duration;
			effect.duration = $.fx.off ? 0 : typeof speed === "number" ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default;

			effect.complete = callback || options.complete;

			return effect;
		}

		function standardAnimationOption(option) {
			// Valid standard speeds (nothing, number, named speed)
			if (!option || typeof option === "number" || $.fx.speeds[option]) {
				return true;
			}

			// Invalid strings - treat as "normal" speed
			if (typeof option === "string" && !$.effects.effect[option]) {
				return true;
			}

			// Complete callback
			if ($.isFunction(option)) {
				return true;
			}

			// Options hash (but not naming an effect)
			if ((typeof option === "undefined" ? "undefined" : _typeof(option)) === "object" && !option.effect) {
				return true;
			}

			// Didn't match any standard API
			return false;
		}

		$.fn.extend({
			effect: function effect() /* effect, options, speed, callback */{
				var args = _normalizeArguments.apply(this, arguments),
				    mode = args.mode,
				    queue = args.queue,
				    effectMethod = $.effects.effect[args.effect];

				if ($.fx.off || !effectMethod) {
					// delegate to the original method (e.g., .show()) if possible
					if (mode) {
						return this[mode](args.duration, args.complete);
					} else {
						return this.each(function () {
							if (args.complete) {
								args.complete.call(this);
							}
						});
					}
				}

				function run(next) {
					var elem = $(this),
					    complete = args.complete,
					    mode = args.mode;

					function done() {
						if ($.isFunction(complete)) {
							complete.call(elem[0]);
						}
						if ($.isFunction(next)) {
							next();
						}
					}

					// If the element already has the correct final state, delegate to
					// the core methods so the internal tracking of "olddisplay" works.
					if (elem.is(":hidden") ? mode === "hide" : mode === "show") {
						elem[mode]();
						done();
					} else {
						effectMethod.call(elem[0], args, done);
					}
				}

				return queue === false ? this.each(run) : this.queue(queue || "fx", run);
			},

			show: function (orig) {
				return function (option) {
					if (standardAnimationOption(option)) {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "show";
						return this.effect.call(this, args);
					}
				};
			}($.fn.show),

			hide: function (orig) {
				return function (option) {
					if (standardAnimationOption(option)) {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "hide";
						return this.effect.call(this, args);
					}
				};
			}($.fn.hide),

			toggle: function (orig) {
				return function (option) {
					if (standardAnimationOption(option) || typeof option === "boolean") {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "toggle";
						return this.effect.call(this, args);
					}
				};
			}($.fn.toggle),

			// helper functions
			cssUnit: function cssUnit(key) {
				var style = this.css(key),
				    val = [];

				$.each(["em", "px", "%", "pt"], function (i, unit) {
					if (style.indexOf(unit) > 0) {
						val = [parseFloat(style), unit];
					}
				});
				return val;
			}
		});
	})();

	/******************************************************************************/
	/*********************************** EASING ***********************************/
	/******************************************************************************/

	(function () {

		// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

		var baseEasings = {};

		$.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (i, name) {
			baseEasings[name] = function (p) {
				return Math.pow(p, i + 2);
			};
		});

		$.extend(baseEasings, {
			Sine: function Sine(p) {
				return 1 - Math.cos(p * Math.PI / 2);
			},
			Circ: function Circ(p) {
				return 1 - Math.sqrt(1 - p * p);
			},
			Elastic: function Elastic(p) {
				return p === 0 || p === 1 ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
			},
			Back: function Back(p) {
				return p * p * (3 * p - 2);
			},
			Bounce: function Bounce(p) {
				var pow2,
				    bounce = 4;

				while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
				return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
			}
		});

		$.each(baseEasings, function (name, easeIn) {
			$.easing["easeIn" + name] = easeIn;
			$.easing["easeOut" + name] = function (p) {
				return 1 - easeIn(1 - p);
			};
			$.easing["easeInOut" + name] = function (p) {
				return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
			};
		});
	})();
})(jQuery);
'use strict';

/*!
    jQuery.kinetic v1.8.2
    Dave Taylor http://the-taylors.org/jquery.kinetic

    The MIT License (MIT)
    Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*global define,require */
(function ($) {
    'use strict';

    var DEFAULT_SETTINGS = {
        cursor: 'move',
        decelerate: true,
        triggerHardware: false,
        y: true,
        x: true,
        slowdown: 0.9,
        maxvelocity: 40,
        throttleFPS: 60,
        movingClass: {
            up: 'kinetic-moving-up',
            down: 'kinetic-moving-down',
            left: 'kinetic-moving-left',
            right: 'kinetic-moving-right'
        },
        deceleratingClass: {
            up: 'kinetic-decelerating-up',
            down: 'kinetic-decelerating-down',
            left: 'kinetic-decelerating-left',
            right: 'kinetic-decelerating-right'
        }
    },
        SETTINGS_KEY = 'kinetic-settings',
        ACTIVE_CLASS = 'kinetic-active';
    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if (!window.requestAnimationFrame) {

        window.requestAnimationFrame = function () {

            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */callback, /* DOMElement Element */element) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();
    }

    // add touch checker to jQuery.support
    $.support = $.support || {};
    $.extend($.support, {
        touch: "ontouchend" in document
    });
    var selectStart = function selectStart() {
        return false;
    };

    var decelerateVelocity = function decelerateVelocity(velocity, slowdown) {
        return Math.floor(Math.abs(velocity)) === 0 ? 0 // is velocity less than 1?
        : velocity * slowdown; // reduce slowdown
    };

    var capVelocity = function capVelocity(velocity, max) {
        var newVelocity = velocity;
        if (velocity > 0) {
            if (velocity > max) {
                newVelocity = max;
            }
        } else {
            if (velocity < 0 - max) {
                newVelocity = 0 - max;
            }
        }
        return newVelocity;
    };

    var setMoveClasses = function setMoveClasses(settings, classes) {
        this.removeClass(settings.movingClass.up).removeClass(settings.movingClass.down).removeClass(settings.movingClass.left).removeClass(settings.movingClass.right).removeClass(settings.deceleratingClass.up).removeClass(settings.deceleratingClass.down).removeClass(settings.deceleratingClass.left).removeClass(settings.deceleratingClass.right);

        if (settings.velocity > 0) {
            this.addClass(classes.right);
        }
        if (settings.velocity < 0) {
            this.addClass(classes.left);
        }
        if (settings.velocityY > 0) {
            this.addClass(classes.down);
        }
        if (settings.velocityY < 0) {
            this.addClass(classes.up);
        }
    };

    var _stop = function _stop($scroller, settings) {
        settings.velocity = 0;
        settings.velocityY = 0;
        settings.decelerate = true;
        if (typeof settings.stopped === 'function') {
            settings.stopped.call($scroller, settings);
        }
    };

    /** do the actual kinetic movement */
    var move = function move($scroller, settings) {
        var scroller = $scroller[0];
        // set scrollLeft
        if (settings.x && scroller.scrollWidth > 0) {
            scroller.scrollLeft = settings.scrollLeft = scroller.scrollLeft + settings.velocity;
            if (Math.abs(settings.velocity) > 0) {
                settings.velocity = settings.decelerate ? decelerateVelocity(settings.velocity, settings.slowdown) : settings.velocity;
            }
        } else {
            settings.velocity = 0;
        }

        // set scrollTop
        if (settings.y && scroller.scrollHeight > 0) {
            scroller.scrollTop = settings.scrollTop = scroller.scrollTop + settings.velocityY;
            if (Math.abs(settings.velocityY) > 0) {
                settings.velocityY = settings.decelerate ? decelerateVelocity(settings.velocityY, settings.slowdown) : settings.velocityY;
            }
        } else {
            settings.velocityY = 0;
        }

        setMoveClasses.call($scroller, settings, settings.deceleratingClass);

        if (typeof settings.moved === 'function') {
            settings.moved.call($scroller, settings);
        }

        if (Math.abs(settings.velocity) > 0 || Math.abs(settings.velocityY) > 0) {
            // tick for next movement
            window.requestAnimationFrame(function () {
                move($scroller, settings);
            });
        } else {
            _stop($scroller, settings);
        }
    };

    var callOption = function callOption(method, options) {
        var methodFn = $.kinetic.callMethods[method],
            args = Array.prototype.slice.call(arguments);
        if (methodFn) {
            this.each(function () {
                var opts = args.slice(1),
                    settings = $(this).data(SETTINGS_KEY);
                opts.unshift(settings);
                methodFn.apply(this, opts);
            });
        }
    };

    var attachListeners = function attachListeners($this, settings) {
        var element = $this[0];
        if ($.support.touch) {
            $this.bind('touchstart', settings.events.touchStart).bind('touchend', settings.events.inputEnd).bind('touchmove', settings.events.touchMove);
        } else {
            $this.mousedown(settings.events.inputDown).mouseup(settings.events.inputEnd).mousemove(settings.events.inputMove);
        }
        $this.click(settings.events.inputClick).scroll(settings.events.scroll).bind("selectstart", selectStart) // prevent selection when dragging
        .bind('dragstart', settings.events.dragStart);
    };
    var detachListeners = function detachListeners($this, settings) {
        var element = $this[0];
        if ($.support.touch) {
            $this.unbind('touchstart', settings.events.touchStart).unbind('touchend', settings.events.inputEnd).unbind('touchmove', settings.events.touchMove);
        } else {
            $this.unbind('mousedown', settings.events.inputDown).unbind('mouseup', settings.events.inputEnd).unbind('mousemove', settings.events.inputMove).unbind('scroll', settings.events.scroll);
        }
        $this.unbind('click', settings.events.inputClick).unbind("selectstart", selectStart); // prevent selection when dragging
        $this.unbind('dragstart', settings.events.dragStart);
    };

    var initElements = function initElements(options) {
        this.addClass(ACTIVE_CLASS).each(function () {

            var self = this,
                $this = $(this);

            if ($this.data(SETTINGS_KEY)) {
                return;
            }

            var settings = $.extend({}, DEFAULT_SETTINGS, options),
                xpos,
                prevXPos = false,
                ypos,
                prevYPos = false,
                mouseDown = false,
                scrollLeft,
                scrollTop,
                throttleTimeout = 1000 / settings.throttleFPS,
                lastMove,
                elementFocused;

            settings.velocity = 0;
            settings.velocityY = 0;

            // make sure we reset everything when mouse up
            var resetMouse = function resetMouse() {
                xpos = false;
                ypos = false;
                mouseDown = false;
            };
            $(document).mouseup(resetMouse).click(resetMouse);

            var calculateVelocities = function calculateVelocities() {
                settings.velocity = capVelocity(prevXPos - xpos, settings.maxvelocity);
                settings.velocityY = capVelocity(prevYPos - ypos, settings.maxvelocity);
            };
            var useTarget = function useTarget(target) {
                if ($.isFunction(settings.filterTarget)) {
                    return settings.filterTarget.call(self, target) !== false;
                }
                return true;
            };
            var start = function start(clientX, clientY) {
                mouseDown = true;
                settings.velocity = prevXPos = 0;
                settings.velocityY = prevYPos = 0;
                xpos = clientX;
                ypos = clientY;
            };
            var end = function end() {
                if (xpos && prevXPos && settings.decelerate === false) {
                    settings.decelerate = true;
                    calculateVelocities();
                    xpos = prevXPos = mouseDown = false;
                    move($this, settings);
                }
            };
            var inputmove = function inputmove(clientX, clientY) {
                if (!lastMove || new Date() > new Date(lastMove.getTime() + throttleTimeout)) {
                    lastMove = new Date();

                    if (mouseDown && (xpos || ypos)) {
                        if (elementFocused) {
                            $(elementFocused).blur();
                            elementFocused = null;
                            $this.focus();
                        }
                        settings.decelerate = false;
                        settings.velocity = settings.velocityY = 0;
                        $this[0].scrollLeft = settings.scrollLeft = settings.x ? $this[0].scrollLeft - (clientX - xpos) : $this[0].scrollLeft;
                        $this[0].scrollTop = settings.scrollTop = settings.y ? $this[0].scrollTop - (clientY - ypos) : $this[0].scrollTop;
                        prevXPos = xpos;
                        prevYPos = ypos;
                        xpos = clientX;
                        ypos = clientY;

                        calculateVelocities();
                        setMoveClasses.call($this, settings, settings.movingClass);

                        if (typeof settings.moved === 'function') {
                            settings.moved.call($this, settings);
                        }
                    }
                }
            };

            // Events
            settings.events = {
                touchStart: function touchStart(e) {
                    var touch;
                    if (useTarget(e.target)) {
                        touch = e.originalEvent.touches[0];
                        start(touch.clientX, touch.clientY);
                        e.stopPropagation();
                    }
                },
                touchMove: function touchMove(e) {
                    var touch;
                    if (mouseDown) {
                        touch = e.originalEvent.touches[0];
                        inputmove(touch.clientX, touch.clientY);
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                    }
                },
                inputDown: function inputDown(e) {
                    if (useTarget(e.target)) {
                        start(e.clientX, e.clientY);
                        elementFocused = e.target;
                        if (e.target.nodeName === 'IMG') {
                            e.preventDefault();
                        }
                        e.stopPropagation();
                    }
                },
                inputEnd: function inputEnd(e) {
                    end();
                    elementFocused = null;
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                },
                inputMove: function inputMove(e) {
                    if (mouseDown) {
                        inputmove(e.clientX, e.clientY);
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                    }
                },
                scroll: function scroll(e) {
                    if (typeof settings.moved === 'function') {
                        settings.moved.call($this, settings);
                    }
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                },
                inputClick: function inputClick(e) {
                    if (Math.abs(settings.velocity) > 0) {
                        e.preventDefault();
                        return false;
                    }
                },
                // prevent drag and drop images in ie
                dragStart: function dragStart(e) {
                    if (elementFocused) {
                        return false;
                    }
                }
            };

            attachListeners($this, settings);
            $this.data(SETTINGS_KEY, settings).css("cursor", settings.cursor);

            if (settings.triggerHardware) {
                $this.css({
                    '-webkit-transform': 'translate3d(0,0,0)',
                    '-webkit-perspective': '1000',
                    '-webkit-backface-visibility': 'hidden'
                });
            }
        });
    };

    $.kinetic = {
        settingsKey: SETTINGS_KEY,
        callMethods: {
            start: function start(settings, options) {
                var $this = $(this);
                settings = $.extend(settings, options);
                if (settings) {
                    settings.decelerate = false;
                    move($this, settings);
                }
            },
            end: function end(settings, options) {
                var $this = $(this);
                if (settings) {
                    settings.decelerate = true;
                }
            },
            stop: function stop(settings, options) {
                var $this = $(this);
                _stop($this, settings);
            },
            detach: function detach(settings, options) {
                var $this = $(this);
                detachListeners($this, settings);
                $this.removeClass(ACTIVE_CLASS).css("cursor", "");
            },
            attach: function attach(settings, options) {
                var $this = $(this);
                attachListeners($this, settings);
                $this.addClass(ACTIVE_CLASS).css("cursor", "move");
            }
        }
    };
    $.fn.kinetic = function (options) {
        if (typeof options === 'string') {
            callOption.apply(this, arguments);
        } else {
            initElements.call(this, options);
        }
        return this;
    };
})(window.jQuery || window.Zepto);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.4
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function setup() {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function teardown() {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function mousewheel(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function unmousewheel(fn) {
            return this.unbind('mousewheel', fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta;
        }
        if (orgEvent.detail) {
            delta = orgEvent.detail * -1;
        }

        // At a minimum, setup the deltaY to be delta
        deltaY = delta;

        // Firefox < 17 related to DOMMouseScroll event
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = delta * -1;
        }

        // New school wheel delta (wheel event)
        if (orgEvent.deltaY) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if (orgEvent.deltaX) {
            deltaX = orgEvent.deltaX;
            delta = deltaX * -1;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
        }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
            lowestDeltaXY = absDeltaXY;
        }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
});
"use strict";

/*
 * jQuery SmoothDivScroll 1.3
 *
 * Copyright (c) 2013 Thomas Kahn
 * Licensed under the GPL license.
 *
 * http://www.smoothdivscroll.com/
 *
 * Depends:
 * jquery-1.10.2.min.js
   Please use https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
   ...or later

 * jquery-ui-1.10.3.custom.min
   Make your own custom download at http://jqueryui.com/download.
   First deselect all components. Then check just "Widget" and "Effects Core".
   Download the file and put it in your javascript folder.

 * jquery.mousewheel.min.js
   Used for mousewheel functionality.
   Download the latest version at https://github.com/brandonaaron/jquery-mousewheel
 *

 * jquery.kinetic.min.js
   Used for scrolling by dragging, mainly used on touch devices.
   Download the latest version at https://github.com/davetayls/jquery.kinetic
 *
 */
(function ($) {

	$.widget("thomaskahn.smoothDivScroll", {
		// Default options
		options: {
			// Classes for elements added by Smooth Div Scroll
			scrollingHotSpotLeftClass: "scrollingHotSpotLeft", // String
			scrollingHotSpotRightClass: "scrollingHotSpotRight", // String
			scrollingHotSpotLeftVisibleClass: "scrollingHotSpotLeftVisible", // String
			scrollingHotSpotRightVisibleClass: "scrollingHotSpotRightVisible", // String
			scrollableAreaClass: "scrollableArea", // String
			scrollWrapperClass: "scrollWrapper", // String

			// Misc settings
			hiddenOnStart: false, // Boolean
			getContentOnLoad: {}, // Object
			countOnlyClass: "", // String
			startAtElementId: "", // String

			// Hotspot scrolling
			hotSpotScrolling: true, // Boolean
			hotSpotScrollingStep: 15, // Pixels
			hotSpotScrollingInterval: 10, // Milliseconds
			hotSpotMouseDownSpeedBooster: 3, // Integer
			visibleHotSpotBackgrounds: "hover", // always, onStart, hover or empty (no visible hotspots)
			hotSpotsVisibleTime: 5000, // Milliseconds
			easingAfterHotSpotScrolling: true, // Boolean
			easingAfterHotSpotScrollingDistance: 10, // Pixels
			easingAfterHotSpotScrollingDuration: 300, // Milliseconds
			easingAfterHotSpotScrollingFunction: "easeOutQuart", // String

			// Mousewheel scrolling
			mousewheelScrolling: "", // vertical, horizontal, allDirections or empty (no mousewheel scrolling) String
			mousewheelScrollingStep: 70, // Pixels
			easingAfterMouseWheelScrolling: true, // Boolean
			easingAfterMouseWheelScrollingDuration: 300, // Milliseconds
			easingAfterMouseWheelScrollingFunction: "easeOutQuart", // String

			// Manual scrolling (hotspot and/or mousewheel scrolling)
			manualContinuousScrolling: false, // Boolean

			// Autoscrolling
			autoScrollingMode: "", // always, onStart or empty (no auto scrolling) String
			autoScrollingDirection: "endlessLoopRight", // right, left, backAndForth, endlessLoopRight, endlessLoopLeft String
			autoScrollingStep: 1, // Pixels
			autoScrollingInterval: 10, // Milliseconds

			// Touch scrolling
			touchScrolling: false,

			// Easing for when the scrollToElement method is used
			scrollToAnimationDuration: 1000, // Milliseconds
			scrollToEasingFunction: "easeOutQuart" // String
		},
		_create: function _create() {
			var self = this,
			    o = this.options,
			    el = this.element;

			// Create variables for any existing or not existing 
			// scroller elements on the page.
			el.data("scrollWrapper", el.find("." + o.scrollWrapperClass));
			el.data("scrollingHotSpotRight", el.find("." + o.scrollingHotSpotRightClass));
			el.data("scrollingHotSpotLeft", el.find("." + o.scrollingHotSpotLeftClass));
			el.data("scrollableArea", el.find("." + o.scrollableAreaClass));

			// Check which elements are already present on the page. 
			// Create any elements needed by the plugin if
			// the user hasn't already created them.

			// First detach any present hot spots
			if (el.data("scrollingHotSpotRight").length > 0) {

				el.data("scrollingHotSpotRight").detach();
			}
			if (el.data("scrollingHotSpotLeft").length > 0) {

				el.data("scrollingHotSpotLeft").detach();
			}

			// Both the scrollable area and the wrapper are missing
			if (el.data("scrollableArea").length === 0 && el.data("scrollWrapper").length === 0) {
				el.wrapInner("<div class='" + o.scrollableAreaClass + "'>").wrapInner("<div class='" + o.scrollWrapperClass + "'>");

				el.data("scrollWrapper", el.find("." + o.scrollWrapperClass));
				el.data("scrollableArea", el.find("." + o.scrollableAreaClass));
			}
			// Only the wrapper is missing
			else if (el.data("scrollWrapper").length === 0) {
					el.wrapInner("<div class='" + o.scrollWrapperClass + "'>");
					el.data("scrollWrapper", el.find("." + o.scrollWrapperClass));
				}
				// Only the scrollable area is missing
				else if (el.data("scrollableArea").length === 0) {
						el.data("scrollWrapper").wrapInner("<div class='" + o.scrollableAreaClass + "'>");
						el.data("scrollableArea", el.find("." + o.scrollableAreaClass));
					}

			// Put the right and left hot spot back into the scroller again
			// or create them if they where not present from the beginning.
			if (el.data("scrollingHotSpotRight").length === 0) {
				el.prepend("<div class='" + o.scrollingHotSpotRightClass + "'></div>");
				el.data("scrollingHotSpotRight", el.find("." + o.scrollingHotSpotRightClass));
			} else {
				el.prepend(el.data("scrollingHotSpotRight"));
			}

			if (el.data("scrollingHotSpotLeft").length === 0) {
				el.prepend("<div class='" + o.scrollingHotSpotLeftClass + "'></div>");
				el.data("scrollingHotSpotLeft", el.find("." + o.scrollingHotSpotLeftClass));
			} else {
				el.prepend(el.data("scrollingHotSpotLeft"));
			}

			// Create variables in the element data storage
			el.data("speedBooster", 1);
			el.data("scrollXPos", 0);
			el.data("hotSpotWidth", el.data("scrollingHotSpotLeft").innerWidth());
			el.data("scrollableAreaWidth", 0);
			el.data("startingPosition", 0);
			el.data("rightScrollingInterval", null);
			el.data("leftScrollingInterval", null);
			el.data("autoScrollingInterval", null);
			el.data("hideHotSpotBackgroundsInterval", null);
			el.data("previousScrollLeft", 0);
			el.data("pingPongDirection", "right");
			el.data("getNextElementWidth", true);
			el.data("swapAt", null);
			el.data("startAtElementHasNotPassed", true);
			el.data("swappedElement", null);
			el.data("originalElements", el.data("scrollableArea").children(o.countOnlyClass));
			el.data("visible", true);
			el.data("enabled", true);
			el.data("scrollableAreaHeight", el.data("scrollableArea").height());
			el.data("scrollerOffset", el.offset());

			/*****************************************
   SET UP EVENTS FOR TOUCH SCROLLING
   *****************************************/
			if (o.touchScrolling && el.data("enabled")) {
				// Use jquery.kinetic.js for touch scrolling
				// Vertical scrolling disabled
				el.data("scrollWrapper").kinetic({
					y: false,
					moved: function moved(settings) {
						if (o.manualContinuousScrolling) {
							if (el.data("scrollWrapper").scrollLeft() <= 0) {
								self._checkContinuousSwapLeft();
							} else {
								self._checkContinuousSwapRight();
							}
						}

						// Callback
						self._trigger("touchMoved");
					},
					stopped: function stopped(settings) {
						// Stop any ongoing animations
						el.data("scrollWrapper").stop(true, false);

						// Stop any ongoing auto scrolling
						self.stopAutoScrolling();

						// Callback
						self._trigger("touchStopped");
					}
				});
			}

			/*****************************************
   SET UP EVENTS FOR SCROLLING RIGHT
   *****************************************/
			// Check the mouse X position and calculate 
			// the relative X position inside the right hotspot
			el.data("scrollingHotSpotRight").bind("mousemove", function (e) {
				if (o.hotSpotScrolling) {
					var x = e.pageX - $(this).offset().left;
					el.data("scrollXPos", Math.round(x / el.data("hotSpotWidth") * o.hotSpotScrollingStep));

					// If the position is less then 1, it's set to 1
					if (el.data("scrollXPos") === Infinity || el.data("scrollXPos") < 1) {
						el.data("scrollXPos", 1);
					}
				}
			});

			// Mouseover right hotspot - scrolling
			el.data("scrollingHotSpotRight").bind("mouseover", function () {
				if (o.hotSpotScrolling) {
					// Stop any ongoing animations
					el.data("scrollWrapper").stop(true, false);

					// Stop any ongoing auto scrolling
					self.stopAutoScrolling();

					// Start the scrolling interval
					el.data("rightScrollingInterval", setInterval(function () {
						if (el.data("scrollXPos") > 0 && el.data("enabled")) {
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + el.data("scrollXPos") * el.data("speedBooster"));

							if (o.manualContinuousScrolling) {
								self._checkContinuousSwapRight();
							}

							self._showHideHotSpots();
						}
					}, o.hotSpotScrollingInterval));

					// Callback
					self._trigger("mouseOverRightHotSpot");
				}
			});

			// Mouseout right hotspot - stop scrolling
			el.data("scrollingHotSpotRight").bind("mouseout", function () {
				if (o.hotSpotScrolling) {
					clearInterval(el.data("rightScrollingInterval"));
					el.data("scrollXPos", 0);

					// Easing out after scrolling
					if (o.easingAfterHotSpotScrolling && el.data("enabled")) {
						el.data("scrollWrapper").animate({ scrollLeft: el.data("scrollWrapper").scrollLeft() + o.easingAfterHotSpotScrollingDistance }, { duration: o.easingAfterHotSpotScrollingDuration, easing: o.easingAfterHotSpotScrollingFunction });
					}
				}
			});

			// mousedown right hotspot (add scrolling speed booster)
			el.data("scrollingHotSpotRight").bind("mousedown", function () {
				el.data("speedBooster", o.hotSpotMouseDownSpeedBooster);
			});

			// mouseup anywhere (stop boosting the scrolling speed)
			$("body").bind("mouseup", function () {
				el.data("speedBooster", 1);
			});

			/*****************************************
   SET UP EVENTS FOR SCROLLING LEFT
   *****************************************/
			// Check the mouse X position and calculate
			// the relative X position inside the left hotspot
			el.data("scrollingHotSpotLeft").bind("mousemove", function (e) {
				if (o.hotSpotScrolling) {
					var x = el.data("hotSpotWidth") - (e.pageX - $(this).offset().left);

					el.data("scrollXPos", Math.round(x / el.data("hotSpotWidth") * o.hotSpotScrollingStep));

					// If the position is less then 1, it's set to 1
					if (el.data("scrollXPos") === Infinity || el.data("scrollXPos") < 1) {
						el.data("scrollXPos", 1);
					}
				}
			});

			// Mouseover left hotspot
			el.data("scrollingHotSpotLeft").bind("mouseover", function () {
				if (o.hotSpotScrolling) {
					// Stop any ongoing animations
					el.data("scrollWrapper").stop(true, false);

					// Stop any ongoing auto scrolling
					self.stopAutoScrolling();

					el.data("leftScrollingInterval", setInterval(function () {
						if (el.data("scrollXPos") > 0 && el.data("enabled")) {
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - el.data("scrollXPos") * el.data("speedBooster"));

							if (o.manualContinuousScrolling) {
								self._checkContinuousSwapLeft();
							}

							self._showHideHotSpots();
						}
					}, o.hotSpotScrollingInterval));

					// Callback
					self._trigger("mouseOverLeftHotSpot");
				}
			});

			// mouseout left hotspot
			el.data("scrollingHotSpotLeft").bind("mouseout", function () {
				if (o.hotSpotScrolling) {
					clearInterval(el.data("leftScrollingInterval"));
					el.data("scrollXPos", 0);

					// Easing out after scrolling
					if (o.easingAfterHotSpotScrolling && el.data("enabled")) {
						el.data("scrollWrapper").animate({ scrollLeft: el.data("scrollWrapper").scrollLeft() - o.easingAfterHotSpotScrollingDistance }, { duration: o.easingAfterHotSpotScrollingDuration, easing: o.easingAfterHotSpotScrollingFunction });
					}
				}
			});

			// mousedown left hotspot (add scrolling speed booster)
			el.data("scrollingHotSpotLeft").bind("mousedown", function () {
				el.data("speedBooster", o.hotSpotMouseDownSpeedBooster);
			});

			/*****************************************
   SET UP EVENT FOR MOUSEWHEEL SCROLLING
   *****************************************/
			el.data("scrollableArea").mousewheel(function (event, delta, deltaX, deltaY) {

				if (el.data("enabled") && o.mousewheelScrolling.length > 0) {
					var pixels;

					// Can be either positive or negative
					// Is multiplied/inverted by minus one since you want it to scroll 
					// left when moving the wheel down/right and right when moving the wheel up/left
					if (o.mousewheelScrolling === "vertical" && deltaY !== 0) {
						// Stop any ongoing auto scrolling if it's running
						self.stopAutoScrolling();
						event.preventDefault();
						pixels = Math.round(o.mousewheelScrollingStep * deltaY * -1);
						self.move(pixels);
					} else if (o.mousewheelScrolling === "horizontal" && deltaX !== 0) {
						// Stop any ongoing auto scrolling if it's running
						self.stopAutoScrolling();
						event.preventDefault();
						pixels = Math.round(o.mousewheelScrollingStep * deltaX * -1);
						self.move(pixels);
					} else if (o.mousewheelScrolling === "allDirections") {
						// Stop any ongoing auto scrolling if it's running
						self.stopAutoScrolling();
						event.preventDefault();
						pixels = Math.round(o.mousewheelScrollingStep * delta * -1);
						self.move(pixels);
					}
				}
			});

			// Capture and disable mousewheel events when the pointer
			// is over any of the hotspots
			if (o.mousewheelScrolling) {
				el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).mousewheel(function (event) {
					event.preventDefault();
				});
			}

			/*****************************************
   SET UP EVENT FOR RESIZING THE BROWSER WINDOW
   *****************************************/
			$(window).bind("resize", function () {
				self._showHideHotSpots();
				self._trigger("windowResized");
			});

			/*****************************************
   FETCHING CONTENT ON INITIALIZATION
   *****************************************/
			// If getContentOnLoad is present in the options, 
			// sort out the method and parameters and get the content

			if (!jQuery.isEmptyObject(o.getContentOnLoad)) {
				self[o.getContentOnLoad.method](o.getContentOnLoad.content, o.getContentOnLoad.manipulationMethod, o.getContentOnLoad.addWhere, o.getContentOnLoad.filterTag);
			}

			// Should it be hidden on start?
			if (o.hiddenOnStart) {
				self.hide();
			}

			/*****************************************
   AUTOSCROLLING
   *****************************************/
			// The $(window).load event handler is used because the width of the elements are not calculated
			// properly until then, at least not in Google Chrome. The start of the auto scrolling and the
			// setting of the hotspot backgrounds is started here as well for the same reason. 
			// If the auto scrolling is not started in $(window).load, it won't start because it 
			// will interpret the scrollable areas as too short.
			$(window).load(function () {

				// If scroller is not hidden, recalculate the scrollable area
				if (!o.hiddenOnStart) {
					self.recalculateScrollableArea();
				}

				// Autoscrolling is active
				if (o.autoScrollingMode.length > 0 && !o.hiddenOnStart) {
					self.startAutoScrolling();
				}

				// If the user wants to have visible hotspot backgrounds, 
				// here is where it's taken care of
				if (o.autoScrollingMode !== "always") {

					switch (o.visibleHotSpotBackgrounds) {
						case "always":
							self.showHotSpotBackgrounds();
							break;
						case "onStart":
							self.showHotSpotBackgrounds();
							el.data("hideHotSpotBackgroundsInterval", setTimeout(function () {
								self.hideHotSpotBackgrounds(250);
							}, o.hotSpotsVisibleTime));
							break;
						case "hover":
							el.mouseenter(function (event) {
								if (o.hotSpotScrolling) {
									event.stopPropagation();
									self.showHotSpotBackgrounds(250);
								}
							}).mouseleave(function (event) {
								if (o.hotSpotScrolling) {
									event.stopPropagation();
									self.hideHotSpotBackgrounds(250);
								}
							});
							break;
						default:
							break;
					}
				}

				self._showHideHotSpots();

				self._trigger("setupComplete");
			});
		},
		/**********************************************************
  _init 
  **********************************************************/
		// When the contents of the scrollable area is changed outside the widget,
		// the widget must be reinitilaized.
		// This code is run every time the widget is called without arguments
		_init: function _init() {
			var self = this,
			    el = this.element;

			// Recalculate the total width of the elements inside the scrollable area
			self.recalculateScrollableArea();

			// Determine which hotspots to show
			self._showHideHotSpots();

			// Trigger callback
			self._trigger("initializationComplete");
		},
		/**********************************************************
  Override _setOption and handle altered options
  **********************************************************/
		_setOption: function _setOption(key, value) {
			var self = this,
			    o = this.options,
			    el = this.element;

			// Update option
			o[key] = value;

			if (key === "hotSpotScrolling") {
				// Handler if the option hotSpotScrolling is altered
				if (value === true) {
					self._showHideHotSpots();
				} else {
					el.data("scrollingHotSpotLeft").hide();
					el.data("scrollingHotSpotRight").hide();
				}
			} else if (key === "autoScrollingStep" ||
			// Make sure that certain values are integers, otherwise
			// they will summon bad spirits in the plugin
			key === "easingAfterHotSpotScrollingDistance" || key === "easingAfterHotSpotScrollingDuration" || key === "easingAfterMouseWheelScrollingDuration") {
				o[key] = parseInt(value, 10);
			} else if (key === "autoScrollingInterval") {
				// Handler if the autoScrollingInterval is altered
				o[key] = parseInt(value, 10);
				self.startAutoScrolling();
			}
		},
		/**********************************************************
  Hotspot functions
  **********************************************************/
		showHotSpotBackgrounds: function showHotSpotBackgrounds(fadeSpeed) {

			// Alter the CSS (SmoothDivScroll.css) if you want to customize
			// the look'n'feel of the visible hotspots
			var self = this,
			    el = this.element,
			    o = this.options;

			// Fade in the hotspot backgrounds
			if (fadeSpeed !== undefined) {
				// Before the fade-in starts, we need to make sure the opacity is zero
				//el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).css("opacity", "0.0");

				el.data("scrollingHotSpotLeft").addClass(o.scrollingHotSpotLeftVisibleClass);
				el.data("scrollingHotSpotRight").addClass(o.scrollingHotSpotRightVisibleClass);

				// Fade in the hotspots
				el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).fadeTo(fadeSpeed, 0.35);
			}
			// Don't fade, just show them
			else {

					// The left hotspot
					el.data("scrollingHotSpotLeft").addClass(o.scrollingHotSpotLeftVisibleClass);
					el.data("scrollingHotSpotLeft").removeAttr("style");

					// The right hotspot
					el.data("scrollingHotSpotRight").addClass(o.scrollingHotSpotRightVisibleClass);
					el.data("scrollingHotSpotRight").removeAttr("style");
				}

			self._showHideHotSpots();
		},
		hideHotSpotBackgrounds: function hideHotSpotBackgrounds(fadeSpeed) {
			var el = this.element,
			    o = this.options;

			// Fade out the hotspot backgrounds
			if (fadeSpeed !== undefined) {

				// Fade out the left hotspot
				el.data("scrollingHotSpotLeft").fadeTo(fadeSpeed, 0.0, function () {
					el.data("scrollingHotSpotLeft").removeClass(o.scrollingHotSpotLeftVisibleClass);
				});

				// Fade out the right hotspot
				el.data("scrollingHotSpotRight").fadeTo(fadeSpeed, 0.0, function () {
					el.data("scrollingHotSpotRight").removeClass(o.scrollingHotSpotRightVisibleClass);
				});
			}
			// Don't fade, just hide them
			else {
					el.data("scrollingHotSpotLeft").removeClass(o.scrollingHotSpotLeftVisibleClass).removeAttr("style");
					el.data("scrollingHotSpotRight").removeClass(o.scrollingHotSpotRightVisibleClass).removeAttr("style");
				}
		},
		// Function for showing and hiding hotspots depending on the
		// offset of the scrolling
		_showHideHotSpots: function _showHideHotSpots() {
			var self = this,
			    el = this.element,
			    o = this.options;

			// Hot spot scrolling is not enabled so show no hot spots
			if (!o.hotSpotScrolling) {
				el.data("scrollingHotSpotLeft").hide();
				el.data("scrollingHotSpotRight").hide();
			} else {

				// If the manual continuous scrolling option is set show both
				if (o.hotSpotScrolling && o.autoScrollingMode !== "always" && el.data("autoScrollingInterval") !== null) {
					el.data("scrollingHotSpotLeft").show();
					el.data("scrollingHotSpotRight").show();
				}
				// Autoscrolling not set to always and hotspot scrolling enabled.
				// Regular hot spot scrolling.
				else if (o.autoScrollingMode !== "always" && o.hotSpotScrolling) {
						// If the scrollable area is shorter than the scroll wrapper, both hotspots
						// should be hidden
						if (el.data("scrollableAreaWidth") <= el.data("scrollWrapper").innerWidth()) {
							el.data("scrollingHotSpotLeft").hide();
							el.data("scrollingHotSpotRight").hide();
						}
						// When you can't scroll further left the left scroll hotspot should be hidden
						// and the right hotspot visible.
						else if (el.data("scrollWrapper").scrollLeft() === 0) {
								el.data("scrollingHotSpotLeft").hide();
								el.data("scrollingHotSpotRight").show();
								// Callback
								self._trigger("scrollerLeftLimitReached");
								// Clear interval
								clearInterval(el.data("leftScrollingInterval"));
								el.data("leftScrollingInterval", null);
							}
							// When you can't scroll further right
							// the right scroll hotspot should be hidden
							// and the left hotspot visible
							else if (el.data("scrollableAreaWidth") <= el.data("scrollWrapper").innerWidth() + el.data("scrollWrapper").scrollLeft()) {
									el.data("scrollingHotSpotLeft").show();
									el.data("scrollingHotSpotRight").hide();
									// Callback
									self._trigger("scrollerRightLimitReached");
									// Clear interval
									clearInterval(el.data("rightScrollingInterval"));
									el.data("rightScrollingInterval", null);
								}
								// If you are somewhere in the middle of your
								// scrolling, both hotspots should be visible
								else {
										el.data("scrollingHotSpotLeft").show();
										el.data("scrollingHotSpotRight").show();
									}
					}
					// If auto scrolling is set to always, there should be no hotspots
					else {
							el.data("scrollingHotSpotLeft").hide();
							el.data("scrollingHotSpotRight").hide();
						}
			}
		},
		// Function for calculating the scroll position of a certain element
		_setElementScrollPosition: function _setElementScrollPosition(method, element) {
			var el = this.element,
			    o = this.options,
			    tempScrollPosition = 0;

			switch (method) {
				case "first":
					el.data("scrollXPos", 0);
					return true;
				case "start":
					// Check to see if there is a specified start element in the options 
					// and that the element exists in the DOM
					if (o.startAtElementId !== "") {
						if (el.data("scrollableArea").has("#" + o.startAtElementId)) {
							tempScrollPosition = $("#" + o.startAtElementId).position().left;
							el.data("scrollXPos", tempScrollPosition);
							return true;
						}
					}
					return false;
				case "last":
					el.data("scrollXPos", el.data("scrollableAreaWidth") - el.data("scrollWrapper").innerWidth());
					return true;
				case "number":
					// Check to see that an element number is passed
					if (!isNaN(element)) {
						tempScrollPosition = el.data("scrollableArea").children(o.countOnlyClass).eq(element - 1).position().left;
						el.data("scrollXPos", tempScrollPosition);
						return true;
					}
					return false;
				case "id":
					// Check that an element id is passed and that the element exists in the DOM
					if (element.length > 0) {
						if (el.data("scrollableArea").has("#" + element)) {
							tempScrollPosition = $("#" + element).position().left;
							el.data("scrollXPos", tempScrollPosition);
							return true;
						}
					}
					return false;
				default:
					return false;
			}
		},
		/**********************************************************
  Jumping to a certain element
  **********************************************************/
		jumpToElement: function jumpToElement(jumpTo, element) {
			var self = this,
			    el = this.element;

			// Check to see that the scroller is enabled
			if (el.data("enabled")) {
				// Get the position of the element to scroll to
				if (self._setElementScrollPosition(jumpTo, element)) {
					// Jump to the element
					el.data("scrollWrapper").scrollLeft(el.data("scrollXPos"));
					// Check the hotspots
					self._showHideHotSpots();
					// Trigger the right callback
					switch (jumpTo) {
						case "first":
							self._trigger("jumpedToFirstElement");
							break;
						case "start":
							self._trigger("jumpedToStartElement");
							break;
						case "last":
							self._trigger("jumpedToLastElement");
							break;
						case "number":
							self._trigger("jumpedToElementNumber", null, { "elementNumber": element });
							break;
						case "id":
							self._trigger("jumpedToElementId", null, { "elementId": element });
							break;
						default:
							break;
					}
				}
			}
		},
		/**********************************************************
  Scrolling to a certain element
  **********************************************************/
		scrollToElement: function scrollToElement(scrollTo, element) {
			var self = this,
			    el = this.element,
			    o = this.options,
			    autoscrollingWasRunning = false;

			if (el.data("enabled")) {
				// Get the position of the element to scroll to
				if (self._setElementScrollPosition(scrollTo, element)) {
					// Stop any ongoing auto scrolling
					if (el.data("autoScrollingInterval") !== null) {
						self.stopAutoScrolling();
						autoscrollingWasRunning = true;
					}

					// Stop any other running animations
					// (clear queue but don't jump to the end)
					el.data("scrollWrapper").stop(true, false);

					// Do the scolling animation
					el.data("scrollWrapper").animate({
						scrollLeft: el.data("scrollXPos")
					}, { duration: o.scrollToAnimationDuration, easing: o.scrollToEasingFunction, complete: function complete() {
							// If auto scrolling was running before, start it again
							if (autoscrollingWasRunning) {
								self.startAutoScrolling();
							}

							self._showHideHotSpots();

							// Trigger the right callback
							switch (scrollTo) {
								case "first":
									self._trigger("scrolledToFirstElement");
									break;
								case "start":
									self._trigger("scrolledToStartElement");
									break;
								case "last":
									self._trigger("scrolledToLastElement");
									break;
								case "number":
									self._trigger("scrolledToElementNumber", null, { "elementNumber": element });
									break;
								case "id":
									self._trigger("scrolledToElementId", null, { "elementId": element });
									break;
								default:
									break;
							}
						}
					});
				}
			}
		},
		move: function move(pixels) {
			var self = this,
			    el = this.element,
			    o = this.options;
			// clear queue, move to end
			el.data("scrollWrapper").stop(true, true);

			// Only run this code if it's possible to scroll left or right,
			if (pixels < 0 && el.data("scrollWrapper").scrollLeft() > 0 || pixels > 0 && el.data("scrollableAreaWidth") > el.data("scrollWrapper").innerWidth() + el.data("scrollWrapper").scrollLeft() || o.manualContinuousScrolling) {

				var scrollLength = el.data("scrollableArea").width() - el.data("scrollWrapper").width();
				var sOffset = el.data("scrollWrapper").scrollLeft() + pixels;

				if (sOffset < 0) {
					// Swap last element to be the first one if scroll out of the left edge of view

					var forceSwapElementLeft = function forceSwapElementLeft() {
						el.data("swappedElement", el.data("scrollableArea").children(":last").detach());
						el.data("scrollableArea").prepend(el.data("swappedElement"));
						el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + el.data("swappedElement").outerWidth(true));
					};

					while (sOffset < 0) {
						// keep swap elements left until it has enough length for scrolling left
						forceSwapElementLeft();
						sOffset = el.data("scrollableArea").children(":first").outerWidth(true) + sOffset;
					}
				} else if (sOffset - scrollLength > 0) {
					// Swap the first element to be the last one if scroll out of the right edge of view

					var forceSwapElementRight = function forceSwapElementRight() {
						el.data("swappedElement", el.data("scrollableArea").children(":first").detach());
						el.data("scrollableArea").append(el.data("swappedElement"));
						var wrapperLeft = el.data("scrollWrapper").scrollLeft();
						el.data("scrollWrapper").scrollLeft(wrapperLeft - el.data("swappedElement").outerWidth(true));
					};

					while (sOffset - scrollLength > 0) {
						// keep swap elements right until it has enough length for scrolling right
						forceSwapElementRight();
						sOffset = sOffset - el.data("scrollableArea").children(":last").outerWidth(true);
					}
				}

				if (o.easingAfterMouseWheelScrolling) {

					el.data("scrollWrapper").animate({ scrollLeft: el.data("scrollWrapper").scrollLeft() + pixels }, { duration: o.easingAfterMouseWheelScrollingDuration, easing: o.easingAfterMouseWheelFunction, complete: function complete() {
							self._showHideHotSpots();
							if (o.manualContinuousScrolling) {
								if (pixels > 0) {
									self._checkContinuousSwapRight();
								} else {
									self._checkContinuousSwapLeft();
								}
							}
						}
					});
				} else {
					el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + pixels);
					self._showHideHotSpots();

					if (o.manualContinuousScrolling) {
						if (pixels > 0) {
							self._checkContinuousSwapRight();
						} else {
							self._checkContinuousSwapLeft();
						}
					}
				}
			}
		},
		/**********************************************************
  Adding or replacing content
  **********************************************************/
		/*  Arguments are:
  content - a valid URL to a Flickr feed - string
  manipulationMethod - addFirst, addLast or replace (default) - string
  */
		getFlickrContent: function getFlickrContent(content, manipulationMethod) {
			var self = this,
			    el = this.element;

			$.getJSON(content, function (data) {
				// small square - size is 75x75
				// thumbnail -> large - size is the longest side
				var flickrImageSizes = [{ size: "small square", pixels: 75, letter: "_s" }, { size: "thumbnail", pixels: 100, letter: "_t" }, { size: "small", pixels: 240, letter: "_m" }, { size: "medium", pixels: 500, letter: "" }, { size: "medium 640", pixels: 640, letter: "_z" }, { size: "large", pixels: 1024, letter: "_b" }];
				var loadedFlickrImages = [];
				var imageIdStringBuffer = [];
				var startingIndex;
				var numberOfFlickrItems = data.items.length;
				var loadedFlickrImagesCounter = 0;

				// Determine a plausible starting value for the
				// image height
				if (el.data("scrollableAreaHeight") <= 75) {
					startingIndex = 0;
				} else if (el.data("scrollableAreaHeight") <= 100) {
					startingIndex = 1;
				} else if (el.data("scrollableAreaHeight") <= 240) {
					startingIndex = 2;
				} else if (el.data("scrollableAreaHeight") <= 500) {
					startingIndex = 3;
				} else if (el.data("scrollableAreaHeight") <= 640) {
					startingIndex = 4;
				} else {
					startingIndex = 5;
				}

				// Put all items from the feed in an array.
				// This is necessary
				$.each(data.items, function (index, item) {
					loadFlickrImage(item, startingIndex);
				});

				function loadFlickrImage(item, sizeIndex) {
					var path = item.media.m;
					var imgSrc = path.replace("_m", flickrImageSizes[sizeIndex].letter);
					var tempImg = $("<img />").attr("src", imgSrc);

					tempImg.load(function () {
						// Is it still smaller? Load next size
						if (this.height < el.data("scrollableAreaHeight")) {
							// Load a bigger image, if possible
							if (sizeIndex + 1 < flickrImageSizes.length) {
								loadFlickrImage(item, sizeIndex + 1);
							} else {
								addImageToLoadedImages(this);
							}
						} else {
							addImageToLoadedImages(this);
						}

						// Finishing stuff to do when all images have been loaded
						if (loadedFlickrImagesCounter === numberOfFlickrItems) {
							switch (manipulationMethod) {
								case "addFirst":
									// Add the loaded content first in the scrollable area
									el.data("scrollableArea").children(":first").before(loadedFlickrImages);
									break;
								case "addLast":
									// Add the loaded content last in the scrollable area
									el.data("scrollableArea").children(":last").after(loadedFlickrImages);
									break;
								default:
									// Replace the content in the scrollable area
									el.data("scrollableArea").html(loadedFlickrImages);
									break;
							}

							// Recalculate the total width of the elements inside the scrollable area
							self.recalculateScrollableArea();

							// Determine which hotspots to show
							self._showHideHotSpots();

							// Trigger callback
							self._trigger("addedFlickrContent", null, { "addedElementIds": imageIdStringBuffer });
						}
					});
				}

				// Add the loaded content first or last in the scrollable area
				function addImageToLoadedImages(imageObj) {
					// Calculate the scaled width
					var widthScalingFactor = el.data("scrollableAreaHeight") / imageObj.height;
					var tempWidth = Math.round(imageObj.width * widthScalingFactor);
					// Set an id for the image - the filename is used as an id
					var tempIdArr = $(imageObj).attr("src").split("/");
					var lastElemIndex = tempIdArr.length - 1;
					tempIdArr = tempIdArr[lastElemIndex].split(".");
					$(imageObj).attr("id", tempIdArr[0]);
					// Set the height of the image to the height of the scrollable area and add the width
					$(imageObj).css({ "height": el.data("scrollableAreaHeight"), "width": tempWidth });
					// Add the id of the image to the array of id's - this
					// is used as a parameter when the callback is triggered
					imageIdStringBuffer.push(tempIdArr[0]);
					// Add the image to the array of loaded images
					loadedFlickrImages.push(imageObj);

					// Increment counter for loaded images
					loadedFlickrImagesCounter++;
				}
			});
		},
		/*  Arguments are:
  content - a valid URL to an AJAX content source - string
  manipulationMethod - addFirst, addLast or replace (default) - string
  filterTag - a jQuery selector that matches the elements from the AJAX content
  source that you want, for example ".myClass" or "#thisDiv" or "div" - string
  */
		getAjaxContent: function getAjaxContent(content, manipulationMethod, filterTag) {
			var self = this,
			    el = this.element;
			$.ajaxSetup({ cache: false });

			$.get(content, function (data) {
				var filteredContent;

				if (filterTag !== undefined) {
					if (filterTag.length > 0) {
						// A bit of a hack since I can't know if the element
						// that the user wants is a direct child of body (= use filter)
						// or other types of elements (= use find)
						filteredContent = $("<div>").html(data).find(filterTag);
					} else {
						filteredContent = content;
					}
				} else {
					filteredContent = data;
				}

				switch (manipulationMethod) {
					case "addFirst":
						// Add the loaded content first in the scrollable area
						el.data("scrollableArea").children(":first").before(filteredContent);
						break;
					case "addLast":
						// Add the loaded content last in the scrollable area
						el.data("scrollableArea").children(":last").after(filteredContent);
						break;
					default:
						// Replace the content in the scrollable area
						el.data("scrollableArea").html(filteredContent);
						break;
				}

				// Recalculate the total width of the elements inside the scrollable area
				self.recalculateScrollableArea();

				// Determine which hotspots to show
				self._showHideHotSpots();

				// Trigger callback
				self._trigger("addedAjaxContent");
			});
		},
		getHtmlContent: function getHtmlContent(content, manipulationMethod, filterTag) {
			var self = this,
			    el = this.element;

			// No AJAX involved at all - just add raw HTML-content
			/* Arguments are:
   content - any raw HTML that you want - string
   manipulationMethod - addFirst, addLast or replace (default) - string
   filterTag - a jQuery selector that matches the elements from the AJAX content
   source that you want, for example ".myClass" or "#thisDiv" or "div" - string
   */
			var filteredContent;
			if (filterTag !== undefined) {
				if (filterTag.length > 0) {
					// A bit of a hack since I can't know if the element
					// that the user wants is a direct child of body (= use filter)
					// or other types of elements (= use find)
					filteredContent = $("<div>").html(content).find(filterTag);
				} else {
					filteredContent = content;
				}
			} else {
				filteredContent = content;
			}

			switch (manipulationMethod) {
				case "addFirst":
					// Add the loaded content first in the scrollable area
					el.data("scrollableArea").children(":first").before(filteredContent);
					break;
				case "addLast":
					// Add the loaded content last in the scrollable area
					el.data("scrollableArea").children(":last").after(filteredContent);
					break;
				default:
					// Replace the content in the scrollable area
					el.data("scrollableArea").html(filteredContent);
					break;
			}

			// Recalculate the total width of the elements inside the scrollable area
			self.recalculateScrollableArea();

			// Determine which hotspots to show
			self._showHideHotSpots();

			// Trigger callback
			self._trigger("addedHtmlContent");
		},
		/**********************************************************
  Recalculate the scrollable area
  **********************************************************/
		recalculateScrollableArea: function recalculateScrollableArea() {

			var tempScrollableAreaWidth = 0,
			    foundStartAtElement = false,
			    o = this.options,
			    el = this.element;

			// Add up the total width of all the items inside the scrollable area
			el.data("scrollableArea").children(o.countOnlyClass).each(function () {
				// Check to see if the current element in the loop is the one where the scrolling should start
				if (o.startAtElementId.length > 0 && $(this).attr("id") === o.startAtElementId) {
					el.data("startingPosition", tempScrollableAreaWidth);
					foundStartAtElement = true;
				}
				tempScrollableAreaWidth = tempScrollableAreaWidth + $(this).outerWidth(true);
			});

			// If the element with the ID specified by startAtElementId
			// is not found, reset it
			if (!foundStartAtElement) {
				el.data("startAtElementId", "");
			}

			// Set the width of the scrollable area
			el.data("scrollableAreaWidth", tempScrollableAreaWidth);
			el.data("scrollableArea").width(el.data("scrollableAreaWidth"));

			// Move to the starting position
			el.data("scrollWrapper").scrollLeft(el.data("startingPosition"));
			el.data("scrollXPos", el.data("startingPosition"));
		},
		/**********************************************************
  Get current scrolling left offset
  **********************************************************/
		getScrollerOffset: function getScrollerOffset() {
			var el = this.element;

			// Returns the current left offset
			// Please remember that if the scroller is in continuous
			// mode, the offset is not that relevant anymore since
			// the plugin will swap the elements inside the scroller
			// around and manipulate the offset in this process.
			return el.data("scrollWrapper").scrollLeft();
		},
		/**********************************************************
  Stopping, starting and doing the auto scrolling
  **********************************************************/
		stopAutoScrolling: function stopAutoScrolling() {
			var self = this,
			    el = this.element;

			if (el.data("autoScrollingInterval") !== null) {
				clearInterval(el.data("autoScrollingInterval"));
				el.data("autoScrollingInterval", null);

				// Check to see which hotspots should be active
				// in the position where the scroller has stopped
				self._showHideHotSpots();

				self._trigger("autoScrollingStopped");
			}
		},
		/**********************************************************
  Start Autoscrolling
  **********************************************************/
		startAutoScrolling: function startAutoScrolling() {
			var self = this,
			    el = this.element,
			    o = this.options;

			if (el.data("enabled")) {
				self._showHideHotSpots();

				// Stop any running interval
				clearInterval(el.data("autoScrollingInterval"));
				el.data("autoScrollingInterval", null);

				// Callback
				self._trigger("autoScrollingStarted");

				// Start interval
				el.data("autoScrollingInterval", setInterval(function () {

					// If the scroller is not visible or
					// if the scrollable area is shorter than the scroll wrapper
					// any running auto scroll interval should stop.
					if (!el.data("visible") || el.data("scrollableAreaWidth") <= el.data("scrollWrapper").innerWidth()) {
						// Stop any running interval
						clearInterval(el.data("autoScrollingInterval"));
						el.data("autoScrollingInterval", null);
					} else {

						// Store the old scrollLeft value to see if the scrolling has reached the end
						el.data("previousScrollLeft", el.data("scrollWrapper").scrollLeft());

						switch (o.autoScrollingDirection) {
							case "right":

								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollingStep);
								if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
									self._trigger("autoScrollingRightLimitReached");
									self.stopAutoScrolling();
								}
								break;

							case "left":
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollingStep);
								if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
									self._trigger("autoScrollingLeftLimitReached");
									self.stopAutoScrolling();
								}
								break;

							case "backAndForth":
								if (el.data("pingPongDirection") === "right") {
									el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollingStep);
								} else {
									el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollingStep);
								}

								// If the scrollLeft hasnt't changed it means that the scrolling has reached
								// the end and the direction should be switched
								if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
									if (el.data("pingPongDirection") === "right") {
										el.data("pingPongDirection", "left");
										self._trigger("autoScrollingRightLimitReached");
									} else {
										el.data("pingPongDirection", "right");
										self._trigger("autoScrollingLeftLimitReached");
									}
								}
								break;

							case "endlessLoopRight":

								// Do the auto scrolling
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollingStep);

								self._checkContinuousSwapRight();
								break;
							case "endlessLoopLeft":

								// Do the auto scrolling
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollingStep);

								self._checkContinuousSwapLeft();
								break;
							default:
								break;

						}
					}
				}, o.autoScrollingInterval));
			}
		},
		/**********************************************************
  Check Continuos Swap Right
  **********************************************************/
		_checkContinuousSwapRight: function _checkContinuousSwapRight() {
			var el = this.element,
			    o = this.options;

			// Get the width of the first element. When it has scrolled out of view,
			// the element swapping should be executed. A true/false variable is used
			// as a flag variable so the swapAt value doesn't have to be recalculated
			// in each loop.  
			if (el.data("getNextElementWidth")) {

				if (o.startAtElementId.length > 0 && el.data("startAtElementHasNotPassed")) {
					// If the user has set a certain element to start at, set swapAt 
					// to that element width. This happens once.
					el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
					el.data("startAtElementHasNotPassed", false);
				} else {
					// Set swapAt to the first element in the scroller
					el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
				}
				el.data("getNextElementWidth", false);
			}

			// Check to see if the swap should be done
			if (el.data("swapAt") <= el.data("scrollWrapper").scrollLeft()) {
				el.data("swappedElement", el.data("scrollableArea").children(":first").detach());
				el.data("scrollableArea").append(el.data("swappedElement"));
				var wrapperLeft = el.data("scrollWrapper").scrollLeft();
				el.data("scrollWrapper").scrollLeft(wrapperLeft - el.data("swappedElement").outerWidth(true));
				el.data("getNextElementWidth", true);
			}
		},
		/**********************************************************
  Check Continuos Swap Left
  **********************************************************/
		_checkContinuousSwapLeft: function _checkContinuousSwapLeft() {
			var el = this.element,
			    o = this.options;

			// Get the width of the first element. When it has scrolled out of view,
			// the element swapping should be executed. A true/false variable is used
			// as a flag variable so the swapAt value doesn't have to be recalculated
			// in each loop.

			if (el.data("getNextElementWidth")) {
				if (o.startAtElementId.length > 0 && el.data("startAtElementHasNotPassed")) {
					el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
					el.data("startAtElementHasNotPassed", false);
				} else {
					el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
				}

				el.data("getNextElementWidth", false);
			}

			// Check to see if the swap should be done
			if (el.data("scrollWrapper").scrollLeft() === 0) {

				el.data("swappedElement", el.data("scrollableArea").children(":last").detach());
				el.data("scrollableArea").prepend(el.data("swappedElement"));
				el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + el.data("swappedElement").outerWidth(true));
				el.data("getNextElementWidth", true);
			}
		},
		restoreOriginalElements: function restoreOriginalElements() {
			var self = this,
			    el = this.element;

			// Restore the original content of the scrollable area
			el.data("scrollableArea").html(el.data("originalElements"));
			self.recalculateScrollableArea();
			self.jumpToElement("first");
		},
		show: function show() {
			var el = this.element;
			el.data("visible", true);
			el.show();
		},
		hide: function hide() {
			var el = this.element;
			el.data("visible", false);
			el.hide();
		},
		enable: function enable() {
			var el = this.element;

			// Enable touch scrolling
			if (this.options.touchScrolling) {
				el.data("scrollWrapper").kinetic('attach');
			}

			// Set enabled to true
			el.data("enabled", true);
		},
		disable: function disable() {
			var self = this,
			    el = this.element;

			// Clear all running intervals
			self.stopAutoScrolling();
			clearInterval(el.data("rightScrollingInterval"));
			clearInterval(el.data("leftScrollingInterval"));
			clearInterval(el.data("hideHotSpotBackgroundsInterval"));

			// Disable touch scrolling
			if (this.options.touchScrolling) {
				el.data("scrollWrapper").kinetic('detach');
			}

			// Set enabled to false
			el.data("enabled", false);
		},
		destroy: function destroy() {
			var self = this,
			    el = this.element;

			// Clear all running intervals
			self.stopAutoScrolling();
			clearInterval(el.data("rightScrollingInterval"));
			clearInterval(el.data("leftScrollingInterval"));
			clearInterval(el.data("hideHotSpotBackgroundsInterval"));

			// Remove all element specific events
			el.data("scrollingHotSpotRight").unbind("mouseover");
			el.data("scrollingHotSpotRight").unbind("mouseout");
			el.data("scrollingHotSpotRight").unbind("mousedown");

			el.data("scrollingHotSpotLeft").unbind("mouseover");
			el.data("scrollingHotSpotLeft").unbind("mouseout");
			el.data("scrollingHotSpotLeft").unbind("mousedown");

			el.unbind("mousenter");
			el.unbind("mouseleave");

			// Remove all elements created by the plugin
			el.data("scrollingHotSpotRight").remove();
			el.data("scrollingHotSpotLeft").remove();
			el.data("scrollableArea").remove();
			el.data("scrollWrapper").remove();

			// Restore the original content of the scrollable area
			el.html(el.data("originalElements"));

			// Call the base destroy function
			$.Widget.prototype.destroy.apply(this, arguments);
		}

	});
})(jQuery);
'use strict';

angular.module('gibson').controller('mainCTRL', function ($scope, mainSRV) {
    // $scope.test = "CTRL works";


    var getProducts = function getProducts() {
        var promise = mainSRV.getProducts;
        //       console.log('promise' + promise);
        promise.then(function (response) {
            $scope.products = response.data;
            console.log($scope.products);
        });
    };
    getProducts();
});
'use strict';

angular.module('gibson').service('mainSRV', function ($http) {
    var baseURL = 'http://localhost:8080/guitars';

    this.getProducts = $http.get(baseURL);
    this.getProductbyId = function (id) {
        return $http.get(baseURL + '/' + id);
    };
});
"use strict";
"use strict";