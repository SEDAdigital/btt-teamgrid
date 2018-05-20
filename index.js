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
    
    let task = data.data[0];
    let output = task.taskName;

    function truncate( n, useWordBoundary ){
        if (this.length <= n) { return this; }
        var subString = this.substr(0, n-1);
        return (useWordBoundary 
           ? subString.substr(0, subString.lastIndexOf(' ')) 
           : subString) + "…";
    };
    // truncate string
    output = truncate.apply(output, [50, true]);

    if (task.end === null){
        //console.log(task.start, dayjs(task.start).unix());
        let running = dayjs(dayjs().subtract(1,'hour').valueOf() - dayjs(task.start).valueOf());
        output += ' ['+ running.format('HH:mm') +']';
    } else {
        output = 'Teamgrid';
    }
    
    console.log(output);
    process.exit();
});