Samples/Basics

Basic1

Think of this as your first braid applet.  It is fully functional as a braid applet, although
it really doesn't do anything useful.  It simply displays a fixed "hello world" message on any
tile created using this applet.  If this tile is shared with others, they will see the same 
message. 

The applet consists of a folder containing at least 3 files:
  - applet.json:  tells braid about your applet's ID, name, and other things about it
  - basic1-applet.html:  this contains the definition of your applet's primary polymer object
  - sample1.png:  every applet needs an icon, which is referenced in the manifest
  
The most important thing is the applet's HTML file.  Since this applet is so simple, its
definition is also very simple.  A braid applet is just a polymer component with a unique
name (basic1-applet in this case).  A polymer component consists of two parts:  an HTML
template and a javascript Polymer declaration, providing a prototype object definition.

Since our braid applet doesn't do much, there's nothing required inside our polymer prototype,
and the HTML is completely static.  Nevertheless, this is still a perfectly valid braid
applet!

What you should have learned so far:

 - A braid applet starts with a Polymer component that conforms to standard Polymer conventions
   and adds a applet.json file and icon so that it can be installed into braid.
   
 - You write braid applets using technologies you are already familiar with:  HTML and javascript.
 
 - You can use as much or as little of Polymer technology as you want beyond the basic Polymer
   component definition.  To learn more about Polymer, visit https://www.polymer-project.org