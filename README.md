# An FP Journey
From Vanilla -> Typed -> Reactive -> FP -> Haskell

The idea is to build a tower defence game and then refactor it progressively,
 layering concepts of modern front-end software design, tooling and that Functional Programming
 (FP) fad, to see what
  they bring to the party and how they form a greater whole.
  
At each step various developers may feel that the code base is in a desirable
position for them and they don't need the features brought by later steps.
This is perfectly fine, the aim of this project is just to learn what each
step brings and gives us some pros and cons to discuss. Each step is designed
to introduce a single concept so the journeyperson can see what we get from
the final product rather than saying "x is far better than y".
  
  
# The Game
- [ ] Creates a river
- [ ] Provides a towers/weapons selection panel where items can be dragged and
dropped onto the landscape
- [ ] Random ships sail along the river after the game has been started
- [ ] Weapons fire at ships which are destroyed when their respective health
meters have reduced to zero
- [ ] If all ships are destroyed user wins, if ship reaches end of river, user
loses

# Step 1 - Vanilla OO no build

Just get it done - throw some classes together, get it rendering stuff, 
listen to events and run updates in a game loop. Code is largely written in a
contrived way to demonstrate pain points and refactoring opportunities.

# Step 2 - Add a build step

Add webpack and look at the benefits of having a build system which can
transpile code and create an optimised bundle at the end which takes into 
account code dependencies. Instead of globals and script order dependency we can 
use modules and keep our environment clean.

# Step 3 - Add some typing

To make our code easier to refactor we need to have confidence, when we move
code around, that our program still works. By adding typing we can be certain
that various methods are being called correctly and objects have the expected
properties of the expected type. Currently there are two obvious contenders,
[TypeScript](https://www.typescriptlang.org/) and [Flow](https://flowtype.org/).

We'll convert our code to TypeScript which will be transpiled to JavaScript in
our final bundle to run in the browser.

# Step 4 - Make it reactive

We now have typings so we can start moving things around now. Currently the
app is listening to different mouse movements, generating lots of moving parts
and updating when the browser is able to render the next frame.

All these moving parts are hard to reason about, debug and maintain. If we
can move them into a single stream of updates with a single model it will be
easier to manage said moving parts. For this purpose we'll use
[most](https://github.com/cujojs/most) to create a Functional Reactive Programming
 (FRP) app.

# Step 5 - Make it functional

The code base should be looking fairly good right now but we have some pain
points that would be nice to clear up:

* use of `new` which ties us into using a constructor making it more difficult
to refactor code into a **Factory** pattern and implies local instances/state
which adds complexity.
* use of `this`, is hard to reason about in JS land and makes refactoring and
testing all the more difficult because of a concreate relationship to the given
`this`.
* extending classes make new ships or weapons harder to create without inheriting
a lot of properties/methods that we don't need.
* mutating data structures increases likelihood of hard to find bugs and longer
debug sessions following mutable structures through each branching side-effect.

We'll now make every function pure and freeze our model to ensure that we can
only update our single model in one place using functions we can clearly reason
about. Inputs go in -> predictable outputs come out.

# Step 6 - Go all in on the functional

JS is great and has got us this far but...we're still having to be very
disciplined. We have to use a library such as
[Immutable](https://facebook.github.io/immutable-js/) or manually freeze and use
`Object.assign` which is much slower than the former. We also have to be very
disciplined with respect to our architecture and data structures. JS engines are
now very fast when dealing with predictable types. Working with an array of
mixed types is usually much slower than an array of numbers for example. While
TypeScript is also giving us lots of safety it doesn't enforce data flow.

We'll now look at [Elm](http://elm-lang.org/) which will give us everything we
have so far but nothing is optional. We are forced into writing pure code, contained
side-effects, immutable data and strongly encouraged to annotate our types. The
compiler errors are far superior* to the JS options as of today (30/01/2017).
Using The Elm Architecture (TEA) will also mandate how we write our program too,
so no bike-shedding on where things go.

* ok so x _is_ better than y here

# Step 7 - Go all in on the Haskell

Right, we now have an awesome, robust FRP app that we have full confidence in, however,
if the game were to get even more complex it could be argued that Elm is a
little too simple for our needs. While it takes a lot of cues from Haskell it
is built as a "developer friendly language that's simple to use" and not just
a hardcore FP language. In that respect it continues to diverge from Haskell and some
 of it's more powerful features.

If we need to spread our wings and make stronger use
of polymorphic types and type classes we need to look elsewhere. We'll now take
a look at [PureScript](http://www.purescript.org/) and see what something closer
to Haskell brings to the party. In theory it will reduce "boilerplate" code and
should be nicer to use than [GHCJS](https://github.com/ghcjs/ghcjs) which is
very immature in terms of front-end development and tooling. We may lose
some performance and the nice Elm compiler but it should demonstrate "front-end
Haskell".

# The END

Some sort of discussion on the talking points raised by each step and perhaps a list
of Q&A that comes out of it.
