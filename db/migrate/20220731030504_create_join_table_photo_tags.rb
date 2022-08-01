class CreateJoinTablePhotoTags < ActiveRecord::Migration[7.0]
  def change
    create_table :photo_tags do |t|
      t.integer :photo_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
