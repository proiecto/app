// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>

// Dependencies:
// Bootstrap by Twitter >= v3 (optional, if you want to use responsive layouts)
// jQuery library > v1.8
//   -> to use jconfirm without bootstrap set -> useBootstrap: false
  
// Samples:
// $.alert:

  $.alert({
      title: 'Alert!',
      content: 'Simple alert!',
  });
// *******************************
// $.confirm
  $.confirm({
      title: 'Confirm!',
      content: 'Simple confirm!',
      buttons: {
          confirm: function () {
              $.alert('Confirmed!');
          },
          cancel: function () {
              $.alert('Canceled!');
          },
          somethingElse: {
              text: 'Something else',
              btnClass: 'btn-blue',
              keys: ['enter', 'shift'],
              action: function(){
                  $.alert('Something else?');
              }
          }
      }
  });
// *******************************
// Showing prompt using confirm
$.confirm({
    title: 'Prompt!',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Enter something here</label>' +
    '<input type="text" placeholder="Your name" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: function () {
                var name = this.$content.find('.name').val();
                if(!name){
                    $.alert('provide a valid name');
                    return false;
                }
                $.alert('Your name is ' + name);
            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});
// *******************************
// $.dialog
$.dialog({
    title: 'Text content!',
    content: 'Simple modal!',
});

// *******************************
// $.fn.confirm
// This can be used to bind to a element directly 
// If no buttons are defined, the default buttons (okay and cancel) will be added, and default action for okay will be to redirect on the given href. use this.$target to get the clicked element.

// <a class="twitter" data-title="Goto twitter?" href="http://twitter.com/craftpip">Goto twitter</a>
$('a.twitter').confirm({
    content: "...",
});
$('a.twitter').confirm({
    buttons: {
        hey: function(){
            location.href = this.$target.attr('href');
        }
    }
});

// Shorthand usage
// The shorthand thingy takes in two string arguments, first one is the content of the dialog and second the title of the dialog. The second argument is optional.  
  $.alert('Content here', 'Title here'); try me
  $.confirm('A message', 'Title is optional'); try me
  $.dialog('Just to let you know'); try me
// *******************************
// Lazy open: If you want to create a instance of jconfirm and save it for later use.  
  var a = $.confirm({
      lazyOpen: true,
  });
  a.open();
  a.close();
  a.toggle(); // toggle open close.
// =====
// NOTE : The $.confirm(), $.dialog() & $.alert() methods are alias of jconfirm().  All three methods indirectly call the jconfirm base function altering the provided options.
// ADVANCED: this.$body is the body div for jquery-confirm. You can find and alter any element at run time.
// =====
// Buttons:
// You can access the button element via this.$$heyThere for heyThere button in the below snippet. this is to change the button properties at run time.

// Definition
// Buttons can be defined in the following fashion, pretty self explanatory.
$.confirm({
    buttons: {
        hello: function(helloButton){
            // shorthand method to define a button
            // the button key will be used as button name
        },
        hey: function(heyButton){
            // access the button using jquery
            this.$$hello.trigger('click'); // click the 'hello' button
            this.$$hey.prop('disabled', true); // disable the current button using jquery method
                        
            // jconfirm button methods, all methods listed here
            this.buttons.hello.setText('Helloooo'); // setText for 'hello' button
            this.buttons.hey.disable(); // disable with button function provided by jconfirm
            this.buttons.hey.enable(); // enable with button function provided by jconfirm
            // the button's instance is passed as the first argument, for quick access
            heyButton === this.buttons.hey
        },
        heyThere: {
            text: 'Hey there!', // text for button
            btnClass: 'btn-blue', // class for the button
            keys: ['enter', 'a'], // keyboard event for button
            isHidden: false, // initially not hidden
            isDisabled: false, // initially not disabled
            action: function(heyThereButton){
                // longhand method to define a button
                // provides more features
            }
        },
    }
});

