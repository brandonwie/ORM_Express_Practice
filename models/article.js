"use strict";
const Sequelize = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {
    publishedAt() {
      const date = moment(this.createAt).format(
        "MMMM D, YYYY, h:mma"
      );
      return date;
    }
    shortDescription() {
      const shortDesc =
        this.body.length > 200
          ? this.body.substring(0, 200) + "..."
          : this.body;
      return shortDesc;
    }
  }
  Article.init(
    {
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: '"Title" is required',
          },
        },
      },
      author: Sequelize.STRING,
      body: Sequelize.TEXT,
    },
    { sequelize }
  );

  return Article;
};
