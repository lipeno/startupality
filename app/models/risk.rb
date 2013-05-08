class Risk < ActiveRecord::Base
  attr_accessible :opportunitiesEconomical, :opportunitiesPolitical, :opportunitiesSociological, :opportunitiesTechnical, :project_id, :strengths, :threatsEconomical, :threatsPolitical, :threatsSociological, :threatsTechnical, :weaknesses
  belongs_to :project
end
