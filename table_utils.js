function reminderList(reminders) {
    let res = "<table class=\"tableList\"><thead><th class=\"first\">event</th><th class=\"last\">time</th></thead><tbody>";

    if (reminders.length > 0) {
        reminders.forEach(e => {
            e.event_time = new Date(e.event_time)
        });
    
        reminders = reminders.sort((x, y) => x.event_time - y.event_time);
    
        reminders.forEach(e => {
            e.event_time = e.event_time.toDateString() + " @ " + e.event_time.toLocaleTimeString('en-US');
        })
    
        for (let i = 0; i < reminders.length; i++) {
            if (i < reminders.length - 1) {
                res += `<tr><td>${reminders[i].event_name}</td><td>${reminders[i].event_time}</td></tr>`
            } else {
                res += `<tr><td class="leftTd">${reminders[i].event_name}</td><td class="rightTd">${reminders[i].event_time}</td></tr>`
            }
        }    
    } else {
        res += `<tr><td class="leftTd emptyTd"></td><td class="rightTd emptyTd"></td></tr>`
    }
    

    res += "</tbody></table>";
    return res;
}

module.exports = { reminderList }