// *******************************
// Button text
$.confirm({
    buttons: {
        hey: function () {
            // here the button key 'hey' will be used as the text.
            $.alert('You clicked on "hey".');
        },
        heyThere: {
            text: 'hey there!', // With spaces and symbols
            action: function () {
                $.alert('You clicked on "heyThere"');
            }
        }
    }
});

// *******************************
// Button style
// Simply apply classes to buttons to style them.

// Jconfirm comes bundled with btn-blue btn-green btn-red btn-orange btn-purple btn-default btn-dark 
// These classes only work inside jquery-confirm's modal

// Other bootstrap options are btn-primary btn-inverse btn-warning btn-info btn-danger btn-success.
$.confirm({
    buttons: {
        info: {
            btnClass: 'btn-blue',
            action: function(){}
        },
        danger: {
            btnClass: 'btn-red any-other-class', // multiple classes.
            ...
        },
        warning: {
            btnClass: 'btn-warning',
            ...
        },
    }
});
// *******************************
// Button keys
// A 'key' feature of jquery-confirm! (pun intended) 
// Listen to keyup events for individual buttons. A button can listen for multiple keys at a time. 
// If multiple modals are stacked together, only the topmost modal will listen for keyboard event.

// Available key options are: a to Z, tilde (the ` key), enter, shift, tab, capslock, ctrl, win, alt, esc, space.

$.confirm({
    content: 'Time to use your keyboard, press shift, alert, A or B',
    buttons: {
        specialKey: {
            text: 'On behalf of shift',
            keys: ['shift', 'alt'],
            action: function(){
                $.alert('Shift or Alt was pressed');
            }
        },
        alphabet: {
            text: 'A, B',
            keys: ['a', 'b'],
            action: function(){
                $.alert('A or B was pressed');
            }
        }
    }
});

// Other sample
// In this example, the YES button is hidden, The user can only use the keyboard to click the button!
$.confirm({
    title: false,
    content: 'Imagine a very critical action here! <br> ' +
             'Please press <strong style="font-size: 20px;">Y</strong> to proceed.',
    buttons: {
        yes: {
            isHidden: true, // hide the button
            keys: ['y'],
            action: function () {
                $.alert('Critical action <strong>was performed</strong>.');
            }
        },
        no: {
            keys: ['N'],
            action: function () {
                $.alert('You clicked No.');
            }
        },
    }
});
// *******************************
// Button functions
// jquery-confirm provides a set of functions for a nice and clean way to alter your buttons in run-time. 
// if this is not enough you can use this.$$<buttonName> to get the jquery DOM element

// A full list of functions for buttons.
/*
Function	  Code	                                              Description
=========     ====                                                ===========
setText	      this.buttons.<buttonName>.setText(text)	          The text you want to set.
addClass	  this.buttons.<buttonName>.addClass(className)	      Add a class to the button
removeClass	  this.buttons.<buttonName>.removeClass(className)	  remove a class to the button
disable	      this.buttons.<buttonName>.disable()	              Disable the button
enable	      this.buttons.<buttonName>.enable()	              Enable the button
show	      this.buttons.<buttonName>.show()	                  Show the button via CSS
hide	      this.buttons.<buttonName>.hide()	                  Hide the button via CSS
*/

$.confirm({
    closeIcon: true, // explicitly show the close icon
    buttons: {
        buttonA: {
            text: 'button a',
            action: function (buttonA) {
                this.buttons.resetButton.setText('reset button!!!');
                this.buttons.resetButton.disable();
                this.buttons.resetButton.enable();
                this.buttons.resetButton.hide();
                this.buttons.resetButton.show();
                this.buttons.resetButton.addClass('btn-red');
                this.buttons.resetButton.removeClass('btn-red');
                // or
                this.$$resetButton // button's jquery element reference, go crazy
                this.buttons.buttonA == buttonA // both are the same.
                return false; // prevent the modal from closing
            }
        },
        resetButton: function (resetButton) {
        }
    }
});

