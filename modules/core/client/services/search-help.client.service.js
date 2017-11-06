(function () {
  'use strict';

  angular
    .module('core')
    .factory('searchHelp', searchHelp);

  function searchHelp() {
      
    var searchKeyword;
      
    var service = {
        setSearchKey : setSearchKey,
        getSearchKey : getSearchKey
    }
    
    function setSearchKey(searchText) {
        searchKeyword = searchText;
        console.log(searchText);
    }
      
    function getSearchKey() {
        return searchKeyword;
    }
      
    return service;
  }
    
    
}());
