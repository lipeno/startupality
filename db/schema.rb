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

ActiveRecord::Schema.define(:version => 20130920153544) do

  create_table "cards", :force => true do |t|
    t.string   "title"
    t.string   "board"
    t.integer  "project_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "checklist_steps", :force => true do |t|
    t.string   "title"
    t.integer  "stepNumber"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "section_type_id"
  end

  create_table "expenses", :force => true do |t|
    t.integer  "april"
    t.integer  "august"
    t.integer  "december"
    t.integer  "january"
    t.integer  "february"
    t.integer  "july"
    t.integer  "june"
    t.integer  "march"
    t.integer  "may"
    t.integer  "november"
    t.integer  "october"
    t.integer  "project_id"
    t.string   "rowName"
    t.integer  "rowNumber"
    t.integer  "september"
    t.integer  "year"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "instructional_videos", :force => true do |t|
    t.string   "url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "project_checklist_steps", :force => true do |t|
    t.string   "value"
    t.boolean  "done"
    t.integer  "project_id"
    t.integer  "stepNumber"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "checklist_step_id"
  end

  create_table "projects", :force => true do |t|
    t.string   "title"
    t.boolean  "activated"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  add_index "projects", ["user_id"], :name => "index_projects_on_user_id"

  create_table "register_risks", :force => true do |t|
    t.integer  "project_id"
    t.text     "name"
    t.float    "probability"
    t.float    "impact"
    t.text     "responseAction"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "revenue_or_expenses", :force => true do |t|
    t.integer  "rowNumber"
    t.string   "rowName"
    t.integer  "project_id"
    t.integer  "january"
    t.integer  "february"
    t.integer  "march"
    t.integer  "april"
    t.integer  "may"
    t.integer  "june"
    t.integer  "july"
    t.integer  "august"
    t.integer  "september"
    t.integer  "october"
    t.integer  "november"
    t.integer  "december"
    t.integer  "year"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.boolean  "isExpense",  :default => false
  end

  create_table "risks", :force => true do |t|
    t.string   "strengths"
    t.string   "weaknesses"
    t.string   "opportunitiesPolitical"
    t.string   "opportunitiesEconomical"
    t.string   "opportunitiesSociological"
    t.string   "opportunitiesTechnical"
    t.string   "threatsPolitical"
    t.string   "threatsEconomical"
    t.string   "threatsSociological"
    t.string   "threatsTechnical"
    t.integer  "project_id"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "section_types", :force => true do |t|
    t.text     "title"
    t.text     "description"
    t.text     "questions"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "sections", :force => true do |t|
    t.text     "data"
    t.integer  "project_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.text     "tags"
    t.integer  "section_type_id"
  end

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
    t.string   "unconfirmed_email"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
  end

  add_index "users", ["confirmation_token"], :name => "index_users_on_confirmation_token", :unique => true
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["unlock_token"], :name => "index_users_on_unlock_token", :unique => true

end
