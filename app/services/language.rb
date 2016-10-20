class Language
  def initialize(name)
    @language = name
  end

  def vscode
    languages[@language.to_sym][:vscode]
  end

  def sublime
    languages[@language.to_sym][:sublime]
  end

  private

  def languages
   {
      "Batch": {vscode: "bat", sublime: "source.dosbatch"},
      "C": {vscode: "c", sublime: ""},
      "C++": {vscode: "cpp", sublime: "source.c++"},
      "Clojure": {vscode: "clojure", sublime: "source.clojure"},
      "CoffeeScript": {vscode: "coffeescript", sublime: "source.coffee"},
      "CSS": {vscode: "css", sublime: "source.css"},
      "Diff": {vscode: "diff", sublime: "source.diff"},
      "Dockerfile": {vscode: "dockerfile", sublime: ""},
      "F#": {vscode: "fsharp", sublime: ""},
      "Git Commit Message": {vscode: "git-commit", sublime: ""},
      "Git Rebase message": {vscode: "git-rebase", sublime: ""},
      "Go": {vscode: "go", sublime: "source.go"},
      "Groovy": {vscode: "groovy", sublime: "source.groovy"},
      "Handlebars": {vscode: "handlebars", sublime: ""},
      "HTML": {vscode: "html", sublime: "text.html(.basic)"},
      "Ini": {vscode: "ini", sublime: ""},
      "Jade": {vscode: "jade", sublime: ""},
      "Java": {vscode: "java", sublime: "source.java"},
      "JavaScript": {vscode: "javascript", sublime: "source.js"},
      "JavaScriptReact": {vscode: "javascriptreact", sublime: ""},
      "JSON": {vscode: "json", sublime: "source.json"},
      "Less": {vscode: "less", sublime: "source.css.less"},
      "Lua": {vscode: "lua", sublime: "source.lua"},
      "Makefile": {vscode: "makefile", sublime: "source.makefile"},
      "Markdown": {vscode: "markdown", sublime: "text.html.markdown"},
      "Objective C": {vscode: "objective-c", sublime: "source.objc"},
      "Perl": {vscode: "perl", sublime: "source.perl"},
      "Perl 6": {vscode: "perl6", sublime: "source.perl"},
      "PHP": {vscode: "php", sublime: "source.php"},
      "Plain Text": {vscode: "plaintext", sublime: "text.plain"},
      "PowerShell": {vscode: "powershell", sublime: ""},
      "Python": {vscode: "python", sublime: "source.python"},
      "R": {vscode: "r", sublime: "source.r"},
      "Razor": {vscode: "razor", sublime: ""},
      "Ruby": {vscode: "ruby", sublime: "source.ruby"},
      "Rust": {vscode: "rust", sublime: ""},
      "Sass": {vscode: "scss", sublime: "source.sass"},
      "ShaderLab": {vscode: "shaderlab", sublime: ""},
      "Shell Script (Bash)": {vscode: "shellscript", sublime: "source.shell"},
      "SQL": {vscode: "sql", sublime: "source.sql"},
      "Swift": {vscode: "swift", sublime: ""},
      "Typescript": {vscode: "typescript", sublime: ""},
      "Typescript React": {vscode: "typescriptreact", sublime: ""},
      "Visual Basic": {vscode: "vb", sublime: ""},
      "XML": {vscode: "xml", sublime: "text.xml"},
      "XSL": {vscode: "xsl", sublime: "text.xml.xsl"},
      "YAML": {vscode: "yaml", sublime: "source.yaml"},
      "ActionScript": {vscode: "", sublime: ""},
      "AppleScript": {vscode: "", sublime: ""},
      "ASP": {vscode: "", sublime: ""},
      "C#": {vscode: "", sublime: ""},
      "D": {vscode: "", sublime: ""},
      "Erlang": {vscode: "", sublime: ""},
      "GraphViz": {vscode: "", sublime: ""},
      "Haskell": {vscode: "", sublime: "source.haskell"},
      "JSP": {vscode: "", sublime: "text.html.jsp"},
      "Java Properties": {vscode: "", sublime: "source.java-props"},
      "Java Doc": {vscode: "", sublime: "text.html.javadoc"},
      "BibTex": {vscode: "", sublime: "source.bibtex"},
      "Latex Log": {vscode: "", sublime: "text.log.latex"},
      "Latex Memoir": {vscode: "", sublime: "text.tex.latex.memoir"},
      "Latex": {vscode: "", sublime: "text.tex.latex"},
      "TeX": {vscode: "", sublime: "text.tex"},
      "Lisp": {vscode: "", sublime: "source.lisp"},
      "MakeFile": {vscode: "", sublime: ""},
      "Multi Markdown": {vscode: "", sublime: "text.html.markdown.multimarkdown"},
      "Matlab": {vscode: "", sublime: "source.matlab"},
      "Objective-C++": {vscode: "", sublime: "source.objc++"},
      "OCaml campl4": {vscode: "", sublime: "source.camlp4.ocaml"},
      "OCaml": {vscode: "", sublime: "source.ocaml"},
      "OCamllex": {vscode: "", sublime: "source.ocamllex"},
      "Regular Expression(python)": {vscode: "", sublime: "source.regexp.python"},
      "R Console": {vscode: "", sublime: "source.r-console"},
      "Ruby on Rails": {vscode: "", sublime: "source.ruby.rails"},
      "Ruby HAML": {vscode: "", sublime: "text.haml"},
      "SQL(Ruby)": {vscode: "", sublime: "source.sql.ruby"},
      "Regular Expression": {vscode: "", sublime: "source.regexp"},
      "RestructuredText": {vscode: "", sublime: "text.restructuredtext"},
      "Scala": {vscode: "", sublime: "source.scala"},
      "Shell Script": {vscode: "shellscript", sublime: "source.shell"},
      "Stylus": {vscode: "", sublime: "source.stylus"},
      "TCL": {vscode: "", sublime: "source.tcl"},
      "HTML(TCL)": {vscode: "", sublime: "text.html.tcl"},
      "Textile": {vscode: "", sublime: "text.html.textile"}
    }
  end
end