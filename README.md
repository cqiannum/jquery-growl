# jQuery Growl

The powerful jQuery plugin that creates a message pop up. <a href="http://amazingsurge.github.io/jquery-growl/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-growl/archive/master.zip">jquery-growl-master.zip</a>

***

## Features

* **different positions** — growl provides 2 position for message box to display
* **Lightweight size** — 1 kb gzipped

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>


## Usage

Import this libraries:
* jQuery
* jquery-growl.min.js

And CSS:
* growl.css - desirable if you have not yet connected one


Create base html element:
```html
<div id="wrap">
    <div id="inner"></div>
    <div class="show-list">
        <ul class="menu">
            <li class="add">add new message</li>
            <li class="top">position-top</li>
            <li class="success">success type</li>
            <li>count</li>
        </ul>
    </div>
    <div class="msg-box"></div>
    <div class="msg-top"></div>
</div>
```

Initialize growl:
```javascript
var growl = new $.growl($('.msg-box'));
        growl.add({
            src: 'img/avator.jpg',
            content: 'this is my info this is my info this is my info this is my info'
        });
```

you can add events like this for an element

```javascript
$('.add').on('click', function() {
        growl.add({
            src: 'img/avator.jpg',
            content: 'this is my info this is my info this is my info this is my info'
        });
     });

```

Or initialize growl with custom settings:
```javascript
var growl = new $.growl($('.msg-box'), {
        namespace: 'growl',
        skin: 'simple',
        effect: 'insertIn',
        count: 5,            // the max num of message showed in the wrap
        autoClose: false,    // meassage can auto close after some seconds
        delay: 3000,         // set waiting time
        duration: 600,       // set animate time
        append: false,       // set the direction to add the message
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
        template: '<div class="msgBox">
						<a href="#" class="msgBox-icon"><img src="" /></a>
						<div class="msgBox-content"></div>
						<span class="growl-close">close</span>
				   </div>'
});
```

the most important thing is you should set the parameters for <code>add()</code> to let plugin find his images and contents



## Settings

```javascript
{   
    // Optional property, Set a namespace for css class
    namespace: 'namespace',

    // Optional property, Optional property, set transition effect, 
    //it works after you load specified skin file
    skin: simple, 

    // Optional property, change the way of the message box pop-up
    effect: 'insertIn', // fade

    // Optional property,  the max num of message showed in the wrap
    count: 5,

     // Optional property,if true, message can auto close after some
     // seconds  
    autoClose: false,

    // Optional property, set the waiting time
    delay: 3000,

    // Optional property, set the animate time
    duration: 600,

    // Optional property, set the direction to add the message 
    append: false, 

    // Optional property, set the position of message box
    position: {
		bottom: 0,
		left: 50
    },

    // Optional property, a function, set the message box imgaes and 
	//content
    parse: function(data, tpl) {
        var $tpl = $(tpl);
        $tpl.find('.msgBox-icon img').attr('src', data.src);
        $tpl.find('.msgBox-content').text(data.content);
        return $tpl;
    },

    // Optional property,  the template of message box
    template: '<div class="msgBox">
					<a href="#" class="msgBox-icon"><img src="" /></a>
					<div class="msgBox-content"></div>
					<span class="growl-close">close</span>
			   </div>'
    }
}
```

## Public methods

jquery tabs has different methods , we can use it as below :
```javascript

// add a message box
var growl = new $.growl($('.msg-box'));
	growl("add");

// remove a message box
var growl = new $.growl($('.msg-box'));
	growl("remove");

// add a disable class to message box
var growl = new $.growl($('.msg-box'));
	growl("enable");

// remove the disable class
var growl = new $.growl($('.msg-box'));
	growl("disable");

```

## Event / Callback


## Browser support
jquery-growl is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|     ... | ...                                                              |



## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-growl plugin is released under the <a href="https://github.com/amazingSurge/jquery-growl/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.
