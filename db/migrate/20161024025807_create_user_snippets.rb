class CreateUserSnippets < ActiveRecord::Migration[5.0]
  def change
    create_table :user_snippets do |t|
      t.references :user, foreign_key: true
      t.references :snippet, foreign_key: true

      t.timestamps
    end
  end
end
