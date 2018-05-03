  angular.module('scrapeApp')
      .service('scrapeService', scrapeService);

     scrapeService.$inject = ['$http'];
     function scrapeService($http){

        function getScrapeInfo() {
          return $http.get('./output.json');
       
         }

           return {
             getScrapeInfo: getScrapeInfo

         }

 
 }//end of service