// *******************************
// Customizing: Dialog types helps give the user a hint as to what the dialog is about
$.confirm({
    title: 'Encountered an error!',
    content: 'Something went downhill, this may be serious',
    type: 'red',
    typeAnimated: true,
    buttons: {
        tryAgain: {
            text: 'Try again',
            btnClass: 'btn-red',
            action: function(){
            }
        },
        close: function () {
        }
    }
});

// *******************************
// Icons
// Give meaning to your dialog with custom icons.

$.confirm({
    icon: 'glyphicon glyphicon-heart',
    title: 'glyphicon'
});
$.confirm({
    icon: 'fa fa-warning',
    title: 'font-awesome'
});
$.confirm({
    icon: 'fa fa-spinner fa-spin',
    title: 'Working!',
    content: 'Sit back, we are processing your request!'
});

// *******************************
// Close icon
// jQuery confirm uses &times; html entity for this close symbol, however you can use Any icon of your choice (fa, glyphicon, zmdi)

// By default closeIcon is set to null. That means, if buttons are not defined the closeIcon will be shown, else will not be shown. 
// To explicitly show closeIcon set it to a truthy value and vise versa.

// Turn on closeIcon explicitly
$.confirm({
    closeIcon: true
});

// Using other libraries for icons
$.confirm({
    closeIcon: true,
    closeIconClass: 'fa fa-close'
});

// *******************************
// Handle closeIcon's callback
// Control what happens when close icon is clicked. 
// closeIcon can take in function to handle the button click or you can return a button name.

$.confirm({
    closeIcon: function(){
        return false; // to prevent close the modal.
        // or
        return 'aRandomButton'; // set a button handler, 'aRandomButton' prevents close.
    },
    // or
    closeIcon: 'aRandomButton', // set a button handler
    buttons: {
        aRandomButton: function(){
            $.alert('A random button is called, and i prevent closing the modal');
            return false; // you shall not pass
        },
        close: function(){
        }
    }
});

// *******************************
// Custom width
// Jquery-confirm uses bootstrap's grid system for its layout by default. You can simply provide column classes to adjust the modal's width.
// instead of typing the whole thing, provide keywords like 
//   xlarge/xl   equivalent to col-md-12 
//   large/l     equivalent to col-md-8 col-md-offset-2 
//   medium/m    equivalent to col-md-6 col-md-offset-3 
//   small/s     equivalent to col-md-4 col-md-offset-4 
//   xsmall/xs   equivalent to col-md-2 col-md-offset-5

$.confirm({
    columnClass: 'small'
});
$.confirm({
    columnClass: 'col-md-4 col-md-offset-4',
});
$.confirm({
    columnClass: 'col-md-12'
});
$.confirm({
    columnClass: 'col-md-4 col-md-offset-8 col-xs-4 col-xs-offset-8',
    containerFluid: true, // this will add 'container-fluid' instead of 'container'
});

// *******************************
// Custom width without Bootstrap
// Many have a different taste, who wont be using bootstrap in their projects. 
// You can simply provide the width of the modal, in px or any metric you want.

// useBootstrap must be set to false to use this feature 
// you can globally disable bootstrap by setting jconfirm.defaults.useBootstrap = false

$.confirm({
    boxWidth: '30%',
    useBootstrap: false,
});
$.confirm({
    boxWidth: '500px',
    useBootstrap: false,
});

// *******************************
// Namespaced bootstrap
// Namespacing is basically isolating the bootstrap classes names, like turning '.row' to '.custom-row' 
// If you're using a namespaced bootstrap library, this option is for you.

// it is ideal to set this in jconfirm.defaults
$.confirm({
    bootstrapClasses: {
        container: 'container',
        containerFluid: 'container-fluid',
        row: 'row',
    },
});
// *******************************
// Draggable
// Make the dialog draggable. simple. 
// Draggable is set to TRUE by default.
$.confirm({
    title: 'Hello there',
    content: 'click and hold on the title to drag',
    draggable: true,
});

