reseeds local:
mongoimport -h localhost:27017 -d adventure -c adventures --file dbSeed/adventure.json --jsonArray

A collaborative create your own adventure builder.
By:
  Ian Oberbillig
  Laura Gabriele
  Tyler Richards

setup:
  1. npm install
  2. install mongodb
  3. run mongodb globally
  4. seed database
  5. run `npm run devstart` in bugfreeparakeet
  6. run `npm start` in react-ui

FYI: seed is filled with hipster ipsum except for adventure in egypt!
