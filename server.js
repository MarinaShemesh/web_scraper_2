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
     var jsonData = 
          { downloads : "", 
            picnumber : "", 
            date: "", 
            hour:"", 
            min:"", 
            sec: ""};

      $('.tab').filter(function(){
        
        var data = $(this);

        downloads = data.children().eq(1).text();
        jsonData.downloads = downloads;

        picnumber = data.children().eq(3).text();
        jsonData.picnumber = picnumber;

        })
       
       var date = timestamp('YYYY/MM/DD');//add timestamp
       jsonData.date = date;

       var hour = timestamp('HH');
       var min = timestamp('mm');
       var sec = timestamp('ss');

       jsonData.hour = hour;
       jsonData.min = min;
       jsonData.sec = sec;


      }//end of the if error

  fs.readFile('output.json', function(err, data) {
    if (err) throw err;

    let obj = JSON.parse(data);
    if (obj.downloads != downloads) {

       let a = downloads;
       let b = obj.downloads;
     
       console.log('downloads:', a);
       console.log('obj.downloads:', b);
           

        fs.writeFile('output.json', JSON.stringify(jsonData, null, 4), function(err) {
            console.log('Done. The downloads are:', a);
            

        });//end of write file
      }//end of if 
   })//end of the read file

  })//end of scrape request


