require 'test_helper'

class ChecklistStepsControllerTest < ActionController::TestCase
  setup do
    @checklist_step = checklist_steps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:checklist_steps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create checklist_step" do
    assert_difference('ChecklistStep.count') do
      post :create, checklist_step: { done: @checklist_step.done, sectionTypeIdentifier: @checklist_step.sectionTypeIdentifier, title: @checklist_step.title, value: @checklist_step.value }
    end

    assert_redirected_to checklist_step_path(assigns(:checklist_step))
  end

  test "should show checklist_step" do
    get :show, id: @checklist_step
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @checklist_step
    assert_response :success
  end

  test "should update checklist_step" do
    put :update, id: @checklist_step, checklist_step: { done: @checklist_step.done, sectionTypeIdentifier: @checklist_step.sectionTypeIdentifier, title: @checklist_step.title, value: @checklist_step.value }
    assert_redirected_to checklist_step_path(assigns(:checklist_step))
  end

  test "should destroy checklist_step" do
    assert_difference('ChecklistStep.count', -1) do
      delete :destroy, id: @checklist_step
    end

    assert_redirected_to checklist_steps_path
  end
end
