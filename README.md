# Phaser3CMD

Phaser 3 examples for Programming for RealTime (DC9) Communication Multimedia Design @ Hanzehogeschool, Groningen, NL.

In this repository you will find some Phaser 3 examples. Why another set of examples? [The Phaser website has plenty of examples](https://phaser.io/examples/), but there is not a lot of explanatory comments in those examples. So, these examples hopfully bridge the gap that I think novice programmers can experience when jumping into developing games using Phaser.

These examples build, as much as possible, upon content from earlier classes (Programming Basics mainly). This means that, where possible, new topics were avoided if the thing to explain could be explained using prior knowledge. There are somtimes other, and according to some better, ways to achieve things listed here.

## Moving from Phaser 2 to Phaser 3

In case you know Phaser 2, in the two newsletters linked to below, there is a migration guide in two parts.

* [Migration Guide - Part 1](https://madmimi.com/p/a022cb)
* [Migration Guide - Part 2](https://madmimi.com/p/ff68db)

## Building on prior knowledge

This repository is used in a course which is preceeded by a course on P5JS (using mainly [Khan Academy's Intro to JS: Drawing and Animation](https://www.khanacademy.org/computing/computer-programming/programming). In that course, there was no ES6 used so, this repository tries to avoid ES6 features unless there is no easy alternative. So:

* the examples use var over let.
* the examples will use object literals where possible over classes.

There _may_ be ES6 examples. Just because ES6 is there and for a reason. Those examples will be marked as such in the list below.

## Some 'random' notes

Lazy as I am, I rely on the defer attribute of the script tag. This means I do not need to add event listeners for the document being loaded. Bit less JavaScript and therefore a bit less complexity.

Although these examples may be referred to in class, it is a project maintained by me but paid for by no one. Requests for extra examples may therefore be denied based on time available (or the lack thereof)...

If you want to post a request or find a bug, please use the Issues feature of Github to notify me. Easier to track IMHO than email or the various other channels.

A number of images are used and from different sources. Attention _is_ being paid to licences but a special shout-out to <http://www.kenney.nl> for his free assetspacks used in this repository.

Another source of assets is <http://labs.phaser.io/assets/>. Don't think I would use those in a project because it's hard to tell where they come from, but I took the liberty to use some assets for these examples.

## The official API docs

<https://photonstorm.github.io/phaser3-docs/>

## The official examples

<https://phaser.io/examples/>

## Phaser 3 FAQs

* <https://github.com/phaser-discord/community/blob/master/FAQ.md>
* <https://github.com/samme/phaser3-faq>

## Examples sorted per week

### Week 0

* [SIngleSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/SIngleSceneTemplate) A template you can use to build a Phaser project with just a single scene (most likey just for testing something)
* [MultiSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplate) A template you can use to build a Phaser project using multiple scenes. For the more serious projects.
* [MultiSceneTemplateClass](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplateClass) (ES6) A template you can use to build a Phaser project using multiple scenes. For the more serious projects and people liking to work with classes.

### Week 1

* Introduction
* [SpritesBasic](https://github.com/manno-xx/Phaser3CMD/tree/master/SpritesBasic) A simple display of sprites/images.
* [CursorKeys](https://github.com/manno-xx/Phaser3CMD/tree/master/CursorKeys) How to respond to the cursor keys to control some in-game object.
* [KeyboardInteraction](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyboardInteraction) Pressing a key and have Phaser only respond once, even if you keep it pressed.

### Week 2

* Sprite sheets
* Animations

### Week 3

* Tilesets
* Tilemaps
* Camera

### Week 4

* [BasicPhysicsImages](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsImages) A very basic physics setup using an image and a tiled sprite (repeating image in a single sprite.
* [BasicPhysicsShapes](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsShapes) A very basic physics setup using only graphic shapes, no images.).

### Week 5

* --

### Week 6

* Audio

## Alphabetical Examples list

Below are all the examples from this repository with a note exaplaing what the example explains

* [BasicPhysicsImages](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsImages) A very basic physics setup using an image and a tiled sprite (repeating image in a single sprite.
* [BasicPhysicsShapes](https://github.com/manno-xx/Phaser3CMD/tree/master/BasicPhysicsShapes) A very basic physics setup using only graphic shapes, no images.).
* [SIngleSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/SIngleSceneTemplate) A template you can use to build a Phaser project with just a single scene (most likey just for testing something)
* [KeyboardInteraction](https://github.com/manno-xx/Phaser3CMD/tree/master/KeyboardInteraction) Pressing a key and have Phaser only respond once, even if you keep it pressed.
* [MultiSceneTemplate](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplate) A template you can use to build a Phaser project using multiple scenes. For the more serious projects.
* [CursorKeys](https://github.com/manno-xx/Phaser3CMD/tree/master/CursorKeys) How to respond to the cursor keys to control some in-game object.
* [MultiSceneTemplateClass](https://github.com/manno-xx/Phaser3CMD/tree/master/MultiSceneTemplateClass) (ES6) A template you can use to build a Phaser project using multiple scenes. For the more serious projects and people liking to work with classes.
* [SpritesBasic](https://github.com/manno-xx/Phaser3CMD/tree/master/SpritesBasic) A simple display of sprites/images.
