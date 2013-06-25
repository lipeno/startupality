class RegisterRisk < ActiveRecord::Base
  attr_accessible :name, :probability, :impact, :responseAction, :project_id
  belongs_to :project
end
