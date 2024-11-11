/*
 * Now I have JSONs like this in my MongoDB collection:
 * {"id":171547107,"seq":280384074,"is_moving":0,"position":"{\"x\":-97.084885,\"y\":-232.3759}","shape":"{\"x\":4.7983685,\"y\":1.9409764,\"z\":1.477407}","orientation":-1.9568369,"velocity":0.0,"type":1,"heading":-1.9568369,"time_meas":1681316587212111}
 * I want to parse the position and shape strings into objects and add them as properties of the JSON object.
 * Work in road_data collection, and use aggregate to implement this, then update in place.
 */

db.road_data.updateMany({}, [
  {
    $addFields: {
      position: {
        $function: {
          body: function (position) {
            return JSON.parse(position);
          },
          args: ["$position"],
          lang: "js",
        },
      },
      shape: {
        $function: {
          body: function (shape) {
            return JSON.parse(shape);
          },
          args: ["$shape"],
          lang: "js",
        },
      },
    },
  },
]);
