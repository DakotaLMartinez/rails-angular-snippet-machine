class FixUniquenessValidationOnTriggerInSnippets < ActiveRecord::Migration[5.0]
  def change
    remove_index :snippets, :trigger
    add_index :snippets, [:user_id, :language, :trigger], unique: true
  end
end
