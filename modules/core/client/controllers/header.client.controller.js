(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'searchHelp'];

  function HeaderController($scope, $state, Authentication, menuService, searchHelp) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);


    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
      console.log('state changed !');
    }
      
    $scope.$on('$stateChangeStart', function(e, toState, toparam, fromState, froparams, options) {
        console.log(toState);
        console.log(fromState);
    });
      
      $scope.onSearch = function() {
          searchHelp.setSearchKey($scope.searchKeyword);
          console.log('searchKeyword :' + searchHelp.getSearchKey());
          if ($state.current.name == 'searchJobs') {
              $state.reload('searchJobs');
          }
          else {
              $state.go('searchJobs');
          }

      }
  }
}());
