require 'rails_helper'

RSpec.describe Snippet, type: :model do
  before do 
     @snippet = Snippet.new(name: ' ') 
  end
  
  context "when name is not present" do 
     it "is not valid" do 
        @snippet.name = " "
        expect(@snippet).not_to be_valid
     end
  end
end
