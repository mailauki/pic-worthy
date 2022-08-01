class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :photo

  validates :text, presence: true
end
