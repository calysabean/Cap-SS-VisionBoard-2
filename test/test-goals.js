const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

//const should = chai.should();

//const { GoalPost } = require('../models');
const {app, runServer, closeServer} = require('../server');
//const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Goals', function() {

  before(function() {
    return runServer();
  });

 
  after(function() {
    return closeServer();
  });
  
  /*
  it('should list goals on GET', function() {
    return chai
    .request(app)
    .get("/api/goals/posts")
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a("object");

     
    });
});
})*/


/*describe('Goals', function() {

  
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

 
  after(function() {
    return closeServer();
  });*/


  it('should add an item on POST', function() {
    const newItem = {category: 'Career', comments: 'String'};
     return chai.request(app)
       .post('/api/goals/posts')
       .send(newItem)
       .then(function(res) {
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.include.keys('category', 'comments');
         res.body.id.should.not.be.null;
         
         
         res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
       });
   });

 it('should list items on GET', () => {
   
    return chai.request(app)
      .get('/api/goals')
      .then( res => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['category', 'goal' ];
        res.body.forEach(function(item) {
         item.should.be.a('object');
        item.should.include.keys(expectedKeys);
        });
      });
  }); 
})
  /*

  it('should update items on PUT', function() {
    
    const updateData = {
      category: 'Yes',
      comments: 'YES'
    };

    return chai.request(app)

     .get('/api/goals/posts')
      .then(function(res) {
        updateData.id = res.body[0].id;
       
        return chai.request(app)
          .put(`/goals/${updateData.id}`)
          .send(updateData);
      })

      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it('should delete items on DELETE', function() {
    return chai.request(app)

      .get('/api/goals/posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/goals/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });*/
//});