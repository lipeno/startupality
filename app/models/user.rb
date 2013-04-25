class User < ActiveRecord::Base
	ROLES = %w[partner senior-executive management-executive creative-executive assistant intern]
	# Include default devise modules. Others available are:
	# :token_authenticatable, :confirmable,
	# :lockable, :timeoutable and :omniauthable
	has_many :reviews
	has_many :scripts, :through=>:scripts_users
 	has_many :scripts_users
	devise :database_authenticatable, :registerable,
				 :recoverable, :rememberable, :trackable, :validatable

	# Setup accessible (or protected) attributes for your model
	attr_accessible :email, :password, :password_confirmation, :role,:remember_me
	validates :email, :presence => true, :uniqueness => true,
                      :format => {:with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i}
	before_validation :downcase_email
		def downcase_email
			self.email = self.email.downcase if self.email.present?
		end
	# attr_accessible :title, :body
end
