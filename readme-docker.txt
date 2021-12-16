/********** DOCKER *******************************/

/* BUILD */
docker build -t md-wiki:2019 .

/* RUN */
docker run -ti -p 8080:9090 md-wiki:2019 

/* INDEX PAGE */
http://localhost:8080/

/* VIEW ARTICLE PAGE */
http://localhost:8080/wiki

/* SERVER */
http://localhost:8080/articles