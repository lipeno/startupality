class Project < ActiveRecord::Base
  attr_accessible :activated, :title
  belongs_to :user
  has_many :sections, :dependent => :destroy
end
