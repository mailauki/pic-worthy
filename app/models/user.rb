class User < ApplicationRecord
  has_secure_password

  has_many :photos
  has_many :comments
  has_many :likes

  has_many :liked_photos, through: :likes, source: :photo

  has_many :followed_users, foreign_key: :follower_id, class_name: "Friendship"
  has_many :followees, through: :followed_users
  has_many :following_users, foreign_key: :followee_id, class_name: "Friendship"
  has_many :followers, through: :following_users

  def photos_total
    self.photos.length
  end

  def followers_total
    self.followers.length
  end

  def followees_total
    self.followees.length
  end
end
