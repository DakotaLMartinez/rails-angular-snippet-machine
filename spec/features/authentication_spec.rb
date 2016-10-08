require 'rails_helper'

feature 'Authentication', js: true do
  feature 'login' do
    scenario 'with valid inputs' do
      @user = FactoryGirl.create(:confirmed_user)
      visit '/#/sign_in'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Sign In").click

      expect(page).to have_content('Sign Out')
    end

    scenario 'redirect after login' do 
      @user = FactoryGirl.create(:confirmed_user)
      visit '/#/sign_in'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Sign In").click

      expect(page).to have_content('Snippets Index')
    end
  end
end