let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
let server = require('../server');

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Articles API',()=>{
    /**
     * Test GET Route
     */

    /* Entering wrong URL */
    describe("GET /articles",()=>{
        it("It should GET all the Articles", (done)=>{
            chai.request(server)
                .get('/article')
                .end((err,response)=>{
                    response.should.have.status(404);
                done();
            });
        });

        it("It should NOT GET all the Articles", (done)=>{
            chai.request(server)
                .get('/articles')
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(2);
                done();
            });
        });
    });

    /**
     * Test GET by name Route
     */
     describe("GET /articles/:name",()=>{
        it("It should GET Article by name", (done)=>{
            const articleName = 'wiki';
            chai.request(server)
                .get('/articles/'+articleName)
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('desc');
                    response.body.should.have.property('id').eq(2);
                done();
            });
        });

        it("It should NOT GET Article by name", (done)=>{
            const articleName = 'Hello';
            chai.request(server)
                .get('/articles/'+articleName)
                .end((err,response)=>{
                    response.should.have.status(404);
                    response.text.should.be.eq('No article found');
                done();
            });
        });
     });
    /**
     * Test POST Route
     */
    describe("POST /articles/", () => {
        it("It should POST a new Article", (done) => {
            const newArticle = {
                name: "Article 3",
                desc: 'This is desc for Article 3'
            };
            chai.request(server)                
                .post("/articles/")
                .send(newArticle)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                done();
                });
        });
        
        it("It should NOT POST a new Article without the name or desc property", (done) => {
            const newArticle2 = {
                desc: 'This is desc for Article 3'
            };
            chai.request(server)                
                .post("/articles/")
                .send(newArticle2)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Name should be 3 chars long and Description should be 10 chars long");
                done();
                });
        });
        
    });
    /**
     * Test PUT Route
     */
     describe("PUT /articles/:name", () => {
        it("It should PUT an update to Article", (done) => {
            const articleName = 'wiki';
            const newArticle = {
                desc: 'This is desc for new updated article'
            };
            chai.request(server)                
                .put("/articles/"+articleName)
                .send(newArticle)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
        it("It should PUT a new Article", (done) => {
            const articleName = 'wiki2';
            const newArticle = {
                desc: 'This is desc for new added article'
            };
            chai.request(server)                
                .put("/articles/"+articleName)
                .send(newArticle)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.text.should.be.eq('New article created');
                done();
            });
        });
    });
})