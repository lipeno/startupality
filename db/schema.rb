# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130429143134) do

  create_table "levels", :force => true do |t|
    t.string "level"
  end

  create_table "projects", :force => true do |t|
    t.string   "title"
    t.boolean  "activated"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  add_index "projects", ["user_id"], :name => "index_projects_on_user_id"

  create_table "reviews", :force => true do |t|
    t.integer  "rating"
    t.text     "review_text"
    t.integer  "user_id"
    t.string   "reviewable_type"
    t.integer  "reviewable_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "script_files", :force => true do |t|
    t.integer  "script_id"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
    t.string   "script_file_file_name"
    t.string   "script_file_content_type"
    t.integer  "script_file_file_size"
    t.datetime "script_file_updated_at"
  end

  create_table "scripts", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "author"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.boolean  "is_overbrook", :default => false
    t.boolean  "is_private",   :default => false
  end

  add_index "scripts", ["user_id"], :name => "index_scripts_on_user_id"

  create_table "scripts_coverages", :force => true do |t|
    t.integer  "script_id"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.string   "script_coverage_file_file_name"
    t.string   "script_coverage_file_content_type"
    t.integer  "script_coverage_file_file_size"
    t.datetime "script_coverage_file_updated_at"
  end

  create_table "scripts_users", :force => true do |t|
    t.integer "script_id"
    t.integer "user_id"
  end

  add_index "scripts_users", ["script_id", "user_id"], :name => "index_scripts_users_on_script_id_and_user_id", :unique => true
  add_index "scripts_users", ["script_id"], :name => "index_scripts_users_on_script_id"
  add_index "scripts_users", ["user_id"], :name => "index_scripts_users_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "failed_attempts",        :default => 0
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.integer  "level_id"
    t.string   "full_name"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "role"
    t.boolean  "is_overbrook"
    t.string   "fullname"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["unlock_token"], :name => "index_users_on_unlock_token", :unique => true

end
