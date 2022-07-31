class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :image, :description, :user_id
end
