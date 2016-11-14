class DropboxUploader 
  attr_accessor :token, :secret, :user

  def initialize(token, secret, user) 
    @token = token
    @secret = secret
    @user = user
  end

  def upload_snippets 
    client = Dropbox::API::Client.new(token: @token, secret: @secret)
    upload_count = 0

    uploaded_snippets = (client.ls "vscode/snippets").collect do |lang| 
      language_name = vscode_filenames[lang.path.split('/').last]
      language = Language.find_or_create_by(name: language_name)
      snippets = JSON.parse(client.download lang.path)

      

      collection = snippets.collect do |name, snippet| 
        s = Snippet.new(name: name, description: snippet["description"], trigger: snippet["prefix"], language_id: language.id, body: snippet["body"].join("\n"), user: @user, author: @user.email)
        if (@user.add_snippet(s))
          upload_count += 1
        end
      end

      "#{upload_count} new #{language_name} #{pronoun(upload_count)} successfully uploaded to SnippetMachine from your Dropbox"
    end
    
    upload_count
  end

  private 

  def vscode_filenames 
    {
      "bat.json"=>"Batch", 
      "c.json"=>"C", 
      "cpp.json"=>"C++", 
      "clojure.json"=>"Clojure", 
      "coffeescript.json"=>"CoffeeScript", 
      "css.json"=>"CSS", 
      "diff.json"=>"Diff", 
      "dockerfile.json"=>"Dockerfile", 
      "fsharp.json"=>"F#", 
      "git-commit.json"=>"Git Commit Message", 
      "git-rebase.json"=>"Git Rebase message", 
      "go.json"=>"Go", 
      "groovy.json"=>"Groovy", 
      "handlebars.json"=>"Handlebars", 
      "html.json"=>"HTML", 
      "ini.json"=>"Ini", 
      "jade.json"=>"Jade", 
      "java.json"=>"Java", 
      "javascript.json"=>"JavaScript", 
      "javascriptreact.json"=>"JavaScriptReact", 
      "json.json"=>"JSON", 
      "less.json"=>"Less", 
      "lua.json"=>"Lua", 
      "makefile.json"=>"Makefile", 
      "markdown.json"=>"Markdown", 
      "objective-c.json"=>"Objective C", 
      "perl.json"=>"Perl", 
      "perl6.json"=>"Perl 6", 
      "php.json"=>"PHP", 
      "plaintext.json"=>"Plain Text", 
      "powershell.json"=>"PowerShell", 
      "python.json"=>"Python", 
      "r.json"=>"R", "
      razor.json"=>"Razor", 
      "ruby.json"=>"Ruby", 
      "rust.json"=>"Rust", 
      "scss.json"=>"Sass", 
      "shaderlab.json"=>"ShaderLab", 
      "shellscript.json"=>"Shell Script", 
      "sql.json"=>"SQL", 
      "swift.json"=>"Swift", 
      "typescript.json"=>"Typescript", 
      "typescriptreact.json"=>"Typescript React", 
      "vb.json"=>"Visual Basic", 
      "xml.json"=>"XML", 
      "xsl.json"=>"XSL", 
      "yaml.json"=>"YAML"
    }
  end

  def pronoun(number_of_snippets)
    if number_of_snippets == 1
      "snippet" 
    else
      "snippets"
    end
  end
end