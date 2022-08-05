class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :description, :likes_total

  belongs_to :user

  has_many :likes
  has_many :tags, through: :photo_tags
end
