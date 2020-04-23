# Phaser3CMD

Phaser 3 examples for Programming for RealTime (DC9) Communication Multimedia Design @ Hanzehogeschool, Groningen, NL.

In this repository you will find some Phaser 3 examples. Why another set of examples? [The Phaser website has plenty of examples](https://phaser.io/examples/), but there is not a lot of explanatory comments in those examples. So, these examples hopfully bridge the gap that I think novice programmers can experience when jumping into developing games using Phaser.

These examples build, as much as possible, upon content from earlier classes (Programming Basics mainly). This means that, where possible, new topics were avoided if the thing to explain could be explained using prior knowledge. There are somtimes other, and according to some better, ways to achieve things listed here.

## Moving from Phaser 2 to Phaser 3

In case you know Phaser 2, in the two newsletters linked to below, there is a migration guide in two parts.

* [Migration Guide - Part 1](https://madmimi.com/p/a022cb)
* [Migration Guide - Part 2](https://madmimi.com/p/ff68db)

## Building on prior knowledge

This repository is used in a course which is preceded by a course on the Programming Basics using P5JS (using mainly [Khan Academy's Intro to JS: Drawing and Animation](https://www.khanacademy.org/computing/computer-programming/programming). In that course, there was no ES6 used so, this repository tries to avoid ES6 features unless there is no easy alternative. So:

* the examples use var over let and const etc.
* the examples will use object literals where possible over classes.
* (and probably more)

There _may_ be ES6 examples. Just because ES6 is there and for a reason. Those examples will be marked as such in the list below.

## Some 'random' notes

Lazy as I am, I rely on the defer attribute of the script tag. This means I do not need to add event listeners for the document being loaded. Bit less JavaScript and therefore a bit less complexity.

Although these examples may be referred to in class, it is a project maintained by me but paid for by no one. Requests for extra examples may therefore be denied based on time available (or the lack thereof)...

If you want to post a request or find a bug, please use the Issues feature of Github to notify me. Easier to track IMHO than email or the various other channels.

A number of images are used and from different sources. Attention _is_ being paid to licences but a special shout-out to <http://www.kenney.nl> for his free assetspacks used in this repository.

Another source of assets is <http://labs.phaser.io/assets/>. Don't think I would use those in a project because it's hard to tell where they come from, but I took the liberty to use some assets for these examples.

## Links

* [The official API docs](https://photonstorm.github.io/phaser3-docs/)
* [The official examples](https://phaser.io/examples/)
* [Phaser 3 FAQ 1](https://github.com/phaser-discord/community/blob/master/FAQ.md)
* [Phaser 3 FAQ 2](https://github.com/samme/phaser3-faq)
* [Phaser Discord channel](https://discord.gg/phaser)
* [Alternative to the official API](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html) (replace 'scene' by 'this' in his examples to make it work, or so it seems)

## Examples sorted per week

### Week 0

* [SIngleSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/SIngleSceneTemplate) A template you can use to build a Phaser project with just a single scene (most likey just for testing something)
* [MultiSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplate) A template you can use to build a Phaser project using multiple scenes. For the more serious projects.
* [MultiSceneTemplateClass](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplateClass) (**ES6**) A template you can use to build a Phaser project using multiple scenes. For the more serious projects and people liking to work with classes.
* [PhaserHelloWorld](https://github.com/manno-xx/Phaser3CMD/tree/master/PhaserHelloWorld) The backdrop of some videos on Blackboard. Copy of Phaser's Getting started tutorial. Modified to go fullscreen (in Chrome at least).

### Week 1

* Introduction
* [SpritesBasic](https://github.com/manno-xx/Phaser3CMD/tree/master/SpritesBasic) A simple display of sprites/images.
* [CursorKeys](https://github.com/manno-xx/Phaser3CMD/tree/master/CursorKeys) How to respond to the cursor keys to control some in-game object.
* [KeyboardInteraction](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyboardInteraction) Pressing a key and have Phaser respond only once, even if you keep it pressed.
* [KeyIsDown](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyIsDown) Check if a certain key is pressed and act upon it. A simplified version of CursorKeys
* [KeyIsDownWithInterval](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyIsDownWithInterval) Check if a certain key is pressed and act upon it. The check only returns true if an indicated time has passed since the lat time the check returned true.
* [Button](https://github.com/manno-xx/Phaser3CMD/tree/master/Button) Demo of a button that responds to mouseover/out and down.

### Week 2

* [Spritesheets](https://github.com/manno-xx/Phaser3CMD/tree/master/Spritesheets) A basic demo of letting a sprite run an animation from a sprite sheet.
* [SineAnimation](https://github.com/manno-xx/Phaser3CMD/tree/master/SineAnimation) Example of how to use the mathematical sine function to make something move smoothly (the math is minimal!).
* [TweenAnimation](https://github.com/manno-xx/Phaser3CMD/tree/master/TweenAnimation) A simple demo of tweens.

### Week 3

* [Tilemap](https://github.com/manno-xx/Phaser3CMD/tree/master/Tilemap) A simple demo of drawing a tilemap.
* [Platformer](https://github.com/manno-xx/Phaser3CMD/tree/master/Platformer) A demo of a tile map inclusing collisions with platfroms and less friendly tiles.
* layerd tilemaps
* Camera

### Week 4

* [BasicPhysicsColliderImages](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsColliderImages) A very basic physics setup using an image and a tiled sprite (repeating image in a single sprite) The physics setup is that of collision and 'normal, real life response'.
* [BasicPhysicsColliderShapes](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsColliderShapes) A very basic physics setup using only graphic shapes. The physics setup is that of collision and 'normal, real life response').

### Week 5

* [DataEvent](https://github.com/manno-xx/Phaser3CMD/tree/master/DataEvent) (**ES6**) Game objects can store their own data ('custom properties') When they change value, you can get notified by an event.

### Week 6

* Audio

## Alphabetical Examples list

Below are all the examples from this repository with a note exaplaing what the example explains

* [BasicPhysicsColliderImages](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsColliderImages) A very basic physics setup using an image and a tiled sprite (repeating image in a single sprite) The physics setup is that of collision and 'normal, real life response'.
* [BasicPhysicsColliderShapes](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsColliderShapes) A very basic physics setup using only graphic shapes. The physics setup is that of collision and 'normal, real life response').
* [Button](https://github.com/manno-xx/Phaser3CMD/tree/master/Button) Demo of a button that responds to mouseover/out and down.
* [CursorKeys](https://github.com/manno-xx/Phaser3CMD/tree/master/CursorKeys) How to respond to the cursor keys to control some in-game object.
* [DataEvent](https://github.com/manno-xx/Phaser3CMD/tree/master/DataEvent) (**ES6**) Game objects can store their own data ('custom properties') When they change value, you can get notified by an event.
* [KeyboardInteraction](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyboardInteraction) Pressing a key and have Phaser respond only once, even if you keep it pressed.
* [KeyIsDown](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyIsDown) Check if a certain key is pressed and act upon it. A simplified version of CursorKeys
* [KeyIsDownWithInterval](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyIsDownWithInterval) Check if a certain key is pressed and act upon it. The check only returns true if an indicated time has passed since the lat time the check returned true.
* [MultiSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplate) A template you can use to build a Phaser project using multiple scenes. For the more serious projects.
* [MultiSceneTemplateClass](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplateClass) (**ES6**) A template you can use to build a Phaser project using multiple scenes. For the more serious projects and people liking to work with classes.
* [PhaserHelloWorld](https://github.com/manno-xx/Phaser3CMD/tree/master/PhaserHelloWorld) The backdrop of some videos on Blackboard. Copy of Phaser's Getting started tutorial. Modified to go fullscreen (in Chrome at least).
* [Platformer](https://github.com/manno-xx/Phaser3CMD/tree/master/Platformer) A demo of a tile map inclusing collisions with platfroms and less friendly tiles.
* [SineAnimation](https://github.com/manno-xx/Phaser3CMD/tree/master/SineAnimation) Example of how to use the mathematical sine function to make something move smoothly (the math is minimal!).
* [SIngleSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/SIngleSceneTemplate) A template you can use to build a Phaser project with just a single scene (most likey just for testing something)
* [Spritesheets](https://github.com/manno-xx/Phaser3CMD/tree/master/Spritesheets) A basic demo of letting a sprite run an animation from a sprite sheet.
* [SpritesBasic](https://github.com/manno-xx/Phaser3CMD/tree/master/SpritesBasic) A simple display of sprites/images.
* [Tilemap](https://github.com/manno-xx/Phaser3CMD/tree/master/Tilemap) A simple demo of drawing a tilemap.
* [TweenAnimation](https://github.com/manno-xx/Phaser3CMD/tree/master/TweenAnimation) A simple demo of tweens.
