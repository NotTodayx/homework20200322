const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

app.get('/tasks', (req, res) => fs.readFile('./data.json','utf-8',
(err,data) => {
    if (err) {
        res.status(500).send()
    } else {
        res.json(JSON.parse(data))
    }
}))

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    const file = await asyncReadFile('./data.json')
    const tasks = JSON.parse(file).filter(v => v.id === id)
    id.length == 0 ? res.status(404).send() : res.send(tasks[0])
})



const asyncReadFile = function (path) {
    return new Promise (
        function (resolve, request) {
            fs.readFile('./data.json','utf-8',function(err,data) {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        }).catch( err => {
            return err
        })
}

const asyncWriteFile = function(string, path) {
    return new Promise (
        function (resolve, reject) {
            fs.writeFile(path, string, function(err) {
                reject(err)
            })
        }
    ).catch( err => {
        return err
    })
}
//定义creatTask方法,SyntaxError: await is only valid in async function
const creatTask = async (req, res) => {
    const newTask = req.body
    const file = await asyncReadFile('./data.json')
    const tasks = JSON.parse(file)
    if(tasks.filter(v => v.id === newTask.id).length != 0) {
        res.status(400).send()
    } else {
        tasks.push(newTask)
        await asyncWriteFile(JSON.stringify(tasks), './data.json')
        res.status(200).send()
    }
}
app.post('/tasks', creatTask)


const updateTask = async (req, res) => {
    const put = req.body
    const file = await asyncReadFile('./data.json')
    const tasks = JSON.parse(file)
    const candidates = tasks.filter(v => v.id === put.id)
    if (candidates.length === 0) {
      this.createTask(req, res)
    } else {
      tasks.forEach((value, index, array) => {
        if (value.id === put.id) {
          array[index] = {
            ...value,
            ...put
          }
        }
      })
      await asyncWriteFile(JSON.stringify(tasks), './data.json')
      res.status(200).send()
    }
  }
app.put("/accounts", updateTask)
//app.delete("/accounts/:id", deleteTask)

app.listen(port, () => console.log(`Our server has been setup,Example app listening on port ${port}!`))
exports.app = app;