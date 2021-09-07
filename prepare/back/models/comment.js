module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      // MySQL에서는 users로 생성됨
      // id가 기본적으로 MySQL에서 넣어줌
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      charset: 'utf8mb4', // 이모티콘까지 넣고싶다면 mb4를 붙여줌
      collate: 'utf8mb4_general_ci', // 댓글 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
