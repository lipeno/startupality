class SessionsController < Devise::SessionsController
  def create
    user = User.find_by_email(params[:user][:email])
    if user
    Analytics.identify(
        user_id: user.id,
        traits: { email: user.email, name: user.full_name}
    )
    Analytics.track(
        user_id: user.id,
        event: 'Signed in'
    )
    end
    super
  end
end