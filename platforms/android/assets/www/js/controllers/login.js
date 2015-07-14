.controller('LoginCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, ProjectModels) {
  $scope.projects;
  ProjectModels.resetAll();
  showLoader();
  $scope.hideLeft = true;

  ProjectModels.getProjects().then(function(projects){
    $scope.projects = projects;

    $ionicLoading.hide();
    $ionicSlideBoxDelegate.update();
  })

  $scope.login = function()
  {
    showLoader();
    ProjectModels.getProjectById($scope.projects[$ionicSlideBoxDelegate.currentIndex()].id)
      .then(function(p)
      {
        $ionicLoading.hide();
        $scope.navigate(p.steps[0].type, p.id);
      });
  }

  $scope.slide = function(i)
  {
    i = parseInt(i);

    if(i > 0)
    {
      $ionicSlideBoxDelegate.next();
    }else
    {
      $ionicSlideBoxDelegate.previous();
    }
  }

  $scope.checkArrows = function(i)
  {
    $scope.hideLeft = (i == 0)? true:false;
    $scope.hideRight = (i == $scope.projects.length - 1)? true:false;
  }


  function showLoader()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });
  }

})