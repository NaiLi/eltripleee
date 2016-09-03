'use strict';
module.exports = function (req, res) {
  // TODO: fetch real data.
  // Mock data.
  let data = {
    0: {
      0: { // time.
        pulse: 70,
        accelleration: 1.01,
        location: [1, 2, 3]
      }
    }
  };

  let json = JSON.stringify(data);
  res.send(json);
}