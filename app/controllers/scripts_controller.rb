class ScriptsController < ApplicationController
	respond_to :html, :xml, :js, :json
	TEMP_PATH="#{Rails.root}/public/tmp/"
	@@rows_per_page=4
	before_filter :authenticate_user! , :only=>[:index,:update,:create]

	def index
		@scripts=Script.includes(:scripts_users).where("(( (scripts_users.user_id = ? or scripts.user_id = ?) and scripts.is_private = true) or scripts.is_private is not true)",current_user.id,current_user.id)
		if(!params['page'].blank? && !params['limit'].blank?)
			@scripts=@scripts.order(" #{sort_column} " + " " + sort_direction).page(params['page'].to_i).per_page(params['limit'].to_i)

				unless params[:title].blank?
					title=URI.unescape(params[:title])
					title = "%#{title}%"
					@scripts=@scripts.where("LOWER(scripts.title) like LOWER(?) or LOWER(scripts.author) like LOWER(?)", title, title)
				end
				unless params[:is_overbrook].blank?
					@scripts=@scripts.where("scripts.is_overbrook = ?",params[:is_overbrook])
				end
			@scripts.each do |script|
				script.can_edit=can?(:edit,script)
				script.can_view=can?(:view,script)
				script.can_delete=can?(:delete,script)
				unless script.reviews.blank?
					count = script.reviews.count
					res = script.reviews.inject(0){|m, h|m+h.rating}
					script.rating=	(res/count.to_f).round
				end
			end
		else
			@scripts=@scripts.order('scripts.created_at DESC').page(1).per_page(@@rows_per_page)
		end

					count=@scripts.count

			#respond_with(@scripts,:methods => [:can_edit,:can_view],:include=>{:reviews=>[:rating]})
			#respond_with(@scripts)
		respond_to do |format|
			format.json {render :json =>{:count=>count,:rows=>JSON.parse(@scripts.to_json(:methods => [:can_edit,:can_view,:can_delete,:rating]))}}
			format.html
		end
	end
	def scripts_paged
		@scripts=Script.order('scripts.created_at DESC').page(params['page'].to_i).per_page(@@rows_per_page)
		#render 'script_table_rows'
	end

	def new
		@script = Script.new
	end
	def edit
		@script = Script.find(params[:id])
		respond_to do |format|
		format.html {render :edit}
	end
	end
	def show
		@script = Script.find(params[:id])
		can_review @script
		respond_to do |format|
			format.json {render :json =>JSON.parse(@script.to_json(:methods => [:can_review], :include=>[:reviews,:users,:scripts_users,{:script_files=>{:methods=> [ :get_file_url,:order_by_date,:file_extension ]}},{:scripts_coverages=>{:methods=> [ :get_file_url,:order_by_date,:file_extension ]}}]))}
			format.html
		end
	end
	def update
		@script = Script.find(params[:id])
		@script.update_attributes(params[:script])
		respond_with @scripts
	end
	def upload_scripts
		sc=Script.new()
		sc.title=params['filename']
		sc.user_id=current_user.id
		scf=ScriptFile.new
		scf.script_file=params['qqfile']
		sc.script_files << scf
		logger.debug("SCF -> #{scf.to_yaml}")
		
		sc.save
		@return={"success" => true,:script=>sc}
		render :json =>@return
		#respond_with(sc)

	end
	def create
		tmp_folder = session[:session_id]

		temp_files = Array.new
		params["script"]["user_id"]=current_user.id
		params["script"]["script_files_attributes"].each do |scf|

			temp_file_path="#{TEMP_PATH}#{tmp_folder}/#{scf['script_file_file_name']}"
			if File.exist?(temp_file_path)
				temp_file = File.new(temp_file_path,  "r")
				temp_files.push(temp_file)
				scf['script_file']=temp_file
				scf.delete('script_file_file_name')
				#scff=ScriptFile.new
				#scff.script_file=temp_file
				#logger.debug(scff.to_yaml)
				#scff.save

			end
		end
		@script =Script.new(params["script"])

		@script.save
		temp_files.each do |tmp|
			tmp.close
		end

		 FileUtils.rm_rf "#{TEMP_PATH}#{tmp_folder}"
			respond_to do |format|
				 format.js {render :json =>@script}
				 format.html
			end

		 #render :nothing => true
	end
	def destroy
		logger.debug(params)
		@script = Script.find(params[:id])
		@script.destroy
		render :json =>{:success=>true}
	end
	def review_script
		sc=Script.find(params[:script_id])
		logger.debug(params[:review])
		sc.reviews.create(params[:review])
		sc.save
		logger.debug(sc.to_yaml)
		render :json =>JSON.parse(sc.to_json(:include=>[:reviews,{:script_files=>{:methods=> [ :get_file_url ]}}]))
	end
private
	def can_review script
				unless script.reviews.blank?
						script.can_review= !(script.reviews.any? {|h| h[:user_id] == current_user.id})
					else
						script.can_review=true
				end


	end
	#TODO SORTING
	def sort_column
		#Script.column_names.include?(params[:sort]) ? params[:sort] : "scripts.title"
		sort=""
		if(params[:sort]=="created_at")
			
				sort=" scripts.#{params[:sort]} "
			
		else
			
				sort=" upper(scripts.#{params[:sort]})"
			
		end
			Script.column_names.include?(params[:sort]) ? sort : "upper(scripts.title)"
	end

	def sort_direction
		%w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
	end
end