class LoginPage
  include Capybara::DSL

  def visit 
    Capybara::visit '/#/sign_in'
  end

  def sign_in(email, password)
    fill_in "Email", with: email
    fill_in "Password", with: password
    find("button", text: "Sign In").click
  end
end