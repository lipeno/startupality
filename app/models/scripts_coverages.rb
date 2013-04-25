class ScriptsCoverages < ActiveRecord::Base
  		
  	belongs_to :script
 	attr_accessible  :script_coverage_file,:script_id,:script_coverage_file_file_name
 	#validates_attachment_content_type :script_file, :content_type =>['application/pdf','application/doc','application/docx','application/rtf','application/text','text/plain','application/pages']
 	has_attached_file :script_coverage_file
 	#validates_attachment_content_type :script_file, :content_type =>['application/pdf']
 	def get_file_url
		self.script_coverage_file.url
	end
	def file_extension
		File.extname(self.script_coverage_file_file_name).delete "."
	end
#validate :mime_type_or_file_extension

# private
# def mime_type_or_file_extension
#   if self.file.present? &&
#      !VALID_UPLOAD_FILE_CONTENT_TYPES.include?(self.file_content_type) &&
#      !VALID_UPLOAD_FILE_EXTENSIONS.include?(Pathname.new(self.file_file_name).extname[1..-1])
#     self.errors.add(:file_file_name, "must be one of ." + VALID_UPLOAD_FILE_EXTENSIONS.join(' .'))
#   end
# end

end