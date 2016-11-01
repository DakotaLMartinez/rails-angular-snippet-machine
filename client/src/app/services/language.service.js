(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('Language', Language);

  Language.$inject = [];
  function Language() {
    this.listSupportedLanguages = listSupportedLanguages;
    this.getVscodeAbbreviation  = getVscodeAbbreviation;
    this.getSublimeAbbreviation = getSublimeAbbreviation;
    this.isSupported = isSupported;
    var vscode  = this.vsCodeAbbreviations;
    var sublime = this.getSublimeAbbreviation;
    var languages = this.supportedLanguages;
    var supported = {};

    ////////////////

    vscode = {
      "Batch": "bat",
      "C": "c",
      "C++": "cpp",
      "Clojure": "clojure",
      "CoffeeScript": "coffeescript",
      "CSS": "css",
      "Diff": "diff",
      "Dockerfile": "dockerfile",
      "F#": "fsharp",
      "Git Commit Message": "git-commit",
      "Git Rebase message": "git-rebase",
      "Go": "go",
      "Groovy": "groovy",
      "Handlebars": "handlebars",
      "HTML": "html",
      "Ini": "ini",
      "Jade": "jade",
      "Java": "java",
      "JavaScript": "javascript",
      "JavaScriptReact": "javascriptreact",
      "JSON": "json", 
      "Less": "less", 
      "Lua": "lua",
      "Makefile": "makefile",
      "Markdown": "markdown",
      "Objective C": "objective-c",
      "Perl": "perl",
      "Perl 6": "perl6",
      "PHP": "php",
      "Plain Text": "plaintext",
      "PowerShell": "powershell",
      "Python": "python",
      "R": "r",
      "Razor": "razor",
      "Ruby": "ruby",
      "Rust": "rust",
      "Sass": "scss",
      "ShaderLab": "shaderlab",
      "Shell Script (Bash)": "shellscript",
      "SQL": "sql",
      "Swift": "swift",
      "Typescript": "typescript",
      "Typescript React": "typescriptreact",
      "Visual Basic": "vb",
      "XML": "xml",
      "XSL": "xsl",
      "YAML": "yaml"
    }

    sublime = {
      "ActionScript": "source.actionscript.2",
      "AppleScript": "source.applescript",
      "ASP": "source.asp",
      "Batch": "source.dosbatch",
      "C#": "source.cs",
      "C++": "source.c++",
      "Clojure": "source.clojure",
      "CoffeeScript": "source.coffee",
      "CSS": "source.css",
      "D": "source.d",
      "Diff": "source.diff",
      "Erlang": "source.erlang",
      "Go": "source.go",
      "GraphViz": "source.dot",
      "Groovy": "source.groovy",
      "Haskell": "source.haskell",
      "HTML": "text.html(.basic)",
      "JSP": "text.html.jsp",
      "Java": "source.java",
      "Java Properties": "source.java-props",
      "Java Doc": "text.html.javadoc",
      "JSON": "source.json",
      "JavaScript": "source.js",
      "BibTex": "source.bibtex",
      "Latex Log": "text.log.latex",
      "Latex Memoir": "text.tex.latex.memoir",
      "Latex": "text.tex.latex",
      "Less": "source.css.less",
      "TeX": "text.tex",
      "Lisp": "source.lisp",
      "Lua": "source.lua",
      "MakeFile": "source.makefile",
      "Markdown": "text.html.markdown",
      "Multi Markdown": "text.html.markdown.multimarkdown",
      "Matlab": "source.matlab",
      "Objective C": "source.objc",
      "Objective-C++": "source.objc++",
      "OCaml campl4": "source.camlp4.ocaml",
      "OCaml": "source.ocaml",
      "OCamllex": "source.ocamllex",
      "Perl": "source.perl",
      "PHP": "source.php",
      "Regular Expression(python)": "source.regexp.python",
      "Python": "source.python",
      "R Console": "source.r-console",
      "R": "source.r",
      "Ruby on Rails": "source.ruby.rails",
      "Ruby HAML": "text.haml",
      "SQL(Ruby)": "source.sql.ruby",
      "Regular Expression": "source.regexp",
      "RestructuredText": "text.restructuredtext",
      "Ruby": "source.ruby",
      "Sass": "source.sass",
      "Scala": "source.scala",
      "Shell Script": "source.shell",
      "SQL": "source.sql",
      "Stylus": "source.stylus",
      "TCL": "source.tcl",
      "HTML(TCL)": "text.html.tcl",
      "Plain Text": "text.plain",
      "Textile": "text.html.textile",
      "XML": "text.xml",
      "XSL": "text.xml.xsl",
      "YAML": "source.yaml"
    }

    languages = ["Batch", "C", "C++", "Clojure", "CoffeeScript", "CSS", "Diff", "Dockerfile", "F#", "Git Commit Message", "Git Rebase message", "Go", "Groovy", "Handlebars", "HTML", "Ini", "Jade", "Java", "JavaScript", "JavaScriptReact", "JSON", "Less", "Lua", "Makefile", "Markdown", "Objective C", "Perl", "Perl 6", "PHP", "Plain Text", "PowerShell", "Python", "R", "Razor", "Ruby", "Rust", "Sass", "ShaderLab", "Shell Script (Bash)", "SQL", "Swift", "Typescript", "Typescript React", "Visual Basic", "XML", "XSL", "YAML", "ActionScript", "AppleScript", "ASP", "C#", "D", "Erlang", "GraphViz", "Haskell", "JSP", "Java Properties", "Java Doc", "BibTex", "Latex Log", "Latex Memoir", "Latex", "TeX", "Lisp", "MakeFile", "Multi Markdown", "Matlab", "Objective-C++", "OCaml campl4", "OCaml", "OCamllex", "Regular Expression(python)", "R Console", "Ruby on Rails", "Ruby HAML", "SQL(Ruby)", "Regular Expression", "RestructuredText", "Scala", "Shell Script", "Stylus", "TCL", "HTML(TCL)", "Textile"]

    supported = { "Batch": true, "C": true, "C++": true, "Clojure": true, "CoffeeScript": true, "CSS": true, "Diff": true, "Dockerfile": true, "F#": true, "Git Commit Message": true, "Git Rebase message": true, "Go": true, "Groovy": true, "Handlebars": true, "HTML": true, "Ini": true, "Jade": true, "Java": true, "JavaScript": true, "JavaScriptReact": true, "JSON": true, "Less": true, "Lua": true, "Makefile": true, "Markdown": true, "Objective C": true, "Perl": true, "Perl 6": true, "PHP": true, "Plain Text": true, "PowerShell": true, "Python": true, "R": true, "Razor": true, "Ruby": true, "Rust": true, "Sass": true, "ShaderLab": true, "Shell Script (Bash)": true, "SQL": true, "Swift": true, "Typescript": true, "Typescript React": true, "Visual Basic": true, "XML": true, "XSL": true, "YAML": true, "ActionScript": true, "AppleScript": true, "ASP": true, "C#": true, "D": true, "Erlang": true, "GraphViz": true, "Haskell": true, "JSP": true, "Java Properties": true, "Java Doc": true, "BibTex": true, "Latex Log": true, "Latex Memoir": true, "Latex": true, "TeX": true, "Lisp": true, "MakeFile": true, "Multi Markdown": true, "Matlab": true, "Objective-C++": true, "OCaml campl4": true, "OCaml": true, "OCamllex": true, "Regular Expression(python)": true, "R Console": true, "Ruby on Rails": true, "Ruby HAML": true, "SQL(Ruby)": true, "Regular Expression": true, "RestructuredText": true, "Scala": true, "Shell Script": true, "Stylus": true, "TCL": true, "HTML(TCL)": true, "Textile": true }

    function getVscodeAbbreviation(language) { 
      return vscode[language];
    }

    function getSublimeAbbreviation(language) {
      return sublime[language]
    }

    function listSupportedLanguages() {
      return languages;
    }

    function isSupported(language) {
      return supported[language];
    }
  }
})();