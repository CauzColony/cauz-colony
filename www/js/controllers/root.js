.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels, $ionicSideMenuDelegate)
{
  $scope.loggedIn = false;
  $scope.user = UserModels.getUser();
  $scope.complete = false;

  $scope.navigate = function(state, id)
  {
    if(state === 'login')
    {
      $ionicLoading.show({
        template: 'Loading...'
      });
    }

    if(screen && screen.lockOrientation)
    {
      screen.lockOrientation('portrait');
    }
    $state.go(state, {pid: id});
  }

  $scope.toggleLeft = function()
  {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
