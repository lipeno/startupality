class RegistrationsController < Devise::RegistrationsController
  protected

  def after_inactive_sign_up_path_for(resource)
    '/registrations/notification'
  end

  def notification
    respond_to do |format|
      format.html
      format.json { head :no_content }
    end
  end

end