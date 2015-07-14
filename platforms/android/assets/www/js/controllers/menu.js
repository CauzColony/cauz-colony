.controller('MenuCtrl', function($scope, ProjectModels, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading...'
  });

  ProjectModels.getProjects().then(function(data)
  {
    $ionicLoading.hide();
    $scope.projects = data;
  })
})