// *******************************
// Window border
// By default jconfirm's modal is prevented from being dragged out of the window.
$.confirm({
    title: 'Hello there',
    content: 'Drag this modal out of the window',
    draggable: true,
    dragWindowBorder: false,
});

// *******************************
// Window gap
// If dragWindowBorder is set to true a defined space is maintained between the modal and the window. 
// this distance can be changed with this feature.
$.confirm({
    title: 'Hello there',
    content: 'try to drag this modal out of the window',
    draggable: true,
    dragWindowGap: 0, // number of px of distance
});

// *******************************
// Ajax loading
// With jconfirm you have the power to load content directly when needed via ajax, no extra code. 
// Two methods are available to load content via Ajax:

// 1-Pass in String content the URL with "URL:" prepended.
  content: "URL:http://example.com/getData?id=1"

// 2-Pass in Function that returns a jQuery ajax promise. 
  content: function(){ return $.get(...); }

// From v3 onwards, buttons are not disabled until ajax call is complete. 
//  contentLoaded is called when the ajax is complete. before the content is put in DOM.
 
// Using the "URL:" prefix
// Using the url prefix is the quick way, however has some limitations like you cannot modify the ajax call's method, dataType, etc.
// To use, prepend your URL with "URL:" ends up like "URL:http://example.com/file.extension". 
// NOTE: the returned data is set as content automatically before contentLoaded callback is 

 $.confirm({
    title: 'Title',
    content: 'url:text.txt',
    onContentReady: function () {
        var self = this;
        this.setContentPrepend('<div>Prepended text</div>');
        setTimeout(function () {
            self.setContentAppend('<div>Appended text after 2 seconds</div>');
        }, 2000);
    },
    columnClass: 'medium',
});

// *******************************
// Using Ajax promise
// This option provides full control over the ajax options and what data is to be inserted. The content takes a function that returns a jQuery promise ($.ajax, $.get, $.post, etc.). In this example a json object is requested, and a part of it is set as content.

// NOTE: the returned data is NOT set as content automatically, you must set the content yourself.
$.confirm({
    content: function () {
        var self = this;
        return $.ajax({
            url: 'bower.json',
            dataType: 'json',
            method: 'get'
        }).done(function (response) {
            self.setContent('Description: ' + response.description);
            self.setContentAppend('<br>Version: ' + response.version);
            self.setTitle(response.name);
        }).fail(function(){
            self.setContent('Something went wrong.');
        });
    }
});
// *******************************
// Ajax complete callback contentLoaded
// When the ajax call is complete the contentLoaded function is called with arguments Data, Status & Xhr object. 
// contentLoaded is called before the content is put in DOM 
//  If you want to do stuff after the content has put in DOM, use onContentReady
$.confirm({
    content: 'url:text.txt',
    contentLoaded: function(data, status, xhr){
        // data is already set in content
        this.setContentAppend('<br>Status: ' + status);
    }
});

$.confirm({
    content: function(){
        var self = this;
        self.setContent('Checking callback flow');
        return $.ajax({
            url: 'bower.json',
            dataType: 'json',
            method: 'get'
        }).done(function (response) {
            self.setContentAppend('<div>Done!</div>');
        }).fail(function(){
            self.setContentAppend('<div>Fail!</div>');
        }).always(function(){
            self.setContentAppend('<div>Always!</div>');
        });
    },
    contentLoaded: function(data, status, xhr){
        self.setContentAppend('<div>Content loaded!</div>');
    },
    onContentReady: function(){
        this.setContentAppend('<div>Content ready!</div>');
    }
});

