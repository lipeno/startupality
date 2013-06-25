class CreateInstructionalVideos < ActiveRecord::Migration
  def change
    create_table :instructional_videos do |t|
      t.string :url

      t.timestamps
    end
  end
end
