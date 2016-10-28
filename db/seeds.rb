# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'factory_girl_rails' 
test_user = FactoryGirl.create(:test_user)
other_user = FactoryGirl.create(:other_user)
javascript = Language.where(name: "JavaScript").first_or_create
ruby = Language.where(name: "Ruby").first_or_create
html = Language.where(name: "HTML").first_or_create
css = Language.where(name: "CSS").first_or_create
attributes_hashes = [
  {
    name: 'my first snippet', 
    description: 'the best snippet ever', 
    trigger: 'snip', 
    language: javascript, 
    body: 'var snippet = "awesomer";'
  },
  {
    name: 'my second snippet', 
    description: 'the second best snippet ever', 
    trigger: 'snip2', 
    language: javascript, 
    body: 'var snippet = "awesome";'
  },
  {
    name: '3 Column Row', 
    description: 'Adds Bootstrap 3 column row', 
    trigger: 'bsrowthreecolumns', 
    language: html, 
    body: '<div class="row">
    <div class="${1:col-md-4 col-sm-6}">
      $2
    </div>
    <div class="${1:col-md-4 col-sm-6}">
        $3
    </div>
    <div class="${1:col-md-4 col-sm-6}">
      
    </div>
  </div>'
  },
  {
    name: 'Angular 1 Session Service', 
    description: 'Adds code for an Angular 1 Session service that stores user data in $cookies using ngCookies', 
    trigger: 'ng1sessionservice', 
    language: javascript, 
    body: "(function() {
  'use strict';

    angular
      .module('${dlmSnippetMachine}')
      .service('Session', Session);

    Session.$inject = ['$cookies'];
    function Session($cookies) {
      this.getCurrentUser = getCurrentUser;
      this.getCurrentUserId = getCurrentUserId;
      this.setCurrentUser = setCurrentUser;
      this.endSession = endSession;
      
      ////////////////

      function getCurrentUser() { 
        return $cookies.getObject('currentUser');
      }

      function getCurrentUserId() {
        return Number($cookies.get('currentUserId'));
      }

      function setCurrentUser(user) {
        $cookies.putObject('currentUser', user);
        $cookies.put('currentUserId', user.id);
      }

      function endSession() {
        $cookies.remove('currentUser');
        $cookies.remove('currentUserId');
      }
    }
  })();"
  },
  {
    name: 'Angular 1 Service Call from Controller', 
    description: 'Creates a function that calls an Angular 1 service call from within a controller', 
    trigger: 'ng1callservice', 
    language: javascript, 
    body:'function ${getUserSnippets}(${id}) {
      ${User}
        .${getUserSnippets}(${id})
        .then(handleSuccess, handleError)
      
      function handleSuccess(res) {
        ${vm.something}
        vm.errors = {};
      }

      function handleError(res){
        ${vm.errors = res;}
      }
  }'
  }, 
  {
    name: 'Bootstrap 3 Columns', 
    description: 'Adds 3 more columns to a bootstrap row', 
    language: html, 
    trigger: 'bsthreecolumns', 
    body: '<div class="${1:col-md-4 col-sm-6}">
    $2
  </div>
  <div class="${1:col-md-4 col-sm-6}">
    
  </div>
  <div class="${1:col-md-4 col-sm-6}">
    
  </div>
  '
  },
  {
    name: 'CSS for Background Image', 
    description: 'Adds background image to a CSS selector of your choice', 
    language: css, 
    trigger: 'cssbackground', 
    body: '${1:body} {
      background: url(${2:image url}) no-repeat ${3:center} ${4:center} ${5:fixed}; 
      -webkit-background-size: ${6:cover};
      -moz-background-size: ${6:cover};
      -o-background-size: ${6:cover};
      background-size: ${6:cover};
  }.'
  },
  {
    name: 'Bootstrap Centered Navbar', 
    description: 'Enters HTML for simple centered bootstrap navbar', 
    language: html, 
    trigger: 'bsnavcenter', 
    body: '<nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Brand</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home <span class="sr-only">(current)</span></a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Portfolio</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>'
  },
  {
    name: 'Javascript Function', 
    description: 'adds javascript function definition', 
    language: javascript, 
    trigger: 'fn', 
    body: 'function ${1:name}(${2:args}) {
    $3
  }'
  },
  {
    name: 'CSS Comment', 
    description: 'adds a nice banner comment to a CSS file', 
    language: css, 
    trigger: 'comment', 
    body: '/*--------------------------------------------------------------
  # ${1:Section}
  --------------------------------------------------------------*/
  $2'
  },
  {
    name: 'Angular 1 Display Errors Component', 
    description: 'adds component to display errors', 
    language: javascript, 
    trigger: 'ng1displayerrors', 
    body: "(function() {
    'use strict';
    // Usage: Use <display-errors errors=\"vm.errors\"></display-errors> within a view
    // passing in an errors object defined within the parent scope where the component is placed.
    // Creates: an alert showing a list of the errors that occured.
    // NOTE: The html uses tachyons and bootstrap classes for styling

    var ${displayErrors} = {
      bindings: {
        errors: '='
      },
      template: '<div ng-show=\"vm.showErrors()\" class=\"mt3 alert alert-danger\" ng-bind-html=\"vm.getErrorMessage()\"></div>',
      controller: ${displayErrors}Controller,
      controllerAs: 'vm'
    };

    ${displayErrors}Controller.$inject = ['${dep}']
    function ${displayErrors}Controller (${dep}) {
      var vm = this;
      vm.errors = vm.errors || {};
      vm.showErrors = showErrors;
      vm.getErrorMessage = getErrorMessage;
      
      /////////////////////////////////////

      function showErrors() {
        if (Object.keys(vm.errors).length !== 0) {
          return true;
        } else {
          return false;
        }
      }

      function getErrorMessage(){
        var errorCount = 0;
        var errorList = '';

        errorList += '<ul class=\"pl3 list\">';
        if (Object.keys(vm.errors).length !== 0) {
          for (var field in vm.errors) {
            var fieldErrors = vm.errors[field];
            if(fieldErrors) {
              for (var i = 0 ; i < fieldErrors.length ; i++) {
                errorList += '<li>';
                errorList += String(field) + ' ' + fieldErrors[i];
                errorList += '</li>';
                errorCount++;
              }
            }
          }
          errorList += '</ul>';
        } else {
          return;
        }

        if (errorCount === 1) {
          var header = '<h4>' + errorCount + ' error prevented this record from being saved:</h4>';
        } else {
          var header = '<h4>' + errorCount + ' errors prevented this record from being saved:</h4>';
        }
        
        return header + errorList;
      }
    }

    angular
      .module('${app}')
      .component('${displayErrors}', ${displayErrors});

  })();"
  },
  {
    name: 'Angular 1 Component', 
    description: 'Adds an Angular 1 Component Template', 
    language: javascript, 
    trigger: 'ng1component', 
    body: "(function() {
    'use strict';
    // Usage:
    //
    // Creates:
    //

    var ${1:componentName} = {
      bindings: {
        ${property}: '='
      },
      templateUrl: 'app/components/${1:componentName}/${1:componentName}.html',
      controller: ${1:componentName}Controller,
      controllerAs: 'vm'
    };

    ${1:componentName}Controller.$inject = ['${2:dep}']
    function ${1:componentName}Controller (${2:dep}) {
      var vm = this;
      $3
      
      activate();
      
      /////////////////////////////////////

      function activate(){
          $4
      }
      
    }

    angular
      .module('${5:app}')
      .component('${1:componentName}', ${1:componentName});

  })();"
  },
  {
    name: 'Angular 1 UI Router Config',
    description: 'Adds UI Router configuration to Angular 1 project',
    language: javascript, 
    trigger: 'ng1uirouterconfig', 
    body: "(function() {
    'use strict';

    angular
      .module('${1:app}')
      .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('${home}', {
          url: '${/}',
          templateUrl: '${app/main/main.html}',
          controller: '${MainController}',
          controllerAs: '${vm}'
        })

      $urlRouterProvider.otherwise('/');
    }

  })();
  "
  }, 
  {
    name: 'Javascript Check if Value is Numeric',
    description: 'Javascript code that returns a boolean value regarding the numericality of a value.', 
    language: javascript, 
    trigger: 'jsnumber',
    body: '(!isNaN(parseFloat(${value})) && isFinite(${value}))'
  },
  {
    name: 'Javascript Filter Array for Unique Values',
    description: 'Code to filter out unique values in an array', 
    language: javascript, 
    trigger: 'jsuniquearray', 
    body: 'function uniqueFilter(array) {
      var seen = {};
      var out = [];
      var len = array.length;
      var j = 0;
      for(var i = 0; i < len; i++) {
          var item = array[i];
          if(seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
          }
      }
      return out;
  }'
  }, 
  {
    name: 'Rails Helper', 
    description: 'Adds rails helper to Rspec test file', 
    language: ruby, 
    trigger: 'rh',
    body: "require 'rails_helper' \n"
  },
  {
    name: 'Rails Authorization Spec with Factory Girl', 
    description: 'Adds rails authorization spec with Factory Girl', 
    language: ruby, 
    trigger: 'authspec', 
    body: "require 'rails_helper'

  feature 'Authentication'${, js: true} do
    feature 'login' do 
      scenario 'with valid inputs' do 
        @user = FactoryGirl.create(:confirmed_user)
        visit '${/sign_in}'
        fill_in '${Email}', with: @user.${email}
        fill_in '${Password}', with: @user.${password}
        find('${button}', text: '${Log in}').click
        
        expect(page).to have_content('${Log out}')
      end
    end
  end"
  },
  {
    name: 'Factory Girl User Factory', 
    description: 'Create a user factory with Factory girl including a method for a confirmed_user', 
    language: ruby, 
    trigger: 'fguserfactory', 
    body: 'FactoryGirl.define do
    factory :user do
      email { Faker::Internet.email }
      password { Faker::Internet.password(8) }
      password_confirmation { password }

      factory :confirmed_user do
        confirmed_at Time.zone.now
      end
    end
  end'
  },
  {
    name: 'Variable definition in Rspec file', 
    description: 'adds a let definition for a variable to be used in an rspec testing block',
    language: ruby, 
    trigger: 'let', 
    body: 'let(:${1:var}) { ${2:definition goes here} } $3'
  },
  {
    name: 'Context Block for Rspec Test', 
    description: 'adds a context block to an rspec spec file', 
    language: ruby, 
    trigger: 'context',
    body: 'context "${whatever}" do
    $1
  end'
  }, 
  {
    name: 'It block for Rspec test', 
    description: 'Adds an it block to an rspec spec file', 
    language: ruby, 
    trigger: 'it', 
    body: 'it "${does something cool}" do 
    $1
  end'
  },
  {
    name: 'Find or Create By (first or create)', 
    description: 'new syntax for find or create by in Ruby on Rails', 
    language: ruby,
    trigger: 'findorcreate',
    body: '${Class}.where(${query}).first_or_create'
  },
  {
    name: 'Iffe', 
    description: 'Surrounds the statement in an iffe', 
    language: javascript, 
    trigger: 'iffe', 
    body: "(function() {
    'use strict';

    ${...}

  })();"
  },
  {
    name: 'Custom Validator in Ruby on Rails', 
    description: 'Adds a custom Validation function to a Ruby on Rails Model',
    language: ruby, 
    trigger: 'railscustomvalidation',
    body: "validate :${myCustomValidation}

  def ${myCustomValidation}
    ${My}Validator.new(self).validate
  end

  include ActiveModel::Validations 

  class ${My}Validator 
    def initialize(${model})
      @${model} = ${model} 
    end
    
    def validate 
      if ${something to check}
        @${model}.errors.add(:${field_name}, ${error_message})
      end
    end
    
  end

  validate do |${model}| 
    ${My}Validator.new(${model}).validate
  end"
  },
  {
    name: "Angular UI Router New State", 
    description: "Adds a new state definition on the $stateProvider object within Angular UI Router configuration",
    language: javascript, 
    trigger: 'newstate',
    body: ".state('${stateName}', {
  url: '/${path}', 
  templateUrl: 'app/components/${createAccount}/${createAccount}.html', 
  controller: '${createAccount}Controller', 
  controllerAs: 'vm'
})"
  }, 
  {
    name: 'Angular 1 UI Router Nested Component State', 
    description: 'Adds a new state definition that will receive a resolved property from a parent route and use it to display a nested component in a nested view.',
    language: javascript, 
    trigger: 'ng1nestedcomponentroute',
    body: ".state('${parentState}.${childState}', {
  url: '/${childPath}', 
  controller: function(${resolveFromParent}) {
    var $ctrl = this;
    $ctrl.${resolveFromParent} = ${resolveFromParent};
  },
  template: '<${component-name} ${binding-name}=\"$ctrl.${resolveFromParent}\"></${component-name}>',
  controllerAs: '$ctrl'
})"
  },
  {
    name: 'Angular 1 Info Buttons linking to nested states',
    description: 'Adds a Few Bootstrap Info Buttons that can be used to link to nested states defined with UI Router',
    language: html,
    trigger: 'ng1nestedcomponentlinks' 
    body: '<h3>${Header Text}</h3>
<a class="btn btn-default" href="" ui-sref="${parentState}(${{id: {{ vm.id }} }})">${Default Link Text}</a>  
<a class="btn btn-default" href="" ui-sref="${parentState}.${childState1}(${{id: {{ vm.id }} }})">${Child State 1 Link Text}</a>
<a class="btn btn-default" href="" ui-sref="${parentState}.${childState2}(${{id: {{ vm.id }} }})">${Child State 2 Link Text}</a>
<div ui-view>
  ${defaultContent}
</div>'
  }
]
attributes_hashes.each do |attributes|
  # this line creates a new row in the user_snippets table
  # this line DOES NOT fill in the user_id column for this record
  snippet = test_user.snippets.build(attributes)
  # this line fills in the user_id column on the snippet record
  snippet.user = test_user 
  # this line fills in the author column on the snippet record 
  snippet.author = test_user.email
  # this line saves the changes made un the previous steps
  test_user.add_snippet(snippet)
end