// *******************************
// Auto close
// Do a action if the user does not respond within the specified time. 
// This comes in handly when the user is about to do something critical. 
// The autoClose option takes in a string, like 'confirm|4000' where confirm is the action to trigger after 4000 milliseconds. 
//  Practical examples of autoClose
 
 $.confirm({
    title: 'Delete user?',
    content: 'This dialog will automatically trigger \'cancel\' in 6 seconds if you don\'t respond.',
    autoClose: 'cancelAction|8000',
    buttons: {
        deleteUser: {
            text: 'delete user',
            action: function () {
                $.alert('Deleted the user!');
            }
        },
        cancelAction: function () {
            $.alert('action is canceled');
        }
    }
});
$.confirm({
   title: 'Logout?',
    content: 'Your time is out, you will be automatically logged out in 10 seconds.',
    autoClose: 'logoutUser|10000',
    buttons: {
        logoutUser: {
            text: 'logout myself',
            action: function () {
                $.alert('The user was logged out');
            }
        },
        cancel: function () {
            $.alert('canceled');
        }
    }
});

// *******************************
// Background dismiss
// Control what happens if the user clicks outside the modal. 
// backgroundDismiss is set to false by default.

$.confirm({
    backgroundDismiss: true, // this will just close the modal
});
$.confirm({
    backgroundDismiss: function(){
        return false; // modal wont close.
    },
});
$.confirm({
    backgroundDismiss: function(){
        return 'buttonName'; // the button will handle it
    },
});
$.confirm({
    backgroundDismiss: 'buttonName',
    content: 'in here the backgroundDismiss action is handled by buttonName' +
    '<div class="checkbox"><label><input type="checkbox" id="enableCheckbox"> Enable backgroundDismiss</label></div>',
    buttons: {
        buttonName: function () {
            var $checkbox = this.$content.find('#enableCheckbox');
            return $checkbox.prop('checked');
        },
        close: function () {
        }
    }
});

// Background dismiss animation
// Fancy animations to grab users attention. Click outside the modal to see the animation.  

$.confirm({
    backgroundDismiss: false,
    backgroundDismissAnimation: 'shake',
});
$.confirm({
    backgroundDismiss: false,
    backgroundDismissAnimation: 'glow',
});

// *******************************
// Escape key
// Control what happens when the escape key is pressed. This is enabled by default. 
// backgroundDismiss is called when escape key is pressed. if backgroundDismiss is false, it will shake the modal.

$.confirm({
    escapeKey: true,
    backgroundDismiss: false,
});
$.confirm({
    escapeKey: 'buttonName',
    buttons: {
        buttonName: function(){
            $.alert('Button name was called');
        },
        close: function(){
        }
    }
});

// ******************************* 
// RTL support
// If you need to show the confirm box in rtl then you should set the rtl option to true.

$.alert({
    title: 'پیغام',
    content: 'این یک متن به زبان شیرین فارسی است',
    rtl: true,
    closeIcon: true,
    buttons: {
        confirm: {
            text: 'تایید',
            btnClass: 'btn-blue',
            action: function () {
                $.alert('تایید شد.');
            }
        },
        cancel: {
            text: 'انصراف',
            action: function () {
            }
        }
    }
});

// *******************************
// Callbacks
// Get more control over the modal, mainly important for binding events for the modal elements. 
//  contentLoaded callback is called when Ajax loading is used
 
 $.confirm({
    title: false,
    content: 'url:callback.html',
    onContentReady: function () {
        // when content is fetched & rendered in DOM
        alert('onContentReady');
        var self = this;
        this.buttons.ok.disable();
        this.$content.find('.btn').click(function(){
            self.$content.find('input').val('Chuck norris');
            self.buttons.ok.enable();
        });
    },
    contentLoaded: function(data, status, xhr){
        // when content is fetched
        alert('contentLoaded: ' + status);
    },
    onOpenBefore: function () {
        // before the modal is displayed.
        alert('onOpenBefore');
    },
    onOpen: function () {
        // after the modal is displayed.
        alert('onOpen');
    },
    onClose: function () {
        // before the modal is hidden.
        alert('onClose');
    },
    onDestroy: function () {
        // when the modal is removed from DOM
        alert('onDestroy');
    },
    onAction: function (btnName) {
        // when a button is clicked, with the button name
        alert('onAction: ' + btnName);
    },
    buttons: {
        ok: function(){
        }
    }
});


