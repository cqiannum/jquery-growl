/*! jQuery Growl - v0.1.0 - 2013-07-23
* https://github.com/amazingSurge/jquery-growl
* Copyright (c) 2013 joeylin; Licensed MIT */
(function(window, document, $, undefined) {
   
    var Growl = $.growl = function(element, options) {

        this.element = element;
        this.$element = $(element);

        this.options = $.extend({}, Growl.defaults, options); 
        this.namespace = this.options.namespace;

        // flag
        this.enable = true;

        // number of message
        this.count = 0;

        // cache message 
        this.cache = [];

        // template
        this.template = this.options.template;

        // template parse function
        if ($.isFunction(this.options.parse)) {
            this.parse = this.options.parse;
        } else {
            this.parse = null;
        }

        // initial
        this.init();
    };

    Growl.prototype = {
        constructor: Growl,
        init: function() {
            var position = {
                position: 'fixed'
            };

            $.extend(position, this.options.position);

            this.$element.addClass(this.namespace + '-wrap');
            this.$element.css(position);
            this.$element.appendTo($('body'));
        },

        /*
            Public Method
         */

        add: function(data, type) {
            var $message,
                timer,
                self = this;

            if (this.enabled === false) {
                return;
            }

            if (this.parse) {
                $message = this.parse(data, this.template);
            } else {
                $message = $(data);
            }

            if (this.count >= this.options.count) {
                this.cache.push(data);
                return false;
            }

            if (type) {
                $message.addClass(this.namespace + '-' + type);
            }

            // bound close button
            $message.find('.' + this.namespace +'-close').on('click', function() {
                self.remove($message);
            });

            // auto close message
            if (this.options.autoClose === true) {

                timer = setTimeout(function() {
                    self.remove($message);
                }, this.options.delay);

                $message.on('mouseenter', function() {
                    clearTimeout(timer);
                });
                $message.on('mouseleave', function() {
                    timer = setTimeout(function() {
                        self.remove($message);
                    }, self.options.delay);
                });
            }

            // count the num of message
            this.count++;

            // add message to wrap
            if (this.options.append === true) {
                $message.css({display: 'none'}).appendTo(this.$element);
            } else {
                $message.css({display: 'none'}).prependTo(this.$element);
            }
            
            
            // transitions
            this.effects[this.options.effect].open.call(this, $message);
        },
        remove: function($message) {
            var dtd = $.Deferred(),
                self = this;

            self.count--;

            // transitions
            // a deferred object, alse need return a deferred objec
            function close(dtd) {
                self.effects[self.options.effect].close.call(self, $message, dtd);
                return dtd;
            }

            $.when(close(dtd)).done(function() {
                if (self.count < 0) {
                    self.count = 0;
                }
                $message.remove();

                //if there are message, show it;
                if (self.cache.length !== 0) {
                    var data = self.cache.shift();
                    self.add(data);
                }
            });           
        },
        enable: function() {
            this.enabled = true;
            this.$element.addClass(this.namespace + 'enabled');
            return this;
        },
        disable: function() {
            this.enabled = false;
            this.$element.removeClass(this.namespace + 'enabled');
            return this;
        }
    };

    // transition effects
    Growl.prototype.effects = {
        insertIn: {
            open: function($element) {
                $element.css({
                    position: 'relative',
                    top: 0,
                    left: '-100%',

                    display: 'block'
                });

                console.log(this);

                $element.animate({left: 0},{
                    duration: this.options.duration,
                    complete: function() {
                        // some stuff
                    }
                });
            },
            close: function($element, dtd) {
                $element.css({
                    display: 'none'
                });

                dtd.resolve();
            }
        },
        fade: {
            open: function($element) {
                if (this.$element.children().length > 0) {
                    this.$element.addClass(this.namespace + '-slide');
                }

                $element.css({
                    opacity: 0,
                    display: 'block'
                });

                console.log(this);

                $element.animate({opacity: 1}, {
                    duration: this.options.duration,
                    complete: function(){}
                });
            },
            close: function($element, dtd) {
                var self = this;
                $element.animate({opacity: 0}, {
                    duration: this.options.duration,
                    complete: function() {
                        $element.css({
                            display: 'none'
                        });

                        console.log('close')

                        if (self.$element.children().length === 0) {
                            self.$element.removeClass(self.namespace + '-slide');
                        }

                        dtd.resolve();
                    }
                });
            }
        }
    };

    Growl.defaults = {
        namespace: 'growl',
        skin: 'simple',
        effect: 'insertIn',

        count: 5,  // the max num of message showed in the wrap
        autoClose: false,  // meassage can auto close after some seconds
        delay: 3000, // set waiting time
        duration: 600, // set animate time

        append: false, // set the direction to add the message

        position: {
            bottom: 0,
            left: 50
        },

        parse: function(data, tpl) {
            var $tpl = $(tpl);

            $tpl.find('.msgBox-icon img').attr('src', data.src);
            $tpl.find('.msgBox-content').text(data.content);

            return $tpl;
        },
        template: '<div class="msgBox"><a href="#" class="msgBox-icon"><img src="" /></a><div class="msgBox-content"></div><span class="growl-close">close</span></div>'
    };

    $.fn.growl = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'growl');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            var opts = options || {};
            opts.$group = this;
            return this.each(function() {
                if (!$.data(this, 'growl')) {
                    $.data(this, 'growl', new Growl(this, opts));
                }
            });
        }
    };

}(window, document, jQuery));
