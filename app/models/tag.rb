class Tag < ApplicationRecord
  has_many :photo_tags
  has_many :photos, through: :phot_tags

  validates :name, presence: true
end
