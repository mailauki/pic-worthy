class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :description, :user_id

  belongs_to :user
end
