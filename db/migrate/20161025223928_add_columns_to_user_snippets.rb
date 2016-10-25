class AddColumnsToUserSnippets < ActiveRecord::Migration[5.0]
  def change
    add_reference :user_snippets, :language, foreign_key: true
    add_column :user_snippets, :trigger, :string
  end
end
