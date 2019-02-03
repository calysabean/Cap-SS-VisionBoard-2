const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const { TEST_DATABASE_URL } = require('../config');


const should = chai.should();


chai.use(chaiHttp);

describe('Goals', function() {

  
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

 
  after(function() {
    return closeServer();
  });

  it('should list items on GET', function() {
   
    return chai.request(app)
      .get('/goals')
      .then( res => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['category', 'goal'];
        res.body.forEach(function(item) {
         // item.should.be.a('object');
          item.should.include.keys(expectedKeys);

        });
      });
  });

  
  it('should add an item on POST', function() {
   const newItem = {category: 'a', comments: [], goal: 'WIN'};
    return chai.request(app)
      .post('/goals')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('category', 'goal');
        res.body.id.should.not.be.null;
        
        
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });


  it('should update items on PUT', function() {
    
    const updateData = {
      category: 'Yes',
      goal: 'YES',
      checked: true
    };

    return chai.request(app)

     .get('/goals')
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

      .get('/goals')
      .then(function(res) {
        return chai.request(app)
          .delete(`/goals/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});