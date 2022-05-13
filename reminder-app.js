let http = require('http')
let https = require('https')
let path = require('path')
let bodyParser = require("body-parser");
let express = require('express')
let MAX_REMINDERS = 4;
const dbUtils = require('./db_utils');
const tableUtils = require('./table_utils')
const PORT = process.env.PORT || 5001;
const url = process.env.API_GWAY;

let app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname));
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/create", (request, response) => {
    response.render("create")
});

app.post("/create", (request, response) => {
    let { name, eventTime, alarmTime, type } = request.body;
    reminders = [];

    for (let i = 1; i <= MAX_REMINDERS; i++) {
        let currId = 'custAlarm' + i;
        if (request.body[currId] !== undefined && request.body[currId] !== "") {
            reminders.push(request.body['custAlarm' + i])
        }
    }

    let eventReminder = {
        event_name: name,
        event_time: eventTime,
        alarm_time: alarmTime,
        reminder_type: type,
        custom_reminders: reminders
    }

    dbUtils.dbCommand("insert", eventReminder);

    const options = {
        host: url,
        port: 443,
        path: '/test1/process-post',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const req = https.request(options, res => { 
        console.log(res.statusCode)
    });

    req.write(JSON.stringify(eventReminder));
    req.end();

    response.render("success");
});

app.get("/list", async (request, response) => {
    let resultList = await dbUtils.dbCommand('findAll')
    let lst = tableUtils.reminderList(resultList)
    response.render("list", {reminderTable: lst})
});

app.get("/delete", async (request, response) => {
    let resultList = await dbUtils.dbCommand('findAll')
    let lst = tableUtils.reminderList(resultList)
    response.render("delete", {reminderTable: lst})
})

app.post("/delete", async (request, response) => {
    let { toDelete } = request.body;
    await dbUtils.dbCommand('delete', toDelete);

    const options = {
        host: url,
        port: 443,
        path: '/test1/process-delete',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const req = https.request(options, res => { 
        console.log(res.statusCode)
    });

    req.write(JSON.stringify({event_name: toDelete}));
    req.end();

    let resultList = await dbUtils.dbCommand('findAll')
    let lst = tableUtils.reminderList(resultList)
    response.render("delete", {reminderTable: lst})
})

process.stdin.setEncoding("utf8");
process.stdout.write(`Web server started and running at http://localhost:${PORT}\n`);
http.createServer(app).listen(PORT);