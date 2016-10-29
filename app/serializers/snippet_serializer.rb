class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :trigger, :body, :user_id, :author, :user_snippets_count

  belongs_to :language, serializer: LanguageSerializer
end
