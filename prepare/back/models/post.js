module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      // MySQL에서는 users로 생성됨
      // id가 기본적으로 MySQL에서 넣어줌
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이모티콘까지 넣고싶다면 mb4를 붙여줌
      collate: 'utr8mb4_general_ci', // 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 게시글은 작성자에게 속함
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, {
      through: 'Like',
      as: 'Likers',
    });
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 리트윗
  };
  return Post;
};
