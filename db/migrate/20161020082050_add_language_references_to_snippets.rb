class AddLanguageReferencesToSnippets < ActiveRecord::Migration[5.0]
  def change
    remove_column :snippets, :language
    add_reference :snippets, :language, foreign_key: true
  end
end
