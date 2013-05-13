require 'test_helper'

class ProjectChecklistStepsControllerTest < ActionController::TestCase
  setup do
    @project_checklist_step = project_checklist_steps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:project_checklist_steps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create project_checklist_step" do
    assert_difference('ProjectChecklistStep.count') do
      post :create, project_checklist_step: { done: @project_checklist_step.done, project_id: @project_checklist_step.project_id, sectionTypeIdentifier: @project_checklist_step.sectionTypeIdentifier, stepNumber: @project_checklist_step.stepNumber, value: @project_checklist_step.value }
    end

    assert_redirected_to project_checklist_step_path(assigns(:project_checklist_step))
  end

  test "should show project_checklist_step" do
    get :show, id: @project_checklist_step
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @project_checklist_step
    assert_response :success
  end

  test "should update project_checklist_step" do
    put :update, id: @project_checklist_step, project_checklist_step: { done: @project_checklist_step.done, project_id: @project_checklist_step.project_id, sectionTypeIdentifier: @project_checklist_step.sectionTypeIdentifier, stepNumber: @project_checklist_step.stepNumber, value: @project_checklist_step.value }
    assert_redirected_to project_checklist_step_path(assigns(:project_checklist_step))
  end

  test "should destroy project_checklist_step" do
    assert_difference('ProjectChecklistStep.count', -1) do
      delete :destroy, id: @project_checklist_step
    end

    assert_redirected_to project_checklist_steps_path
  end
end
