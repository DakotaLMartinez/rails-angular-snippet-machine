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
  has_many :snippets, through: :user_snippets

  def add_snippet(snippet)
    self.snippets << snippet if !self.snippets.include?(snippet)
    snippet.users << self if !snippet.users.include?(self)
    self.save
  end
  
end
