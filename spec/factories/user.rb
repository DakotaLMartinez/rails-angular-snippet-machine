FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
    password_confirmation { password }

    factory :confirmed_user do
      confirmed_at Time.zone.now
    end

    factory :test_user do 
      email { 'test@example.com' }
      password { 'password' }
      password_confirmation { 'password' }
      confirmed_at Time.zone.now
    end

    factory :other_user do 
      email { 'other@email.com' }
      password { 'password' }
      password_confirmation { 'password' }
      confirmed_at Time.zone.now
    end
  end
end