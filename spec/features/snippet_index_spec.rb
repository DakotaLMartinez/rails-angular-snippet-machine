require 'rails_helper'

feature 'Snippets', js: true do 
  context 'index' do 
    it 'shows a list of snippets' do 
      visit '/#/snippets'
      expect(page).to have_content('Snippets')
    end
    
  end
end