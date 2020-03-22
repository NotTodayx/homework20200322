const request  = require ("supertest");
const {app} = require ('../src/app')

describe("app", () => {
    it("should get all tasks when request url patten is './tasks'", (done) => {
        request(app).get("/tasks").expect(200).expect([
            {
                "id": "1",
                "content": "Finish homework",
                "createdTime": "2020-03-20T08:00:00Z"
              },
              {
                "id": "2",
                "content": "Do exercise",
                "createdTime": "2020-03-21T15:00:00Z"
              }

        ]).end((err, res) => {
            if(err) throw err
            done()
        })
    })
})