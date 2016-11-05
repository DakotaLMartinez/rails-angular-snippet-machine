# SnippetMachine

SnippetMachine is an Angular 1.5.3 application running on a Rails 5 backend in API-only mode. Its purpose is to allow users to easily create and manage code snippets for use in their favorite editor (currently supports Visual Studio Code and Sublime Text 2). By linking their account with Dropbox, users can save snippets created within the web app directly to their local machine. There are instructions for symlinking the dropbox directory where snippets are saved with the directory on your computer reserved for storing user snippets. This allows snippets created within the web app to be usable almost instantly within your text editor. You can also edit snippets within the interface, save the changes to dropbox, and see your changes reflected within your text editor. 

The project makes use of gulp, bower and browsersync allowing easy livereloading of edited files. Browsersync is configured to serve on `http://localhost:3000` and Rails is configured to serve on `http://localhost:4000`. There is a gulp task for running both simultaneously, but I've found I prefer running them in two separate terminals so that I can still see the rails server logs for the API.

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

```
http://localhost:3000
http://localhost:4000
``` 

After adding the redirect URLs, you'll need to add your app key and app secret to your local copy of SnippetMachine.

To add this configuartion to your copy of the app, we're using the [choices gem](https://github.com/mislav/choices) which allows configuration to be imported from another file. A file called `settings.local.yml` is referenced from within `config/application.rb` of the rails app. In order to get this app to work, you'll want to create a file `config/settings.local.yml` and add your app key and app secret to it. When complete, it will look something like this: 

```
defaults: &defaults
  dropbox:
    app_key: 'your_key_here'
    secret_key: 'your_secret_here'

development:
  <<: *defaults

test:
  <<: *defaults
```

Once you've added these credentials, you're ready to move on to the next step. 

## Setting up the Database 

SnippetMachine uses a Postgres database. All of the setup can be done with the following command: 

`rails db:setup` 

This command will create the database, migrate to create all of the tables, and seed it with some starter snippets. If you would prefer to begin without any snippets, you can run the following commands instead:

`rails db:create`

Next, to create the tables: 

`rails db:migrate`

## Running the Server 

To get started and see if everything is working properly, run the following command:

`gulp serve:full-stack`

This will start a rails server at `http://localhost:4000` and a browersync session running the angular app at `http://localhost:3000`. It will take a bit of time to finish as the code will be built and tasks will run before browsersync starts up. When it does, `http://localhost:3000` will load in your default browser.

While working, I prefer to run `gulp serve` and `rails s -p 4000` in separate terminal windows so that I can see the output of the rails server logs while I navigate through the app. This is especially important when changes introduce server errors, because `gulp serve:full-stack` will hide the server output and will only display the progress of gulp tasks when client files are changed.

## Deployment 

I've set up detailed instructions for how to deploy this app to Webfaction shared hosting in [this plunker](https://plnkr.co/edit/NaMElx34bE2FU3vKrFCB?p=preview). If you are planning on deploying to Heroku, you'll want to check out Jason Swett's tutorial on angularonrails.com on [deploying an angular 2 rails 5 app to Heroku](http://angularonrails.wpengine.com/deploy-angular-2rails-5-app-heroku/). While the app uses the angular 2 seed, the only major difference is that you'll want to run `gulp build` instead of `gulp build.prod` within the `postinstall`. The heart of how it works is creating a symlink between the build output and the rails `public` folder.

The main challenge with deployment is that the build output is not stored in version control. This means that the build must run on the server after the source files have been deployed. On Heroku, this can be done with the aid of buildpacks as explained in [Jason Swett's tutorial](http://angularonrails.wpengine.com/deploy-angular-2rails-5-app-heroku/). On shared hosting, I've set up a post-receive hook that runs a bash script every time the I run: 

```
git push deployment master
```

The way my plunker works is that once you fill in your database usename and credentials and information about your application, you'll be able to paste a bunch of generated commands into an ssh session to your account. These commands will accomplish the following tasks:

- Create a directory in your account that is not public and initialize a bare git repository.
- Create a `secrets.yml` file and `database.yml` file in this private directory and fill them with configuration referencing environment variables.
- Create a post-receive hook within that git repository, this hook will do the following tasks when it receives a push:
  - set the working tree to your public deployment directory
  - copy server copies of `secrets.yml` and `database.yml` files into the deployed config directory
  - change directory into the parent folder of the rails directory
  - export environment variables to allow use of Ruby gems
  - export environment variables for database credentials and secret_key_base to allow rails commands to work 
  - change directory into the rails app 
  - run `bundle install` 
  - migrate the production database 
  - change directory back into parent directory 
  - install `npm-install-que`, `bower` and `gulp` to install dependencies and build angular app 
  - install node version manager and use 6.6.0 
  - change directory into the angular app directory within the rails directory
  - run `npm-install-que` (I found that npm install was using too much memory)
  - run `bower install` to install front end dependencies 
  - update `node-sass` so that gulp will work properly 
  - run `gulp build` 
  - change directory into the rails app directory 
  - remove the `public` directory 
  - symlink the `client/dist` folder to the `public` directory in the rails directory (`ln -s client/dist public`)
  - change directory into the parent directory of the rails app
  - restart the server
- Make the post-receive hook an executable file.

Webfaction servers run on nginx using phusion passenger. To get this working with Rails environment variables, you'll need to edit the `server` block within your `nginx.conf` file. This file is located at `/home/webfaction_user_name/webapps/app_name/nginx/conf/nginx.conf`. You'll want to add the rails environment variables to this file. If you're using my plunker, all you'll have to do is fill out the form at the top (make sure to check the box saying that it's an Angular App you need to build). Then, you can copy the contents of the textarea at the bottom of the page and replace your server block within your `nginx.conf`. The block will look something like this: 

```
server {
  listen             26371;
  passenger_enabled  on;
  root               /home/webfaction_user_name/webapps/app_name/deployed/public;
  server_name        localhost;
  rails_env          production;
  passenger_env_var SECRET_KEY_BASE your_secret_key_here;
  passenger_env_var DATABASE_NAME your_db_name_here;
  passenger_env_var DATABASE_USER your_db_user_here;
  passenger_env_var DATABASE_PASSWORD your_db_password_here;
  passenger_env_var RAILS_SERVE_STATIC_FILES true;
}
```

After that's set up, all that remains is to add a deployment remote to your local git repo. This is also set up for you if you use the plunker. All you have to do is copy the command generated in the textbox under `Add Remote to your local git Repo`.

After all of this is set up, you can deploy the app to webfaction using the command: 

`git push deployment master`

## Contributing 

For more information on contributing to SnippetMachine and how the project is organized, be sure to consult [CONTRIBUTING.md](CONTRIBUTING.md).

## License 

This project is licensed under the GNU GPL v3. See [LICENSE.md](LICENSE.md) for full details.

