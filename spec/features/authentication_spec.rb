require 'rails_helper'

feature 'Authentication', js: true do
  before do
    @user = FactoryGirl.create(:confirmed_user)
    visit '#/sign_in'
    @login_page = LoginPage.new
    @login_page.sign_in(@user.email, @user.password)
  end

  feature 'login' do
    scenario 'with valid inputs' do
      expect(page).to have_content('Sign out')
    end

    scenario 'redirect after login' do
      expect(page).to have_content('Snippets Index')
    end
  end
end