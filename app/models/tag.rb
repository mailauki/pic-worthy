class Tag < ApplicationRecord
  has_many :photo_tags
  has_many :photos, through: :photo_tags

  validates :name, presence: true, format: { with: /\A[a-zA-Z\s]+\z/i, message: "can only contain letters"}
end
