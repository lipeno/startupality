class Script < ActiveRecord::Base
	STATUS = %w[green yeelow red]
  	is_reviewable
 	attr_accessible  :user_id, :title,:author,:script_files_attributes,:reviews_attributes,:is_overbrook,:scripts_users_attributes,:is_private
 	attr_accessor :file_name,:can_edit,:can_view,:can_delete,:rating,:can_review
 	has_many :script_files, :order => 'created_at DESC',:dependent=>:destroy
 	has_many :scripts_coverages, :class_name =>"ScriptsCoverages", :order => 'created_at DESC',:dependent=>:destroy
 	has_many :users, :through=>:scripts_users
 	has_many :scripts_users, :class_name =>"ScriptsUsers"

 	#has_many :users, :through=>:reviews
 	accepts_nested_attributes_for :script_files,:reviews,:scripts_users, :allow_destroy => true, update_only: true
 	#validates_attachment_content_type :script_file, :content_type =>['application/pdf']

end