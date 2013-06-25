class Api::RegisterRisksController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end
  # GET /register_risks
  # GET /register_risks.json
  def index
    @register_risks = @project.register_risks.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @register_risks }
    end
  end

  # GET /register_risks/1
  # GET /register_risks/1.json
  def show
    @register_risk = @project.register_risks.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @register_risk }
    end
  end

  # GET /register_risks/new
  # GET /register_risks/new.json
  def new
    @register_risk = @project.register_risks.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @register_risk }
    end
  end

  # GET /register_risks/1/edit
  def edit
    @register_risk = @project.register_risks.find(params[:id])
  end

  # POST /register_risks
  # POST /register_risks.json
  def create
    @register_risk = @project.register_risks.new(params[:register_risk])
    # It is saved properly but returns an error to rest api request
    respond_to do |format|
      if @register_risk.save
        format.html { redirect_to @register_risk, notice: 'Revenue was successfully created.' }
        format.json { render json: @register_risk}
      else
        format.html { render action: "new" }
        format.json { render json: @register_risk.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /register_risks/1
  # PUT /register_risks/1.json
  def update
    @register_risk = @project.register_risks.find(params[:id])

    respond_to do |format|
      if @register_risk.update_attributes(params[:register_risk])
        format.html { redirect_to @register_risk, notice: 'Revenue was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @register_risk.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /register_risks/1
  # DELETE /register_risks/1.json
  def destroy
    @register_risk = @project.register_risks.find(params[:id])
    @register_risk.destroy

    respond_to do |format|
      format.html { redirect_to register_risks_url }
      format.json { head :no_content }
    end
  end
end
