class SectionType < ActiveRecord::Base
  attr_accessible :description, :questions, :title, :stringIdentifier
  has_many :sections, :dependent => :destroy
  has_many :checklist_steps, :dependent => :destroy
  has_many :instructional_videos, :dependent => :destroy
end
