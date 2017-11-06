(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
      
            angular.element(document).ready(function() {
               new WOW({animateClass: 'animated',
                        offset:       100
                       }).init();
            });
  }
}());
