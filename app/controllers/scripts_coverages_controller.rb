class ScriptsCoveragesController < ApplicationController
		respond_to :html, :xml, :js, :json
	TEMP_PATH="#{Rails.root}/public/tmp/coverages"
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

					unless params[:scripts_coverages].blank? or params[:scripts_coverages][:id].blank?
						logger.debug('SOME SCRIPT_FILE ID')
						scf=ScriptsCoverages.new
						scf.script_coverage_file=QqFile.parse(params['qqfile'], request)
						scf.script_id=params[:scripts_coverages][:id]
						scf.save
						img_path=scf.script_coverage_file.url(:thumb)
						@success={:action=>"edit"}
					else
						logger.debug('SOME SCRIPT ID')
						scf=ScriptsCoverages.new
						scf.script_coverage_file=QqFile.parse(params['qqfile'], request)
						scf.script_id=params[:script][:id]
						scf.save
						img_path=scf.script_coverage_file.url(:thumb)
						@success={:action=>"edit"}
					end
			end
						@success=@success.merge({:success=>true,:img_path=>:img_path,:script_file=>JSON.parse(scf.to_json(:methods=> [ :get_file_url,:order_by_date,:file_extension ]))})
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
		sf=ScriptsCoverages.find(params[:id])
		sf.destroy
		render :nothing => true
	end
end
