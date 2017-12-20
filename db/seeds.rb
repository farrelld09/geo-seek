# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Trail.destroy_all

trail1 = Trail.create(
      name: "Sunshine Lion's Lair Loop",
      summary: "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
      difficulty: "blue",
      stars: 4.6,
      starVotes: 52,
      location: "Boulder, Colorado",
      url: "https://www.hikingproject.com/trail/7004226/sunshine-lions-lair-loop",
      imgSqSmall: "https://cdn-files.apstatic.com/hike/7004292_sqsmall_1431704842.jpg",
      imgSmall: "https://cdn-files.apstatic.com/hike/7004292_small_1431704842.jpg",
      imgSmallMed: "https://cdn-files.apstatic.com/hike/7004292_smallMed_1431704842.jpg",
      imgMedium: "https://cdn-files.apstatic.com/hike/7004292_medium_1431704842.jpg",
      length: 5.3,
      ascent: 1302,
      descent: -1321,
      high: 5523,
      low: 6802,
      longitude: -105.2979,
      latitude: 40.02,
      conditionStatus: "All Clear",
      conditionDetails: "Dry, Some Mud - Little mud only on trail up sunshine, rest dry",
      conditionDate: "2017-11-29 12:50:42")
