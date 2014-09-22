.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels)
{
  $scope.loggedIn = false;
  $scope.user = UserModels.getUser();

  $timeout(function()
  {
    if($scope.user == undefined)
    {
      $scope.navigate('home');
    }
  }, 250)

  $scope.navigate =function(state, id)
  {
    $state.go(state, {pid: id});
  }
})
