class User < ActiveRecord::Base
	ROLES = %w[partner admin normal-user premium-user]
	# Include default devise modules. Others available are:
	# :token_authenticatable, :confirmable,
	# :lockable, :timeoutable and :omniauthable
  has_many :projects, :dependent => :destroy
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
  after_create :default_role

  def default_role
    self.role = "normal-user"
    self.save
  end
	# attr_accessible :title, :body
end
