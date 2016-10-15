class AddAuthorToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_column :snippets, :author, :string
  end
end