// *******************************
// Global defaults
// You can setup global settings for your jconfirm.
// jconfirm.defaults should be set after the plugin has loaded. of course. 

jconfirm.defaults = {
    title: 'Hello',
    titleClass: '',
    type: 'default',
    typeAnimated: true,
    draggable: true,
    dragWindowGap: 15,
    dragWindowBorder: true,
    animateFromElement: true,
    smoothContent: true,
    content: 'Are you sure to continue?',
    buttons: {},
    defaultButtons: {
        ok: {
            action: function () {
            }
        },
        close: {
            action: function () {
            }
        },
    },
    contentLoaded: function(data, status, xhr){
    },
    icon: '',
    lazyOpen: false,
    bgOpacity: null,
    theme: 'light',
    animation: 'scale',
    closeAnimation: 'scale',
    animationSpeed: 400,
    animationBounce: 1,
    rtl: false,
    container: 'body',
    containerFluid: false,
    backgroundDismiss: false,
    backgroundDismissAnimation: 'shake',
    autoClose: false,
    closeIcon: null,
    closeIconClass: false,
    watchInterval: 100,
    columnClass: 'col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1',
    boxWidth: '90%',
    scrollToPreviousElement: true,
    scrollToPreviousElementAnimate: true,
    useBootstrap: true,
    offsetTop: 40,
    offsetBottom: 40,
    bootstrapClasses: {
        container: 'container',
        containerFluid: 'container-fluid',
        row: 'row',
    },
    onContentReady: function () {},
    onOpenBefore: function () {},
    onOpen: function () {},
    onClose: function () {},
    onDestroy: function () {},
    onAction: function () {}
};
// *******************************
// Themes
// The Light & Dark themes that suit any website design, 
// Light theme  Dark theme  Modern  Supervan  Material  Bootstrap

$.confirm({
    theme: 'light'
});
$.confirm({
    theme: 'dark'
});
$.confirm({
    theme: 'supervan' // 'material', 'bootstrap'
});

// *******************************
// Make your own themes
// Why not? A unique design must have a unique confirm box
// This is a CSS boilerplate for defining a theme.

.jconfirm.jconfirm-my-theme {
  .jconfirm-bg {
  }
  .jconfirm-box {
    &.loading {
      &:before {
      }
      &:after {
      }
    }
    div.jconfirm-closeIcon {
    }
    div.jconfirm-title-c {
    }
    div.jconfirm-content-pane {
    }
    div.jconfirm-content {
      &:empty {
      }
    }
    .jconfirm-buttons {
      button {
      }
      button + button {
      }
    }
    &.hilight {
    }
  }
}



// JS part of it
$.confirm({
    theme: 'my-theme'
});

// *******************************
// Open/Close Animations
// Impression lies in what we see.
// Different animations can be set for open and close events.

// animateFromElement is added since v3.3.0, which animates the modal from the position of the button that was clicked. 
// This feature does not play well with all the animation styles.
// Recommended animations for animateFromElement:

// scale  rotateY  rotateYR  rotateX  rotateXR
// 2D animations: (animateFromElement disabled)
// right  left  bottom  top  Rotate  none  opacity

// 3D animations: (animateFromElement disabled)
// scale (default)  zoom  scaleY  scaleX  RotateY  RotateYR  RotateX  RotateXR

$.confirm({
    animation: 'zoom',
    closeAnimation: 'scale'
});
// Available animations:
// right, left, bottom, top, rotate, none, opacity, scale, zoom,
// scaleY, scaleX, rotateY, rotateYR (reverse), rotateX, rotateXR (reverse)
// *******************************
// Animation bounce
// Some eye candy thats in fashion.

// No bounce  1.5 bounce  2 bounce  2.5 bounce
$.confirm({
    animationBounce: 1.5, // default is 1.2 whereas 1 is no bounce.
});
// *******************************
// Animation speed
// Adjust the duration of animation.

$.confirm({
    animationSpeed: 2000 // 2 seconds
});

$.confirm({
    animationSpeed: 200 // 0.2 seconds
});


