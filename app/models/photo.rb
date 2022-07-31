class Photo < ApplicationRecord
  belongs_to :user

  has_many :photo_tags
  has_many :tags, through: :post_tags
end
