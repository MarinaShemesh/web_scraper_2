const fs = require('fs'); //gives access to our computer's file system
const request = require('request');
const cheerio = require('cheerio');//JQuery for node.js. makes iteasy to select, edit and view dom elements.
const timestamp = require('time-stamp');

mainUrl = 'https://www.publicdomainpictures.net/en/browse-author.php?a=';
chaseID = '43261';
marinaID = '15960';
url = mainUrl + marinaID;

console.log("url:", url);

request(url, function(error,response,html){
  
  if(!error && response.statusCode == 200) {

    // utilize the cheerio library on the returned html which will 
    //essentially give us jQuery functionality
     const $ = cheerio.load(html);
     
     //define the variables we want to capture

     var downloads, picnumber, date, hour, min, sec;
     var json = { downloads : "", picnumber : "", date: "", hour:"", min:"", sec: ""};

      $('.tab').filter(function(){
        
        var data = $(this);

        downloads = data.children().eq(1).text();
        json.downloads = downloads;

        picnumber = data.children().eq(3).text();
        json.picnumber = picnumber;

        })
       
       var date = timestamp('YYYY/MM/DD');//add timestamp
       json.date = date;

       var hour = timestamp('HH');
       var min = timestamp('mm');
       var sec = timestamp('ss');

       json.hour = hour;
       json.min = min;
       json.sec = sec;
       
      }

     // fs.writeFile('output.json', JSON.stringify(json, null,4), function(err){
     //  console.log('Done. Check the output.json file');
     // })
     fs.readFile('output.json', function(err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    if (obj.downloads != downloads) {
        console.log('The number has gone up');
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('Done. Your downloads are now:' + downloads);
        });
      }
   })

  })//end of scrape request




