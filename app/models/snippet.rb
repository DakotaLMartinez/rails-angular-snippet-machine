class Snippet < ApplicationRecord
    validates :name, presence: true
    validates :trigger, presence: true 
    validates :language, presence: true
    validates :trigger, uniqueness: { scope: [:user, :language], message: "must be unique for each language" }

    belongs_to :user
    belongs_to :language

    before_save :set_author
    before_save :save_editor_formats

    private 

    def set_author
        self.author = self.user.email
    end

    def save_editor_formats
        self.vscode = self.body.split("\n")
    end
end