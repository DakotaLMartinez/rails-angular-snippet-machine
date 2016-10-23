class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable 
          
  devise :omniauthable, omniauth_providers: [:dropbox]
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: true

  has_many :snippets
  has_many :languages, through: :snippets
end
