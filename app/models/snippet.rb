class Snippet < ApplicationRecord
    validates :name, presence: true
    validates :trigger, presence: true 
    validates :language_id, presence: true

    belongs_to :user
    belongs_to :language

    has_many :user_snippets
    has_many :users, through: :user_snippets, dependent: :destroy
    

    before_save :save_editor_formats

    private

    def save_editor_formats
        self.vscode = self.body.split("\n")
    end
end