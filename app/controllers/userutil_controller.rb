class UserutilController < ApplicationController
	respond_to :html, :xml, :js, :json
	before_filter :authenticate_user!
	skip_before_filter :verify_authenticity_token

	def fetch_current_user
		#current_user.slice(:id,:role)
		render :json => current_user
	end

	def get_users_select2

		if params[:users_ids].blank?
			params[:users_ids]=[current_user.id]
		else
			params[:users_ids].push(current_user.id)
		end
		@user=User.select('id,email,fullname').where("id not in (?) and LOWER(email) like LOWER ('%#{params[:q]}%')",params[:users_ids]).page(1).per_page(10)
		@clone_usr=[]
		@user.each_with_index do |a,key|
			@clone_usr.push({:id=>a.id,:email=>a.email,:fullname=>a.fullname})
		end
				
		respond_with @clone_usr 
	end

	def index
	User.find(params[:id])
	end
end