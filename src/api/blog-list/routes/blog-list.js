"use strict";

/**
 * blog-list router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::blog-list.blog-list", {
  config: {
    find: {
      middlewares: [
        {
          name: "api::blog-list.blog-list-default-populate",
          config: { type: "find" },
        },
      ],
    },
    findOne: {
      middlewares: [
        {
          name: "api::blog-list.blog-list-default-populate",
          config: { type: "findOne" },
        },
      ],
    },
  },
});
