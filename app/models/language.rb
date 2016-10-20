class Language < ApplicationRecord
  has_many :users
  has_many :snippets

end
