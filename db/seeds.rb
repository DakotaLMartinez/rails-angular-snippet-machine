# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Snippet.create(name: 'my first snippet', description: 'the best snippet ever', trigger: 'snip', language: 'JavaScript', body: 'var snippet = "awesomer";')
Snippet.create(name: 'my second snippet', description: 'the second best snippet ever', trigger: 'snip2', language: 'JavaScript', body: 'var snippet = "awesome";')