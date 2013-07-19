class Api::SectionTypesController < ActionController::Base
  def index
    @sectionTypes = SectionType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @sectionTypes }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @sectionType = SectionType.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @sectionType }
    end
  end
end
