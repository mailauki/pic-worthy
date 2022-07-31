class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :avatar, :dark_mode
end
