class Api::InstructionalVideosController < ApplicationController
  # GET /instructional_videos
  # GET /instructional_videos.json
  def index
    @instructional_videos = InstructionalVideo.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @instructional_videos }
    end
  end

  # GET /instructional_videos/1
  # GET /instructional_videos/1.json
  def show
    @instructional_video = InstructionalVideo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @instructional_video }
    end
  end

  # GET /instructional_videos/new
  # GET /instructional_videos/new.json
  def new
    @instructional_video = InstructionalVideo.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @instructional_video }
    end
  end

  # GET /instructional_videos/1/edit
  def edit
    @instructional_video = InstructionalVideo.find(params[:id])
  end

  # POST /instructional_videos
  # POST /instructional_videos.json
  def create
    @instructional_video = InstructionalVideo.new(params[:instructional_video])

    respond_to do |format|
      if @instructional_video.save
        format.html { redirect_to @instructional_video, notice: 'Instructional video was successfully created.' }
        format.json { render json: @instructional_video, status: :created, location: @instructional_video }
      else
        format.html { render action: "new" }
        format.json { render json: @instructional_video.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /instructional_videos/1
  # PUT /instructional_videos/1.json
  def update
    @instructional_video = InstructionalVideo.find(params[:id])

    respond_to do |format|
      if @instructional_video.update_attributes(params[:instructional_video])
        format.html { redirect_to @instructional_video, notice: 'Instructional video was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @instructional_video.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /instructional_videos/1
  # DELETE /instructional_videos/1.json
  def destroy
    @instructional_video = InstructionalVideo.find(params[:id])
    @instructional_video.destroy

    respond_to do |format|
      format.html { redirect_to instructional_videos_url }
      format.json { head :no_content }
    end
  end
end
