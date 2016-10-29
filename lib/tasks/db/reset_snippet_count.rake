desc "Resets the counter cache on Snippets User count" 
task reset_snippet_count: :environment do 
  Snippet.find_each { |s| Snippet.reset_counters(s.id, :user_snippets) }
end