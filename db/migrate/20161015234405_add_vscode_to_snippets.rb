class AddVscodeToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_column :snippets, :vscode, :json
  end
end
