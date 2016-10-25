class UserSnippet < ApplicationRecord
  belongs_to :user
  belongs_to :snippet
  belongs_to :language
end
