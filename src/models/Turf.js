const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const {
  systemDateTypes,
  id,
  setIdUuid,
  createdBy,
  setUpdatedAt,
} = require('./mixins');

const { UserTurf } = require('./UserTurf');

const tableName = 'turf';

const ratingEnum = Sequelize
  .ENUM('POOR', 'GOOD', 'EXCELLENT', 'SUPERIOR');

const Turf = sequelize.define('Turf', {
  id,
  name: {
    type: Sequelize.STRING(30),
    unique: true,
  },
  season: {
    type: Sequelize.ENUM('COOL', 'WARM'),
  },

  shadeTolerant: {
    type: ratingEnum,
    field: "shade_tolerant",
  },
  heatTolerant: {
    type: ratingEnum,
    field: "heat_tolerant",
  },
  coldTolerant: {
    type: ratingEnum,
    field: "cold_tolerant",
  },
  wearResistance: {
    type: ratingEnum,
    field: "wear_resistance",
  },
  droughtTolerant: {
    type: ratingEnum,
    field: "drought_tolerant",
  },

  thatchRisk: {
    type: Sequelize.BOOLEAN,
    field: "thatch_risk",
  },

  inchesWaterNeeded: {
    type: Sequelize.INTEGER,
    field: "inches_water_needed",
  },

  daysWeekToWater: {
    type: Sequelize.INTEGER,
    field: "days_week_to_water",
  },

  mowHeightMin: {
    type: Sequelize.FLOAT,
    field: "mow_height_min",
  },

  mowHeightMax: {
    type: Sequelize.FLOAT,
    field: "mow_height_max",
  },

  phMin: {
    type: Sequelize.FLOAT,
    field: "ph_min",
  },

  phMax: {
    type: Sequelize.FLOAT,
    field: "ph_max",
  },

  fertilizeTimesPerYear: {
    type: Sequelize.INTEGER,
    field: "fertilize_times_per_year",
  },

  nitrogenLbPerYear: {
    type: Sequelize.INTEGER,
    field: "nitrogen_lb_per_year",
  },

  characteristics: {
    type: Sequelize.TEXT,
  },

  notes: {
    type: Sequelize.TEXT,
  },

  ...createdBy,
  ...systemDateTypes,
}, { tableName });

Turf.beforeCreate(setIdUuid);
Turf.afterUpdate(setUpdatedAt);

Turf.hasMany(UserTurf, {
  foreignKey: 'turfId',
  constraints: false,
});

module.exports = { Turf };
