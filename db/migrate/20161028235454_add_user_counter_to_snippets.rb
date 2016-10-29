class AddUserCounterToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_column :snippets, :user_snippets_count, :integer
  end
end
