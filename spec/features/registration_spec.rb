require 'rails_helper'

feature "Registration", js: true do
  scenario "with valid inputs signs-in upon account creation" do
    visit '/#/sign_up' 

    @email = Faker::Internet.email
    @password = Faker::Internet.password
    fill_in "Email", with: @email
    fill_in "Password", with: @password
    fill_in "Password confirmation", with: @password
    click_on "Register"

    expect(page).to have_content('Sign Out')
  end

end