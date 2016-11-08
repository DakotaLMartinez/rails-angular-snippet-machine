class ChangeUsersDefaultTokenToNil < ActiveRecord::Migration[5.0]
  def change
    change_column_default(:users, :tokens, nil)

    User.find_each do |user| 
      user.tokens = nil
    end
  end
end
