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
        selector: '[data-visibility]',
        htmlClass: [ pluginName ],
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
            this.selectors = document.querySelectorAll( this.options.selector )
            // execute code if selectors are found, otherwise rollback and destroy instance
            !!this.selectors.length ? this.render() : this.destroy()
        }, // #! init
        destroy: function() {
            // Remove any event listeners and undo any "init" actions here...
            // when destory is called w/o ever calling the render method
            if ( !this.selectors.length ) {
                console.log( pluginName + ' could not find any matching elements' );
            }
            // when destroy is called after already being initialized and rendered
            if ( !!this.selectors.length ) {
                for ( var i = 0; i < this.selectors.length; i++ ) {
                    var selector = this.selectors[ i ]
                    // Do something w/ each matched selector node.
                    selector.classList.remove( this.options.classToAdd )
                    // do other stuff to each matched node...
                }
                // Remove class from HTML element to activate conditional CSS
                document.documentElement.classList.remove( this.options.htmlClass );
                console.log( pluginName + " Destroyed Successfully" )
            }
        },

        render: function() {
            console.log( "Initialized Successfully" )
            // Add class to HTML element to activate conditional CSS
            document.documentElement.classList.add( this.options.htmlClass );

            for ( var i = 0; i < this.selectors.length; i++ ) {
                var selector = this.selectors[ i ]
                // Do something w/ each matched selector node.
                selector.classList.add( this.options.classToAdd )
                // do other stuff to each matched node...
            }
        }, // #! render

        doSomething: function( statement ) {
                console.log( statement )
            } // #! doSomething
    };
    return Plugin;
} ) );

/**************
    EXAMPLE:
**************/
//// create new Plugin instance
// var pluginInstance = new PluginNameHere({
//     selector: ".box-1",
//     someDefaultOption: 'foo2',
//     classToAdd: "custom-new-class-name",
// })

//// access public plugin methods
// pluginInstance.doSomething("Doing Something Else")