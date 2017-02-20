( function( root, factory ) {

    var pluginName = 'PluginNameHere';

    if ( typeof define === 'function' && define.amd ) {
        define( [], factory( pluginName ) );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( pluginName );
    } else {
        root[ pluginName ] = factory( pluginName );
    }
}( this, function( pluginName ) {

    'use strict';

    var defaults = {
        selector: '.yourSelector',
        someDefaultOption: 'foo',
        classToAdd: "new-class-name"
    };
    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function( target, options ) {
        var prop, extended = {};
        for ( prop in defaults ) {
            if ( Object.prototype.hasOwnProperty.call( defaults, prop ) ) {
                extended[ prop ] = defaults[ prop ];
            }
        }
        for ( prop in options ) {
            if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
                extended[ prop ] = options[ prop ];
            }
        }
        return extended;
    };

    /**
     * Helper Functions
     @private
     */
    var privateFunction = function() {
        // Helper function, not directly acessible by instance object
    };

    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    function Plugin( options ) {
        this.options = extend( defaults, options );
        this.init(); // Initialization Code Here
    }

    /**
     * Plugin prototype
     * @public
     * @constructor
     */
    Plugin.prototype = {
        init: function() {
            // find all matching DOM elements.
            // makes `.selectors` object available to instance.
            this.selectors = document.querySelectorAll( this.options.selector )
            for ( var i = 0; i < this.selectors.length; i++ ) {
                var selector = this.selectors[ i ]
                    // Do something w/ each matched selector node.
                selector.classList.add( this.options.classToAdd )
                    // do something
            }
        }, // #! init
        destroy: function() {
            // Remove any event listeners and undo any "init" actions here...
        },
        doSomething: function( someData ) {
                console.log( someData )
            } // #! doSomething
    };
    return Plugin;
} ) );


/**************
    EXAMPLE:
**************/

//// create new Plugin instance
// var pluginInstance = new PluginNameHere({
//     selector: ".box",
//     someDefaultOption: 'foo2',
//     classToAdd: "custom-new-class-name",
// })

//// access public plugin methods
// pluginInstance.doSomething("Doing Something Else")