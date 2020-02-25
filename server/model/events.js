const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {}

  Event.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: '标题不能为空' },
        notNull: { msg: '请输入标题' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: '描述不能为空' },
        notNull: { msg: '请输入描述' }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: '日期不能为空' },
        notNull: { msg: '请输入日期' }
      }
    }
  }, {
    sequelize
  })
  return Event
}