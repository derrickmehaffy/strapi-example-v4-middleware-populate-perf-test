"use strict";

/**
 * `blogListDefaultPopulate` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (config.type === "find") {
      if (!ctx.query.populate) {
        ctx.query.populate = {
          seoData: true,
          seoMeta: true,
          Thumbnail: {
            fields: ["id", "url"],
          },
        };

        ctx.query.fields = [
          "id",
          "BlogTitle",
          "BlogDesc",
          "updatedAt",
          "Categories",
        ];
      }
    } else if (config.type === "findOne") {
      // Do something similar but for the data you need in your findOne
    }

    await next();
  };
};
