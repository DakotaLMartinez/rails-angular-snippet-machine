class AddUserRefToSnippets < ActiveRecord::Migration[5.0]
  def change
    add_reference :snippets, :user, foreign_key: true
  end
end
