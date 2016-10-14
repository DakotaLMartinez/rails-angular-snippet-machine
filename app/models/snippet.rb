class Snippet < ApplicationRecord
    validates :name, presence: true
    validates :trigger, presence: true 
    validates :language, presence: true
    validates :trigger, uniqueness: { scope: [:user, :language], message: "must be unique for each language" }

    belongs_to :user
end