.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels)
{
  $scope.loggedIn = false;
  $scope.user = UserModels.getUser();
  $scope.complete = false;

  $timeout(function()
  {
    if($scope.user == undefined)
    {
      $scope.navigate('home', 'home');
    }
  }, 250)

  $scope.navigate =function(state, id)
  {
    if(screen && screen.lockOrientation)
    {
      console.log(screen)
      screen.lockOrientation('portrait');
    }
    $state.go(state, {pid: id});
  }
})
