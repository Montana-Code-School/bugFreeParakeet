# create-react-app with a Node server on Heroku
reseeds local:
mongoimport -h localhost:27017 -d adventure -c adventures --file dbSeed/adventure.json --jsonArray
adventure2 reseed:
mongoimport -h localhost:27017 -d adventure2 -c adventures --file dbSeed/adventure2.json --jsonArray
adventure3 reseed:
mongoimport -h localhost:27017 -d adventure3 -c adventures --file dbSeed/adventure3.json --jsonArray

reseeds heroku:
mongoimport -h ds251217.mlab.com:51217 -d heroku_c3c2mz0c -c adventures -u heroku_c3c2mz0c -p qfd9iou6s80c30a19sld3iddso --file ./dbSeed/adventure.json --jsonArray

https://bugfreeparakeet.herokuapp.com/api/adventure/
