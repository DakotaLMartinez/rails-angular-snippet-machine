class SnippetSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :trigger, :body, :user_id, :author

  belongs_to :language, serializer: LanguageSerializer
end
