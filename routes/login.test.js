const loginRouter = require('./login');
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRouter);


//faster to test via frontend...

test("facebook authentication and jwt ", done => {
  request(app)
    .get("/login/oauth2/facebook")
    .expect('user', 'xxx')
    .then(() => {
      request(app)
        .get("/login/oauth2/facebook/redirect")
        .expect('user', 'user')
        .expect('jwt', 'xxx')
        .expect(200, done)
        
    });
});
