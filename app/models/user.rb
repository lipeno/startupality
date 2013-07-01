class User < ActiveRecord::Base
	ROLES = %w[partner admin normal-user premium-user]
	# Include default devise modules. Others available are:
	# :token_authenticatable, :confirmable,
	# :lockable, :timeoutable and :omniauthable
  has_many :projects, :dependent => :destroy
	devise :database_authenticatable, :registerable, :confirmable,
				 :recoverable, :rememberable, :trackable, :validatable

	# Setup accessible (or protected) attributes for your model
	attr_accessible :email, :password, :password_confirmation, :role,:remember_me
	validates :email, :presence => true, :uniqueness => true,
                      :format => {:with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i}
	before_validation :downcase_email
		def downcase_email
			self.email = self.email.downcase if self.email.present?
    end

  after_create :register_hook

  def confirm!
    super
    default_role
  end

  def default_role
    self.role = "normal-user"
    self.save
  end

  def register_hook
    @just_signed_up = true
    Analytics.identify(
        user_id: self.id,
        traits: { email: self.email, name: self.full_name}
    )
    Analytics.track(
        user_id: self.id,
        event: 'Registered'
    )
  end

  def login_hook
    if (Time.new - self.last_sign_in_at) < 600 # seconds, so 10 minutes
    else
      # do other stuff, probably a redirect
      # possibly  sign_out_and_redirect(resource_name)
    end
  end

end
