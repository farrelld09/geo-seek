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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180104234155) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hikes", force: :cascade do |t|
    t.integer "trail_id"
    t.integer "trip_id"
    t.integer "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trails", force: :cascade do |t|
    t.string "name", null: false
    t.string "type"
    t.string "summary"
    t.string "difficulty"
    t.float "stars"
    t.integer "starVotes"
    t.string "location"
    t.string "url"
    t.string "imgSqSmall"
    t.string "imgSmall"
    t.string "imgSmallMed"
    t.string "imgMedium"
    t.float "length"
    t.integer "ascent"
    t.integer "descent"
    t.integer "high"
    t.integer "low"
    t.float "longitude"
    t.float "latitude"
    t.string "conditionStatus"
    t.string "conditionDetails"
    t.datetime "conditionDate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "token"
    t.string "refresh_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
