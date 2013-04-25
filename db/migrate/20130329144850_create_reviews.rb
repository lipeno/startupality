class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :review_text
      t.integer :user_id
      t.string :reviewable_type
      t.references :reviewable, :polymorphic => true
      t.timestamps
    end
  end
end
