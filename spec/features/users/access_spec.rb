require 'rails_helper'

feature 'page access', js: true do
  before do
    @user = FactoryGirl.create(:confirmed_user)
    @login_page = LoginPage.new
    @login_page.visit
  end

  scenario 'visiting new snippet page when signed in' do 
    @login_page.sign_in(@user.email, @user.password)

    expect(page).to have_content('Snippets Index')

    find('a', text: 'New Snippet').click
    expect(page).to have_css('h1', text: 'New Snippet')
  end

  scenario 'visiting new snippet page when not signed in' do 
    visit '/#/snippets/new'
    expect(page).to have_content('Sign in via email')
  end

  scenario 'redirects when signing out from the new snippets page' do 
    @login_page.sign_in(@user.email, @user.password)

    expect(page).to have_content('Snippets Index')

    find('a', text: 'New Snippet').click

    find('a', text: 'Sign Out').click
    expect(page).to have_content('Snippets Index')
  end
end