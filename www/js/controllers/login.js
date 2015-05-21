.controller('LoginCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, ProjectModels) {
  $scope.projects;
  ProjectModels.resetAll();
  showLoader();

  ProjectModels.getProjects().then(function(projects){
    $scope.projects = projects;
    $scope.projectId = 0;

    $ionicLoading.hide();
    $ionicSlideBoxDelegate.update();
  })

  $scope.login = function()
  {
    showLoader();

    ProjectModels.getProjectById($scope.projects[$scope.projectId].id).then(function(p)
    {
      $ionicLoading.hide();
      $scope.navigate(p.steps[0].type, p.id);
    });
  }

  $scope.slide = function(i)
  {
    var i = parseInt(i);

    $scope.projectId += i;

    if($scope.projectId >= $scope.projects.length)
    {
      $scope.projectId -= $scope.projects.length;
    }else if($scope.projectId < 0)
    {
      $scope.projectId = $scope.projects.length - 1
    }
  }


  function showLoader()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });
  }

})