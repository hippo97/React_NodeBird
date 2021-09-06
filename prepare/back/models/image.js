module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      // MySQL에서는 users로 생성됨
      // id가 기본적으로 MySQL에서 넣어줌
      src: {
        type: DataTypes.STRING(200), // 이미지는 경로이기때문에 넉넉하게
        allowNull: false,
      },
    },
    {
      charset: 'utf8', // 이미지는 이모티콘 안넣을거니까 mb4뺌
      collate: 'utr8_general_ci', // 이미지 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
