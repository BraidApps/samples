Samples/Basics

Basic3

Compared with basic2, there is really only one simple change, but it's very
important to understand.  

You'll see that the body of the valueDisplay element in the HTML has been set
to {{$.braid.intProperties.sharedValue}}.  This combines Polymer binding with
braid binding.  Polymer binding happens because this is inside double braces.
The expression inside the braces gets a value from the braid component.  

The $.braid is Polymer's way of referring to another element by its ID.  In 
this case, that component is the braid-api component.  On that component, we
fetch one of its intProperties called sharedValue and it will be displayed here.

As a result of this binding, you'll see that we no longer need the 
onPropertyChanged function in the javascript prototype.  Of course, you can
still use property change event listeners if you need to deal with side-effects
of braid property changes.  For example, suppose that instead of displaying
the property's value, you wanted to use it in deciding something else about the UI.
Then you would listen to its change and use code to update your UI accordingly.


What you should have learned so far:

  - To create a braid applet, you define a new Polymer component following
    the standard rules defined by Polymer.  You add a <braid-api> component
    (another polymer object) to your object's template.  
    
  - Start by deciding what information will be shared between different clients
    sharing the same tile.  In this example, the only piece o shared information
    is an integer:  sharedValue.
    
  - Actions a user takes will typically update the model rather than directly
    updating the UI.  In this case, when the user clicks a button, we don't 
    directly change the contents of the UI display.  Instead, we just update
    the sharedValue in the model.  
    
  - You can use a property change listener to know when to update your UI
    and ask braid to get the property's value.  Or you can directly bind an
    element in your UI to the braid property and avoid the need for any code
    for property change handling.