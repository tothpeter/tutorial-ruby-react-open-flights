# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


tables_to_truncate = %w(reviews airlines)

puts "Truncating tables: #{tables_to_truncate.join(', ')}"
ActiveRecord::Base.connection.execute("TRUNCATE #{tables_to_truncate.join(',')} RESTART IDENTITY")

puts 'Creating records'

airlines = Airline.create([
  {
    name: 'United Airlines',
    image_url: 'https://open-flights.s3.amazonaws.com/United-Airlines.png'
  },
  {
    name: 'Southwest',
    image_url: 'https://open-flights.s3.amazonaws.com/Southwest-Airlines.png'
  },
  {
    name: 'Delta',
    image_url: 'https://open-flights.s3.amazonaws.com/Delta.png'
  },
  {
    name: 'Alaska Airlines',
    image_url: 'https://open-flights.s3.amazonaws.com/Alaska-Airlines.png'
  },
  {
    name: 'JetBlue',
    image_url: 'https://open-flights.s3.amazonaws.com/JetBlue.png'
  },
  {
    name: 'American Airlines',
    image_url: 'https://open-flights.s3.amazonaws.com/American-Airlines.png'
  }
])

movies = Review.create(
  [
    {
      title: 'Good',
      description: 'Good Desc',
      score: 5.0,
      airline: airlines.first
    },
    {
      title: 'Bad',
      description: 'Bad Desc',
      score: 1.0,
      airline: airlines.first
    },

    {
      title: 'Ok',
      description: 'Ok Desc',
      score: 4.0,
      airline: airlines[1]
    },
  ]
)
