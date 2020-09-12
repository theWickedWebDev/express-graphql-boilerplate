const {
  createBlade,
  updateBlade,
  deleteBlade,
} = require('./BladeMutation');

const {
  createPower,
  updatePower,
  deletePower,
} = require('./PowerMutation');

module.exports = {
  createBlade,
  updateBlade,
  deleteBlade,

  createPower,
  updatePower,
  deletePower,
};
