const request  = require ("supertest");
const {app} = require ('../src/app')

describe("app", () => {
    it("should get all tasks when request url patten is './tasks'", (done) => {
        request(app).get("/tasks").expect(200).expect([
            {"id":"2","content":"Do exercise","createdTime":"2020-03-21T15:00:00Z"},{"id":"3","content":"Finish homework","createdTime":"2020-03-20T08:00:00Z"},{"id":"4","content":"Finish homework2020","createdTime":"2020-03-20T08:00:00Z"},{"id":"5","content":"Finish homework2020","createdTime":"2020-03-20T08:00:00Z"},{"id":"1","content":"Do exercise 2022","createdTime":"2020-03-21T15:00:00Z"}

        ]).end((err, res) => {
            if(err) throw err
            done()
        })
    })
    it("should get specific task when request url patten is '/tasks/:id'", (done) => {
        request(app).get('/tasks/2').expect(200).expect({
            "id":"2",
            "content":"Do exercise",
            "createdTime":"2020-03-21T15:00:00Z"
        }).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
})