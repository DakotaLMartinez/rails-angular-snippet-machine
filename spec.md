# Specifications for the Angular Assessment

Specs:
- [x] Use Angular to build the app
    Angular App is in the client directory
- [x] Must contain some sort of nested views
    Snippet Show page has nested views for Code Editor, Visual Studio Code, and Sublime Text Snippet Formats
- [x] Must contain some sort of searching as well as filtering based on some criteria. Ex: All items in the "fruit" category, or all tasks past due
    Snippet Index component allows for full text search as well as filtering based on snippet language. (usable on Index and Profile pages)
- [x] Must contain at least one page that allows for dynamic updating of a single field of a resource. Ex: Allow changing of quantity in a shopping cart
    Snippet Index component (index and profile pages) allows a user to add or remove a snippet from their account. The number of users is updated dynamically.
- [x] Links should work correctly. Ex: Clicking on a product in a list, should take you to the show page for that product
    Links from snippet index change state to snippet show page.
- [x] Data should be validated in Angular before submission
    Snippets are validated on the name, language and trigger fields. Messages are displayed before submission. Data also validated server side and via database constraints. Those messages are displayed as well.
- [x] Must talk to the Rails backend using $http and Services
    User Service fetches User permissions, Snippet Service performs CRUD actions on snippets.
- [ ] Your README.md includes a short description, install instructions, a contributors guide and a link to the license for your code

Confirm
- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
