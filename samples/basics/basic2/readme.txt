Samples/Basics

Basic2

This starts with our basic1 applet and makes it do something.

Let's start with the HTML.  It has a bit more markup than basic1, including
a button and some text.  And you'll see that your applet can define its own
styling using <style> tags in your template.

In the markup, you'll see that the button tag has on-click="{{onIncrClick}}".
This uses Polymer's standard event binding so that a click on that button
will cause the onIncrClick function in your Polymer prototype to be called.

Another important addition to your HTML template is another tag:  <braid-api>  
This tag doesn't show up in the display of your applet.  It is a hidden 
component that allows your applet to use the services that braid provides 
including persistence, sharing, collaboration, etc.

On the braid-api tag, you'll see a group attribute which is required so that
braid can bind to your applet and give it the proper context.  (Remember that
your applet might be used for several different tiles at the same time.)
The on-ready and on-property-changed attributes are bound using Polymer's
event binding to matching function declarations in your javascript prototype.

So let's look at how the applet works by looking at the javascript:

 - onReady is called when the tile using your applet is loaded and ready to
   go.  In this case, it asks the braid component if it already has a 
   property called sharedValue.  If not, it creates one and sets it to 1.
   Then it updates the display using whatever the current value is.
   
   Where did this "sharedValue" come from?  Your braid properties can be
   anything you want, and you can have as many as you want.  Your properties
   can be booleans, integers, numbers (floats), or strings.  (Later you'll
   learn about other ways to deal with more complex object models.)
   
   Note how this.$. is used throughout the javascript.  This is Polymer's
   way to refer to elements in the HTML by their ID.  For example,
   this.$.button1 is the button element.  And this.$.braid is the braid-api
   component.  
   
 = onIncrClick is bound to the click event from the button.  Note how the
   function simply increments the value of the sharedValue property in braid.
   It doesn't touch the display directly.  That's because braid applets are
   designed around the MVC (model-view-controller) paradigm.  The model
   is maintained by braid for you.  The view is your HTML and the controller
   is your javascript.  The button click causes your controller to update
   the model, in this case incrementing sharedValue by one.
   
 - onPropertyChanged is bound to an event from braid.  This event fires when
   anyone changes on the values braid is maintaining in your model.  So when
   your code increments sharedValue, this will cause that event to be fired.
   You can see that what it does is to update the display using the updated
   value of that property.
   
   This is where you see how braid really works.  Realize that you may be
   working alone on this tile, in which case, each time you click the button,
   the number will increase, indirectly through this model update followed by
   property event handling.  But you may be sharing the tile with another person
   or perhaps with several people.  All of you will be seeing an identical tile.
   So when any of these people click the button on their own display, braid
   will make sure that the property value is distributed to all clients, and
   everyone's property change event will fire, keeping everyone's tile
   in sync.  So without clicking your own button, you will see the number
   increase anytime anyone sharing your tile clicks the button on their display!


What you should have learned so far:

 - Braid applets are designed so that teams can share tiles using that applet
   and will all share the same state for that tile.  Braid takes care of
   persisting and synchronizing the data.
   
 - Add a <braid-api> tag to your HTML template to get access to the braid features.
   
 - Polymer event binding is the easiest way to connect your UI objects to your
   javascript logic.
   
 - Braid applets should always follow the model-view-controller (MVC) design pattern.
   Actions from the UI should not update the UI directly.  Instead, they should 
   update properties (and eventually other kinds of shared data) in the braid model.
   Model change events from braid tell you when you need to update the UI.