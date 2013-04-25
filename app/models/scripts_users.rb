class ScriptsUsers < ActiveRecord::Base
	attr_accessible  :user_id, :script_id
	belongs_to :script 
	belongs_to :user 
	
end