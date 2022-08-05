class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :avatar

  has_many :photos
end
