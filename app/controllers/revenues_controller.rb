class RevenuesController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end
  # GET /revenues
  # GET /revenues.json
  def index
    @revenues = @project.revenues.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @revenues }
    end
  end

  # GET /revenues/1
  # GET /revenues/1.json
  def show
    @revenue = @project.revenues.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @revenue }
    end
  end

  # GET /revenues/new
  # GET /revenues/new.json
  def new
    @revenue = @project.revenues.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @revenue }
    end
  end

  # GET /revenues/1/edit
  def edit
    @revenue = @project.revenues.find(params[:id])
  end

  # POST /revenues
  # POST /revenues.json
  def create
    @revenue = @project.revenues.new(params[:revenue])
    # It is saved properly but returns an error to rest api request
    respond_to do |format|
      if @revenue.save
        format.html { redirect_to @revenue, notice: 'Revenue was successfully created.' }
        format.json { render json: @revenue, status: :created, location: @revenue }
      else
        format.html { render action: "new" }
        format.json { render json: @revenue.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /revenues/1
  # PUT /revenues/1.json
  def update
    @revenue = @project.revenues.find(params[:id])

    respond_to do |format|
      if @revenue.update_attributes(params[:revenue])
        format.html { redirect_to @revenue, notice: 'Revenue was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @revenue.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /revenues/1
  # DELETE /revenues/1.json
  def destroy
    @revenue = @project.revenues.find(params[:id])
    @revenue.destroy

    respond_to do |format|
      format.html { redirect_to revenues_url }
      format.json { head :no_content }
    end
  end
end
