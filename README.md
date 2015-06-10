# koa-neo4j-passport-api
Koa Neo4j passport starter files

install : node (nodejs.org), neo4j (neo4j.com)

1. git clone https://github.com/justonpoints/koa-neo4j-passport-api
2. npm install (in the root of the app)
3. Add Neo4j credentials : Currently in /lib/api (this will eventually be moved)
4. node --harmony index.js (in the root of the app, --harmony required since we are using generators)

5. Login to the app
http://localhost:1337/api/login?username=foo&password=bar 

6. Make a sample query
http://localhost:1337/api/all?date=1963

Plans: 

1. To flush this out further.
2. Continue to explore the organzational theory being approached here.
	- All dependencies declared in the index.js. Dependencies are not declared in the lib files.
	- All middleware components refrenced in the /lib/lib.js file. Each instaces take at least an app depedency for the koa app.
3. Update the Neo4j queries to be more generic.
4. Add testing for the api.
