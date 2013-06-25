require 'test_helper'

class InstructionalVideosControllerTest < ActionController::TestCase
  setup do
    @instructional_video = instructional_videos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:instructional_videos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create instructional_video" do
    assert_difference('InstructionalVideo.count') do
      post :create, instructional_video: { url: @instructional_video.url }
    end

    assert_redirected_to instructional_video_path(assigns(:instructional_video))
  end

  test "should show instructional_video" do
    get :show, id: @instructional_video
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @instructional_video
    assert_response :success
  end

  test "should update instructional_video" do
    put :update, id: @instructional_video, instructional_video: { url: @instructional_video.url }
    assert_redirected_to instructional_video_path(assigns(:instructional_video))
  end

  test "should destroy instructional_video" do
    assert_difference('InstructionalVideo.count', -1) do
      delete :destroy, id: @instructional_video
    end

    assert_redirected_to instructional_videos_path
  end
end
