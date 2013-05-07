class SectionType < ActiveRecord::Base
  attr_accessible :description, :questions, :title, :stringIdentifier
  has_many :sections, :dependent => :destroy
end
