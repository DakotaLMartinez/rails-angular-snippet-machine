# SnippetMachine

SnippetMachine is an Angular 1.5.3 application running on a Rails 5 backend in API-only mode. The project makes use of gulp, bower and browsersync allowing easy livereloading of edited files. Browsersync is configured to serve on `http://localhost:3000` and Rails is configured to serve on `http://localhost:4000`. There is a gulp task for running both simultaneously, but I've found I prefer running them in two separate terminals so that I can still see the rails server logs for the API.

## Ruby Version 

This app is built using Ruby v.2.3.1 (2016-04-26 revision 54768) and Rails 5.0.0.1. In order to get started, I recommend creating a gemset for Rails 5: 

```
$ rvm use ruby-2.3.1@rails5.0 --create
$ gem install rails
$ rails -v
```

More details can be found on the RailsApps Project's instructions for [Updating Rails](http://railsapps.github.io/updating-rails.html).

## System dependencies 

To run this project, you'll also need to have the following dependencies installed:

- [Node.js](https://nodejs.org/en/download/) (I'm using v.6.5.0).
- [Gulp-CLI](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (I'm using v.1.2.2)
- NPM - which should have installed with Node (I'm using v3.10.3)
- [PostgreSQL](https://www.postgresql.org/download/) (I'm using v.9.4.4 locally)

First thing's first, clone this repository to your local machine. I recommend setting the rails 5 gemset as your default using the following command:

`rvm use 2.3.1@rails5.0 --default`

Next, you'll want to cd into the directory you cloned and run:

`bundle install`

Now that your bundle is complete, we'll want to install the front end dependencies. To do that, you'll want to change directory into the angular client: 

`cd client`

and run: 

`npm install`

Once this installation is complete, we can move on to configuring the app to work with Dropbox.

## Configuration 

SnippetMachine employs on the Dropbox API to provide its core feature: saving and syncing snippets to your dropbox from within the webapp. 

In order to make use of this part of the app's functionality. You'll need to [create a new dropbox application](https://www.dropbox.com/developers/apps/create). After you've created your app, you'll want to add a couple of redirect URIs to allow for OAuth 2 Authentication:

`http://localhost:3000`
`http://localhost:4000` 

After adding the redirect URLs, you'll need to add your app key and app secret to your local copy of SnippetMachine.

To add this configuartion to your copy of the app, we're using the [choices gem](https://github.com/mislav/choices) which allows configuration to be imported from another file. A file called `settings.local.yml` is referenced from within `config/application.rb` of the rails app. In order to get this app to work, you'll want to create a file `config/settings.local.yml` and add your app key and app secret to it. When complete, it will look something like this: 

```
development:
  dropbox: 
    app_key: 'your_key_here'
    secret_key: 'your_secret_here'
```

Once you've added these credentials, you're ready to move on to the next step. 

## Setting up the Database 

SnippetMachine uses a Postgres database. To create your db, run the following command: 

`rails db:create`

Next, to create the tables: 

`rails db:migrate`

Finally, to seed the database with some starter snippets, you can run: 

`rails db:seed`

## Running the Server 

To get started and see if everything is working properly, run the following command:

`gulp serve:full-stack`

This will start a rails server at `http://localhost:4000` and a browersync session running the angular app at `http://localhost:3000`. It will take a bit to finish as the code will be built and tasks will run before browsersync starts up. When it does, `http://localhost:3000` will load in your default browser.

## Deployment 

I've set up detailed instructions for how to deploy this app to Webfaction shared hosting. If you are planning on deploying to Heroku, you'll want to check out Jason Swett's tutorial on angularonrails.com on [deploying an angular 2 rails 5 app to Heroku](http://angularonrails.wpengine.com/deploy-angular-2rails-5-app-heroku/). While the app uses the angular 2 seed, the only major difference is that you'll want to run `gulp build` instead of `gulp build.prod` within the `postinstall`

More on deployment later.


