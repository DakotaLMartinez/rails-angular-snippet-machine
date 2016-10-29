class UserSnippet < ApplicationRecord
  belongs_to :user
  belongs_to :snippet, counter_cache: true
  belongs_to :language
end
