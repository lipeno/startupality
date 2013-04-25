class ScriptFilesController < ApplicationController
		respond_to :html, :xml, :js, :json
	TEMP_PATH="#{Rails.root}/public/tmp/scripts"
	  skip_before_filter :verify_authenticity_token, :only => :upload_file
	def upload_file

			# logger.debug('UPLADING FILE')
			if (params[:script].blank? or params[:script][:id].blank?)
				logger.debug('UPLADING NEW FILE')
						#filename = params['qqfile']
						tmp_folder = session[:session_id]
						#path_to_temp="#{TEMP_PATH}#{tmp_folder}"
						Dir.mkdir("#{TEMP_PATH}") unless File.exist?("#{TEMP_PATH}")
						Dir.mkdir("#{TEMP_PATH}#{tmp_folder}") unless File.exist?("#{TEMP_PATH}#{tmp_folder}")
						File.delete("#{TEMP_PATH}#{tmp_folder}/#{filename}") unless !File.exist?("#{TEMP_PATH}#{tmp_folder}/#{filename}")
						tmp_file = "#{TEMP_PATH}#{tmp_folder}/#{filename}"
						img_path="/tmp/#{tmp_folder}/#{filename}"
						newf = File.open(tmp_file, "w+b")
						str = request.body.read
						newf.write(str)
						newf.close
						@success={:action=>"new"}
			else
				# logger.debug('UPLADING ELSE FILE')

					unless params[:script_file].blank? or params[:script_file][:id].blank?
						logger.debug('SOME SCRIPT_FILE ID')
						scf=ScriptFile.new
						scf.script_file=QqFile.parse(params['qqfile'], request)
						scf.script_id=params[:script_file][:id]
						scf.save
						img_path=scf.script_file.url(:thumb)
						@success={:action=>"edit",:script_file=>scf}
					else
						logger.debug('SOME SCRIPT ID')
						scf=ScriptFile.new
						scf.script_file=QqFile.parse(params['qqfile'], request)
						scf.script_id=params[:script][:id]
						scf.save
						img_path=scf.script_file.url(:thumb)
						@success={:action=>"edit",:script_file=>scf}
					end
			end
						@success=@success.merge({:success=>true,:img_path=>img_path})
						render :json => @success

	end
	def clean_up
		unless params[:session_id].blank?
			if File.exist?("#{TEMP_PATH}#{params[:session_id]}")
				 FileUtils.rm_rf "#{TEMP_PATH}#{params[:session_id]}"
				 #logger.info("Cleaned_up:#{TEMP_PATH}#{tmp_folder}")
			end
		end
		 render :nothing => true
	end
	def destroy
		sf=ScriptFile.find(params[:id])
		sf.destroy
		render :nothing => true
	end
end
