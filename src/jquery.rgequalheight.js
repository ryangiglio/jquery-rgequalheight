/*
 * jQuery RG-EqualHeight v1.0
 * GitHub: https://github.com/ryangiglio/jquery-rgequalheight
 * Copyright (c) 2015 Ryan Giglio (@ryangiglio)
 *
 * Based on johndugan's jQuery Plugin Boilerplate https://github.com/johndugan/jquery-plugin-boilerplate
 * Which is based on Zeno Rocha's jQuery Plugin Boilerplate https://github.com/jquery-boilerplate/jquery-boilerplate
 */

;(function ( $, window, document, undefined ) {

  var pluginName = 'rgequalheight';

  function Plugin ( element, options ) {
    this.element = element;
    this._name = pluginName;
    this._defaults = $.fn.rgequalheight.defaults;

    this.options = $.extend( {}, this._defaults, options );

    this.init();
  }

  $.extend(Plugin.prototype, {

    init: function () {
      this.buildCache();

      // Equalize heights depending on window size
      this.windowResizeHandler();

      // If the plugin should be responsive
      if ( this.options.responsive ) { 
        // Bind events that re-trigger the resize on window resize
        this.bindEvents();

        // var to store the setTimeout ID used to throttle window resize events
        this.windowResizeTriggerTimeout = null;
      }

      // Call the callback
      this.callback();
    },

    // Remove plugin instance completely
    destroy: function() {
      this.unbindEvents();

      // Remove all plugin data from the element
      this.$element.removeData();

      // Unset the fixed height
      this.unsetHeight();
    },

    buildCache: function () {
      this.$element = $(this.element);
    },

    bindEvents: function() {
      // Create plugin as a variable so we can use it inside the event handler
      var plugin = this;
      
      // On window resize
      $(window).on('resize'+'.'+plugin._name, function() {
        // Throttle resize events firing
        clearTimeout(plugin.windowResizeTriggerTimeout);

        plugin.windowResizeTriggerTimeout = setTimeout(function() {
          plugin.windowResizeHandler();
        }, plugin.options.windowResizeThrottle);
      });
    },

    // Unbind events that trigger methods
    unbindEvents: function() {
      // Unbind all event handlers on the plugin element
      this.$element.off('.'+this._name);

      // Unbind window resize event
      $(window).off('resize'+'.'+this._name);
    },

    windowResizeHandler: function() {
      // If we have no disable break, or the window is larger than the break
      if ( this.options.minWidthBreakpoint === null || $(window).width() >= this.options.minWidthBreakpoint ) {
        this.equalizeHeight();
      }
      // If the window is smaller than the break 
      else { 
        this.unsetHeight();
      }
    },

    equalizeHeight: function() {
      var maxHeight = 0;

      // Loop over each element
      this.$element.each(function() {
        // Reset the natural height
        $(this).css('height', 'auto');

        // If this element is larger than the previous one
        if ( $(this).outerHeight() > maxHeight ) {
          // Save the height
          maxHeight = $(this).outerHeight();
        }
      });

      // Set the new height
      if ( this.options.useMinHeight ) {
        this.$element.css('min-height', maxHeight);
      }
      else {
        this.$element.css('height', maxHeight);
      }
    },

    unsetHeight: function() {
      if ( this.options.useMinHeight ) {
        this.$element.css('min-height', '');
      }
      else {
        this.$element.css('height', '');
      }
    },

    callback: function() {
      // Cache onComplete option
      var onComplete = this.options.onComplete;

      if ( typeof onComplete === 'function' ) {
        onComplete.call(this.element);
      }
    }

  });

  /*
   * Plugin wrapper to allow for public function calls
   *
   * From the jQuery Plugin Boilerplate Guide:
   * https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
   */
  $.fn.rgequalheight = function ( options ) {
    var args = arguments;

    // Is the first parameter an object (options), or was omitted,
    // instantiate a new instance of the plugin.
    if (options === undefined || typeof options === 'object') {
      // Only allow the plugin to be instantiated once,
      // so we check that the element has no plugin instantiation yet
      if (!$.data(this, 'plugin_' + pluginName)) {

        // if it has no instance, create a new one,
        // pass options to our plugin constructor,
        // and store the plugin instance
        // in the elements jQuery data object.
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }

    // If the first parameter is a string and it doesn't start
    // with an underscore or "contains" the `init`-function,
    // treat this as a call to a public method.
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

      // Cache the method call
      // to make it possible
      // to return a value
      var returns;

      var instance = $.data(this, 'plugin_' + pluginName);

      // Tests that there's already a plugin-instance
      // and checks that the requested public method exists
      if (instance instanceof Plugin && typeof instance[options] === 'function') {

        // Call the method of our plugin instance,
        // and pass it the supplied arguments.
        returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
      }

      // Allow instances to be destroyed via the 'destroy' method
      if (options === 'destroy') {
        $.data(this, 'plugin_' + pluginName, null);
      }

      // If the earlier cached method
      // gives a value back return the value,
      // otherwise return this to preserve chainability.
      return returns !== undefined ? returns : this;
    }
  };

  $.fn.rgequalheight.defaults = {
    // Set as true to set min-height instead of height
    useMinHeight: false,
    // Update heights when the window resizes
    responsive: true,
    // Minimum pixel width to equalize columns at (useful for responsive designs)
    minWidthBreakpoint: null, 
    // ms of throttle to wait between window resize and element resize. This stops the browser from re-calculating every pixel of resize
    windowResizeThrottle: 100,
  };

})( jQuery, window, document );
