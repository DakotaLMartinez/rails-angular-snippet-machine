class CreateSnippets < ActiveRecord::Migration[5.0]
  def change
    create_table :snippets do |t|
      t.string :name, null: false
      t.string :description
      t.string :language
      t.string :trigger
      t.text :body

      t.timestamps
    end
    
    add_index :snippets, :trigger, unique: true
  end
end
