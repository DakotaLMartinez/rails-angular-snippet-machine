class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable 
          # :omniauthable
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: true

  has_many :snippets
  before_save do 
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end
end
