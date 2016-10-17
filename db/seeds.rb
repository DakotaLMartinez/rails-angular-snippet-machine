# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Snippet.create(
  name: 'my first snippet', 
  description: 'the best snippet ever', 
  trigger: 'snip', 
  language: 'JavaScript', 
  body: 'var snippet = "awesomer";'
)
Snippet.create(
  name: 'my second snippet', 
  description: 'the second best snippet ever', 
  trigger: 'snip2', 
  language: 'JavaScript', 
  body: 'var snippet = "awesome";'
)
Snippet.create(
  name: '3 Column Row', 
  description: 'Adds Bootstrap 3 column row', 
  trigger: 'bsrowthreecolumns', 
  language: 'html', 
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
)
Snippet.create(
  name: 'Angular 1 Session Service', 
  description: 'Adds code for an Angular 1 Session service that stores user data in $cookies using ngCookies', 
  trigger: 'ng1sessionservice', 
  language: 'javascript', 
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
)
Snippet.create(
  name: 'Angular 1 Service Call from Controller', 
  description: 'Creates a function that calls an Angular 1 service call from within a controller', 
  trigger: 'ng1callservice', 
  language: 'javascript', 
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
)
Snippet.create(
  name: 'Bootstrap 3 Columns', 
  description: 'Adds 3 more columns to a bootstrap row', 
  language: 'html', 
  trigger: 'bsthreecolumns', 
  body: '<div class="${1:col-md-4 col-sm-6}">
	$2
</div>
<div class="${1:col-md-4 col-sm-6}">
	
</div>
<div class="${1:col-md-4 col-sm-6}">
	
</div>
')
Snippet.create(
  name: 'CSS for Background Image', 
  description: 'Adds background image to a CSS selector of your choice', 
  language: 'css', 
  trigger: 'cssbackground', 
  body: '${1:body} {
    background: url(${2:image url}) no-repeat ${3:center} ${4:center} ${5:fixed}; 
    -webkit-background-size: ${6:cover};
    -moz-background-size: ${6:cover};
    -o-background-size: ${6:cover};
    background-size: ${6:cover};
}.'
)
Snippet.create(
  name: 'Bootstrap Centered Navbar', 
  description: 'Enters HTML for simple centered bootstrap navbar', 
  language: 'html', 
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
</nav>')
Snippet.create(
  name: 'Javascript Function', 
  description: 'adds javascript function definition', 
  language: 'javascript', 
  trigger: 'fn', 
  body: 'function ${1:name}(${2:args}) {
	$3
}'
)
Snippet.create(
  name: 'CSS Comment', 
  description: 'adds a nice banner comment to a CSS file', 
  language: 'css', 
  trigger: 'comment', 
  body: '/*--------------------------------------------------------------
# ${1:Section}
--------------------------------------------------------------*/
$2'
)
Snippet.create(
  name: 'Angular 1 Display Errors Component', 
  description: 'adds component to display errors', 
  language: 'javascript', 
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
)
Snippet.create(
  name: 'Angular 1 Component', 
  description: 'Adds an Angular 1 Component Template', 
  language: 'javascript', 
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
)
Snippet.create(
  name: 'Angular 1 UI Router Config',
  description: 'Adds UI Router configuration to Angular 1 project',
  language: 'javascript', 
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
)
Snippet.create(
  name: 'Javascript Check if Value is Numeric',
  description: 'Javascript code that returns a boolean value regarding the numericality of a value.', 
  language: 'javascript', 
  trigger: 'jsnumber',
  body: '(!isNaN(parseFloat(${value})) && isFinite(${value}))'
)