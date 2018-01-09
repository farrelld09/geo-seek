class UsersController < ApplicationController
  def show
    @user = User.find(current_user.id)
    @current_user = current_user
  end
end
