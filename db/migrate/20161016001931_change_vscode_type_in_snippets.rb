class ChangeVscodeTypeInSnippets < ActiveRecord::Migration[5.0]
  def change
    change_column :snippets, :vscode, 'json USING CAST(vscode AS json)'
  end
end
