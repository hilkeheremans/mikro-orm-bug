# Mikro-ORM v4 bug repro

To run, do a `yarn` to install deps and run `yarn start` to run the repro.

The console.log statements give you some indication as to what scenario is running, and Mikro-ORM's debug output will make clear that it is executing queries that should not be executed at all.
