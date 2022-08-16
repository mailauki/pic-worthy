class User < ApplicationRecord
  has_secure_password

  has_many :photos, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_many :liked_photos, through: :likes, source: :photo

  has_many :followed_users, foreign_key: :follower_id, class_name: "Friendship"
  has_many :followees, through: :followed_users, dependent: :destroy
  has_many :following_users, foreign_key: :followee_id, class_name: "Friendship"
  has_many :followers, through: :following_users, dependent: :destroy

  validates :username, presence: true, uniqueness: true, format: { without: /\s/, message: "cannot contain spaces" }

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
