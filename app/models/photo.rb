class Photo < ApplicationRecord
  belongs_to :user

  has_many :likes
  has_many :photo_tags
  has_many :tags, through: :post_tags

  def likes_total
    self.likes.length
  end
end
