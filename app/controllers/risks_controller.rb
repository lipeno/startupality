class RisksController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end

  # GET /sections
  # GET /sections.json
  def index
    @risks = @project.risks.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @risks }
    end
  end

  # GET /sections/1
  # GET /sections/1.json
  def show
    @risk = @project.risks.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @risk }
    end
  end

  # GET /sections/new
  # GET /sections/new.json
  def new
    @risk = @project.risks.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @risk }
    end
  end

  # GET /sections/1/edit
  def edit
    @risk = @project.risks.find(params[:id])
  end

  # POST /sections
  # POST /sections.json
  def create
    @risk = @project.risks.new(params[:risk])

    respond_to do |format|
      if @risk.save
        format.html { redirect_to @risk, notice: 'Section was successfully created.' }
        format.json { render json: @risk, status: :created, location: @risk }
      else
        format.html { render action: "new" }
        format.json { render json: @risk.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /sections/1
  # PUT /sections/1.json
  def update
    @risk = @project.risks.find(params[:id])

    respond_to do |format|
      if @risk.update_attributes(params[:risk])
        format.html { redirect_to @risk, notice: 'Section was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @risk.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sections/1
  # DELETE /sections/1.json
  def destroy
    @risk = @project.risks.find(params[:id])
    @risk.destroy

    respond_to do |format|
      format.html { redirect_to sections_url }
      format.json { head :no_content }
    end
  end
end
