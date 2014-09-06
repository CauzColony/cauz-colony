.controller('ProjectCtrl', function($scope, $stateParams, ProjectModels) {
  $scope.pid = $stateParams.pid;
  ProjectModels.getProjectById($scope.pid).then(function(data)
  {
    $scope.title = data.title;
    $scope.desc = data.desc;
    $scope.image = data.image;
    $scope.pid = data.id;
    $scope.firstType = data.steps[0].type;
  });

  $scope.goto = function()
  {
    $scope.navigate($scope.firstType, $scope.pid);
  }
})