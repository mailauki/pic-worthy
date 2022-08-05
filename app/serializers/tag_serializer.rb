class TagSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :photos, through: :photo_tags
end
