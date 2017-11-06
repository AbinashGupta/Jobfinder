(function () {
  'use strict';

  angular
    .module('jobs.services')
    .factory('searchFactory', searchFactory);

  function searchFactory(searchHelp, $http) {
      var service = {
          getSearchKey : getSearchKeyword,
          execSearch : execSearch
      }
      
      function getSearchKeyword () {
          return searchHelp.getSearchKey();
      }
      
      function execSearch (searchKey, ctrlScope) {
          var error, response;
          console.log('sending request ...........')
          $http.get('jobs/search', {
              params: { searchKey: searchKey }
              })
            .then(function (res) {
                console.log('response from server (search): ' + res);
                ctrlScope.jobs = res.data;
              }, function(err) {
                    error  = err;
                    console.log('Server error in search !');
              })

              if (error) {
                  return error;
              }
              else {
                  return response;
              }
          }

      return service;
  }
}());
