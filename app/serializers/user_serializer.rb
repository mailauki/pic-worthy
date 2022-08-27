class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :avatar, :photos_total, :followers_total, :followees_total

  has_many :likes
  has_many :photos
  has_many :liked_photos
  has_many :followers
  has_many :followees
end
