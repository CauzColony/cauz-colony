.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels)
{
  $scope.loginData = {};
  $scope.showThanks = false;
  $scope.showMenu = false;
  $scope.loggedIn = false;
  $scope.user = UserModels.getUser();

  $timeout(function()
  {
    if($scope.user == undefined)
    {
      $scope.navigate('home');
    }
  }, 250)

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

    if(state === 'thankyou')
    {
      $scope.showMenu = false;
      $scope.showThanks = true;
    }else
    {
      $scope.showThanks = false;
      if($scope.user != null)
      {
        $scope.showMenu = true;
      }
    }

    $state.go(state, {pid: id});
  }

  $scope.doLogin = function()
  {
    showLoader();

    UserModels.login($scope.loginData).then(function(user)
    {
      loginHelper(user);
    });
  }

  $scope.register = function()
  {
    showLoader();

    UserModels.register($scope.loginData).then(function(user)
    {
      loginHelper(user);
    });
  }


  function showLoader()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });
  }

  //login helper function
  function loginHelper(user)
  {
    $scope.closeModal();
    $ionicLoading.hide();
    $scope.showMenu = true;
    $scope.loggedIn = true;

    $scope.user = user;
  }
})
