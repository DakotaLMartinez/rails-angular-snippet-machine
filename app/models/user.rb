class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable 
          
  devise :omniauthable, omniauth_providers: [:dropbox]
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: true

  has_many :languages, through: :snippets

  has_many :user_snippets
  has_many :snippets, through: :user_snippets, dependent: :destroy

  def add_snippet(snippet)
    self.snippets << snippet if !self.snippets.include?(snippet)
    snippet.users << self if !snippet.users.include?(self)
    self.save
    user_snippet = UserSnippet.where(user: self, snippet: snippet)[0]
    user_snippet.language = snippet.language
    user_snippet.trigger = snippet.trigger
    user_snippet.save
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
  
end
