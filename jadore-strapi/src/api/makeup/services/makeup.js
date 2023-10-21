'use strict';

/**
 * makeup service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::makeup.makeup');
