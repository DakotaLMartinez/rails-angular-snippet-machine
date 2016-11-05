# Contributing to SnippetMachine

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to SnippetMachine. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Code of Conduct](#code-of-conduct)
  * [SnippetMachine and its Architecture](#snippetmachine-and-its-architecture)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [Pull Requests](#pull-requests)

## What should I know before I get started?

### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [dakotaleewebdev@gmail.com](mailto:dakotaleewebdev@gmail.com).

### SnippetMachine and its Architecture

SnippetMachine is an Angular 1.5.3 app built on a Rails 5 API. The Angular app lives in the `client/src` directory. It uses services to communicate with the Rails API, components to construct the UI, UI Router for routing, filters for displaying snippets in different editor formats, and directives for validation.

I've included a list of components below, with urls appended if the component corresponds to a UI router view.

### The Angular App (client/src/app)

#### Components 

* [aceEditor](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/aceEditor) - Displays the code editors used throughout the app to display code snippets. Relies on the angular-ui-ace directive.
* [addSnippetButton](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/addSnippetButton) - Displays the add/remove snippet tag showing the number of users on each snippet.
* [createAccount](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/createAccount) - Handles user registration. This app uses [ng-token-auth](https://github.com/lynndylanhurley/ng-token-auth) on the Angular side along with [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth) on the Rails side. `(http://localhost:3000/#/sign_up)`
* [displayErrors](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/displayErrors) - Displays errors returned from the server.
* [dropboxConnect](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/dropboxConnect) - Displays a large button triggering the Oauth authentication with dropbox. Used on Login Screen.
* [instructions](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/instructions) - Displays instructions for using SnippetMachine with dropbox to enable automatic syncing of snippets to your local machine for use in your text editor. (current support is for Visual Studio Code and Sublime Text 2 Only). `(http://localhost:3000/#/instructions)`
* [loginForm](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/loginForm) - Displays Login Form and handles authentication. `(http://localhost:3000/#/sign_in)`
* [myNavbar](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/myNavbar) - Displays the tachyons styled navbar. Implemented within `src/index.html`.
* [snippetDelete](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/snippetDelete) - Displays a button for deleting a snippet. Only displays to users who authored the current snippet.
* [snippetEditButton](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/snippetEditButton) - Displays a button for editing a snippet. Only displays to users who authored the current snippet.
* [snippetForm](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/snippetForm) - Displays the form used on Edit and New Snippet Pages. This folder contains two controllers, one for the Edit Page (`http://localhost:3000/#/snippets/:id/edit`) and another for the New Page (`http://localhost:3000/#/snippets/new`).
* [snippetIndex](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/snippetIndex) - Displays a list of snippets with searching and pagination. There is also an option to display the snippets of a single user which is used on the profile page. This component is used on the Index page (`http://localhost:3000/#`) and the User Profile page (`http://localhost:3000/#/profile`).
* [snippetShow](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/snippetShow) - Displays the information for a single snippet on the Snippet Show Page (`http://localhost:3000/#/snippets/:id`). There are nested views for viewing the body of the snippet in a code editor, or the snippet formatted for different editors. (`http://localhost:3000/#/snippets/:id/vscode` and `http://localhost:3000/#/snippets/:id/sublime`)
* [sublimeView](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/sublimeView) - Displays a textarea containing the code for a snippet formatted for Sublime Text. Visible within a nested state on the snippetShow state (`http://localhost:3000/#/snippets/:id/sublime`) and on the snippetForm view used on the Edit and New Snippet States. (`http://localhost:3000/#/snippets/:id/edit` and `http://localhost:3000/#/snippets/new`)
* [userProfile](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/userProfile) - Displays the User Profile page for the currently logged in user. (`http://localhost:3000/#/profile`)
* [vsCodeSnippet](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/tree/master/client/src/app/components/vsCodeSnippet) - Displays a textarea containing the code for a snippet formatted for Visual Studio Code. Visible within a nested state on the snippetShow state (`http://localhost:3000/#/snippets/:id/vscode`) and on the snippetForm view used on the Edit and New Snippet States. (`http://localhost:3000/#/snippets/:id/edit` and `http://localhost:3000/#/snippets/new`).

#### Filters 

* [sublimeText.filter.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/filters/sublimeText.filter.js) - Takes a snippet object as an argument and returns the snippet as a string of XML code formatted for use by Sublime Text 2.
* [visualStudioCode.filter.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/filters/visualStudioCode.filter.js) - Takes a snippet object as an argument and returns the snippet as a string of JSON code formatted for use by Visual Studio Code.

#### Directives 

* [language.validator.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/directives/language.validator.js) - Validates the language field on the Snippet Form for inclusion in the languages supported by Visual Studio code and Sublime Text 2. (This directive depends on the Language service)
* [trigger.validator.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/directives/trigger.validator.js) - Validates the trigger field on the Snippet Form to make sure it doesn't include any spaces.

#### Services 

* [getApiUrl.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/getApiUrl.service.js) - Uses the `$location` service to handle returning the proper urls for interacting with the Rails API. In development, this means specifying `http://localhost:4000/api`. Otherwise, will `/api` works for the deployment environment.
* [language.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/language.service.js) - Allows the application to provide information about the supported languages. Specifically, the service can return an object that can be used to determine if a language is supported. It can also be used to return the proper abbreviation for a language specified by the supported code editors. (The abbreviations for a given language differ in some cases from editor to editor.)
* [session.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/session.service.js) - *Largely Unutilized*, this service was created when I was having trouble getting Devise Token Auth and ng-token-auth working together correctly. The service was storing user data in cookies upon login and removing them on logout. This file should either be removed, or refactored to include appropriate code now located in the [user.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/user.service.js).
* [snippet.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/snippet.service.js) - Allows for CRUD operations on the Snippet Resource managed by the Rails API via the $http service.
* [user.service.js](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/client/src/app/services/user.service.js) - Returns a permissions object that determines which UI elements should be visible to a given user. This service is also responsible for triggering the Save to Dropbox action which uploads all of a user's snippets to their connected dropbox account. Some of this could be refactored into the mostly unutilized Session Service.

### The Rails App

#### Models 

* [Language](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/models/language.rb) - Has Many Users through Snippets, has many Snippets & has many UserSnippets. This model includes validations for language support and uniqueness on the name of the language. It also has methods (`vscode_snippets(user_id)` and `sublime_snippets(user_id)`) for generating snippet code properly formatted for a particular editor.
* [Snippet](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/models/snippet.rb) - Belongs to a User & Belongs to a Language. Has Many UserSnippets and Has Many Users through UserSnippets. Contains validations for the presence of the name, trigger and language. Also contains a private method that saves the vscode format of the body before the snippet object is saved. This private method may no longer be necessary as I've added filters on the client side to easily display the snippet code given a snippet object.
* [User](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/models/user.rb) - Has Many UserSnippets, Has Many Snippets through UserSnippets & Has many Languages through Snippets. This Model was generated by `devise_token_auth:install`. It allows for omniauth registration via Dropbox. *IMPORANT*: This model contains methods (`add_snippet(snippet)`, `remove_snippet(snippet)` & `update_snippet(snippet)`) that are responbile for making sure that each user maintains trigger uniqueness within the scope of a language. 
* [UserSnippet](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/models/user_snippet.rb) - Belongs To a User, Belongs To a Snippet (with a counter cache) & Belongs To a Language. This is a join model that makes it easy for users to add snippets created by other users to their account.

#### Controllers 

* [devise_token_auth/omniauth_callbacks_controller](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/controllers/devise_token_auth/omniauth_callbacks_controller.rb) - This controller is copied from the [Devise_Token_Auth gem's version](https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/omniauth_callbacks_controller.rb). The redirect after dropbox oauth registration contained a long query string which was appended to the url **before** the #. This was causing state changes to be invisible within the URL. To fix this, I changed a line within the `render_data_or_redirect` method to ensure that the redirect included the query string **after** the #. I changed `redirect_to DeviseTokenAuth::Url.generate(auth_origin_url, data.merge(blank: true))` to `redirect_to generateUrl(auth_origin_url, data)` and defined `generateUrl` within this controller's private methods block.
* [application_controller](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/controllers/application_controller.rb) - Includes DeviseTokenAuth's concern to `SetUserByToken`. Also includes `ActionController::UrlFor` in order to determine the appropriate redirect url (necessary because in development environment the angular app and rails app are running on different ports).
* [dropbox_controller](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/controllers/dropbox_controller.rb) - Includes actions for authorizing a user and connecting with their dropbox account, storing credentials in session cookies. This controller also contains private methods that ensure authentication and create the necessary directories in a user's dropbox. **IMPORTANT**: This controller has an action that uploads all of a user's snippets to their dropbox account. This action corresponds to:
```GET '/api/dropbox/users/:user_id/add_snippets'```.
* [snippets_controller](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/controllers/snippets_controller.rb) - This is the heart of the Rails side. Contains standard CRUD actions with special care to make sure that only supported languages are allowed for new and edited snippets. This controller ensures that users can only edit or delete snippets that they created. It also contains actions for adding/removing a snippet from the current user's account (`GET 'api/snippets/:id/add_snippet'` and `GET 'api/snippets/:id/remove_snippet`').
* [users_controller](https://github.com/DakotaLMartinez/rails-angular-snippet-machine/blob/master/app/controllers/users_controller.rb) - Contains an action that returns a given user's snippets and an action that returns a given user's permissions to edit and download snippets. This permissions endpoint (`GET 'api/users/:id/permissions'`) is used by the client to determine which UI elements to display.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for SnippetMachine. Following these guidelines helps me understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, **perform a [cursory search](https://github.com/issues?q=+is:issue+repo:DakotaLMartinez/rails-angular-snippet-machine)** to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've searched through the currently open issues and found that your question was not answered, create a new issue.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you interacted with the app, which pages you visited, what you typed into a form, what you expected to happen and what happened instead. Did you refresh?
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. Try not to use complicated key bindings while recording. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a newer version of SnippetMachine) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of SnippetMachine?** What's the most recent version (commit sha from master branch) in which the problem doesn't happen?
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of Ruby are you using?** You can get the exact version by running `ruby -v` in your terminal
* **Which version of node are you using**? You can get the exact version by running `node -v` in your terminal
* **What's the name and version of the OS you're using**?


#### Template For Submitting Bug Reports

    [Short description of problem here]

    **Reproduction Steps:**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Expected behavior:**

    [Describe expected behavior here]

    **Observed behavior:**

    [Describe observed behavior here]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which follow reproduction steps to demonstrate the problem](url)

    **Ruby version:** [Enter Ruby version here]
    **OS and version:** [Enter OS name and version here]
    **Node Version:** [Enter node version here]

    **Additional information:**

    * Problem started happening recently, didn't happen in an older version of SnippetMachine: [Yes/No]
    * Problem can be reliably reproduced, doesn't happen randomly: [Yes/No]

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Ruby, including completely new
Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue on this repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of SnippetMachine which the suggestion is related to. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most SnippetMachine users.
* **Specify the name and version of the OS you're using.**

#### Template For Submitting Enhancement Suggestions

    [Short description of suggestion]

    **Steps which explain the enhancement**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Current and suggested behavior**

    [Describe current and suggested behavior here]

    **Why would the enhancement be useful to most users**

    [Explain why the enhancement would be useful to most users]

    [List some other text editors or applications where this enhancement exists]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which demonstrate the steps or part of SnippetMachine the enhancement suggestion is related to](url)

    **Ruby Version:** [Enter Ruby version here]
    **OS and Version:** [Enter OS name and version here]
    **Node Version:** [Enter node version here]

## Styleguides

### Git Commit Messages

* Use the present tense ("Adds feature" not "Added feature")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### Pull Requests 

* Clearly describe the purpose of your changes.
* What are you trying to accomplish with your changes?
* Describe the behavior before your changes and the behavior after in as much detail as possible.
* Are there any questions you had while working on your changes?
* Do your changes require any changes to this document?
