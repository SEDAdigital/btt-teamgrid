var request = require("request");
let dayjs = require('dayjs');

var options = {
    method: 'GET',
    url: 'https://api.teamgridapp.com/times',
    qs: {
        limit: '1',
        userId: '4stm3TKWPgqrdGKEh'
    },
    headers: {
        "Authorization": 'Bearer RMgJDabq2mu64nkzNzmN2jgro'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    let data = JSON.parse(body);
    if (data.status !== 'OK') {
        throw new Error();
    }
    
    task = data.data[0];

    var stopOptions = {
        method: 'POST',
        url: 'https://api.teamgridapp.com/tasks/'+task.taskId+'/stopTracking',
        body: JSON.stringify({
            time: dayjs().toISOString()
        }),
        headers: {
            "Authorization": 'Bearer RMgJDabq2mu64nkzNzmN2jgro'
        }
    };

    request(stopOptions, function (error, response, body) {
        if (error) throw new Error(error);
        process.exit();
    });    

});