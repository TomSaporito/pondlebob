# Todo:

## Priorities
1. Pull out /public directory into root.  create two directories:  client and server

## Authentication/Authorization/Sign-up
* ~~return User data from Successful login~~
* ~~create Fetch version of Sign Up  -  returning message to check email~~
* create error handler in db calls for doesUserExistAlready function
* email should then use Fetch to verify and create the user permanently

## Once Authentication and Authorization are complete, work on drawing part of app
* drawing part needs to enable Undo functionality and Redo
* drawing part needs to enable clicking to make dots
* drawing part needs to enable paint bucket feature

## Once drawing is done
* save drawing as png


## Heroku
* figure out how to run webpack inside nested package.json file
* "heroku-postbuild": "webpack -p --config ./public/webpack.config.js --progress", should be in package.json of root??
