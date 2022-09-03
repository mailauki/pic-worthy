class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :username, :avatar

  def username
    object.user.username
  end

  def avatar
    object.user.avatar
  end
  
  belongs_to :user
end
