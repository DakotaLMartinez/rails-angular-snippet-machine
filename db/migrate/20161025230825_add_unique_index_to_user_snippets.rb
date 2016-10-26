class AddUniqueIndexToUserSnippets < ActiveRecord::Migration[5.0]
  def change
    add_index :user_snippets, [:user_id, :snippet_id], unique: true
    add_index :user_snippets, [:user_id, :language_id, :trigger], unique: true
  end
end
