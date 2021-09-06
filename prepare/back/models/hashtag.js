module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      // MySQL에서는 users로 생성됨
      // id가 기본적으로 MySQL에서 넣어줌
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이모티콘까지 넣고싶다면 mb4를 붙여줌
      collate: 'utr8mb4_general_ci', // 해시태그 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};
