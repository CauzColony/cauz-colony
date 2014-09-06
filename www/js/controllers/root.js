.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, UserModels)
{
  $scope.loginData = {};

  $scope.openModal = function(t)
  {
    $scope.closeModal().then(function()
    {
      $ionicModal.fromTemplateUrl('templates/' + t, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    });
  };

  $scope.closeModal = function()
  {
    var deferred = $q.defer();
    if($scope.modal)
    {
      $scope.modal.hide().then(function()
      {
        $scope.modal.remove();
        $scope.modal = null;
        deferred.resolve();
      });
    }else
    {
      deferred.resolve();
    }
    return deferred.promise;
  };

  $scope.navigate =function(state, id)
  {
    if($scope.modal)
    {
      $scope.closeModal();
    }

    $state.go(state, {pid: id});
  }

  $scope.loggedIn = function()
  {
    $scope.user = UserModels.getUser();

    return $scope.user;
  }

  $scope.doLogin = function()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });

    UserModels.login($scope.loginData).then(function(user)
    {
      $scope.closeModal();

      $ionicLoading.hide();
    });
  }

  $scope.register = function()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });

    UserModels.register($scope.loginData).then(function(user)
    {
      $scope.closeModal();

      $ionicLoading.hide();
    });
  }
})
