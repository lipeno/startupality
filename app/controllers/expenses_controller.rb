class ExpensesController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end
  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = @project.expenses.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @expenses }
    end
  end

  # GET /expenses/1
  # GET /expenses/1.json
  def show
    @expense = @project.expenses.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @expense }
    end
  end

  # GET /expenses/new
  # GET /expenses/new.json
  def new
    @expense = @project.expenses.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @expense }
    end
  end

  # GET /expenses/1/edit
  def edit
    @expense = @project.expenses.find(params[:id])
  end

  # POST /expenses
  # POST /expenses.json
  def create
    @expense = @project.expenses.new(params[:expense])
    # It is saved properly but returns an error to rest api request
    respond_to do |format|
      if @expense.save
        format.html { redirect_to @expense, notice: 'Expense was successfully created.' }
        format.json { render json: @expense}
      else
        format.html { render action: "new" }
        format.json { render json: @expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /expenses/1
  # PUT /expenses/1.json
  def update
    @expense = @project.expenses.find(params[:id])

    respond_to do |format|
      if @expense.update_attributes(params[:expense])
        format.html { redirect_to @expense, notice: 'Expense was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /expenses/1
  # DELETE /expenses/1.json
  def destroy
    @expense = @project.expenses.find(params[:id])
    @expense.destroy

    respond_to do |format|
      format.html { redirect_to expenses_url }
      format.json { head :no_content }
    end
  end
end
