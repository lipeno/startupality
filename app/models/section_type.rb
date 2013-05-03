class SectionType < ActiveRecord::Base
  attr_accessible :description, :questions, :title
  has_many :sections, :dependent => :destroy
end
