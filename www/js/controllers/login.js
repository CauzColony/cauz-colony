.controller('LoginCtrl', function($scope, $ionicLoading, UserModels, ProjectModels, projects) {
  var user = UserModels.getUser();
  ProjectModels.resetAll();
  $ionicLoading.hide();

  $scope.loginData = {
    email: (user)? user.email:'',
    projectId: 0
  };
  $scope.projects = projects;

  $scope.showButton = function()
  {
    return $scope.loginData.email != undefined && $scope.loginData.email.length > 0;
  }

  $scope.login = function()
  {
    UserModels.login($scope.loginData).then(function(user)
    {
      $ionicLoading.hide();
      $scope.user = user;
    })
    .then(function()
    {
      var cur = $scope.loginData.projectId,
          p;
      if(cur < 0)
      {
        cur = $scope.projects.length - 1;
      }else if(cur >= $scope.projects.length)
      {
        cur -= $scope.projects.length;
      }
      p = $scope.projects[cur];
      $scope.navigate(p.steps[0].type, p.id);
    });
  }

  $scope.slide = function(i)
  {
    var i = parseInt(i);

    $scope.loginData.projectId += i;
  }


  function showLoader()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });
  }

})