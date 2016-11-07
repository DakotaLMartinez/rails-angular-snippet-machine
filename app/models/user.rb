class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable, 
          :omniauthable, omniauth_providers: [:dropbox]
          
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: true

  has_many :languages, through: :snippets

  has_many :user_snippets
  has_many :snippets, through: :user_snippets, dependent: :destroy

  def add_snippet(snippet)
    if !UserSnippet.exists?(user: self, language: snippet.language, trigger: snippet.trigger)
      snippet.save
      UserSnippet.create(user: self, snippet: snippet, language: snippet.language, trigger: snippet.trigger)
      self.save
    else
      false
    end
  end

  def remove_snippet(snippet)
    if snippet.user === self
      "can't remove your own snippet from your collection, try deleting instead."
    else
      self.snippets.delete(snippet) if self.snippets.include?(snippet)
      snippet.users.delete(self) if snippet.users.include?(self)
      self.save
    end
  end

  def update_snippet(snippet)
    matches = UserSnippet.where(user: self, language: snippet.language, trigger: snippet.trigger)
    # if this user has a snippet with the same language and trigger already in the database
    if matches.length == 1 
      # if this is the same snippet that we just passed in, just save the snippet
      if matches.first.snippet_id == snippet.id
        snippet.save
      # if not, there's a conflict - don't do anything
      else 
        false 
      end
    # if the user doesn't already have a snippet with the same language and trigger
    # (when a user has changed the language and/or trigger of an existing snippet)
    # In addition to saving the snippet, here we'll want to update the UserSnippet record
    # as well. This way, validations on user, language and trigger will continue working.
    elsif matches.length == 0
      us = UserSnippet.where(user: self, snippet: snippet).first
      if snippet.valid?
        us.language = snippet.language
        us.trigger = snippet.trigger
        snippet.save      
        us.save
      end
    # this should never happen, we have a uniqueness index on user, language and trigger
    # so we would only see more than 1 match if the user_snippets data were corrupted.
    else
      false
    end
  
  end
  
end
