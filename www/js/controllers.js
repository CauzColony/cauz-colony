angular.module('cauz.controllers', [])
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
.controller('QuestionCtrl', function($scope) {

})
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

.controller('SurveyCtrl', function($scope) {

})
.controller('ThankYouCtrl', function($scope) {

  //TODO
  $scope.offerClick = function()
  {
    alert('Jon\'s TODO: open offer in native browser');
  }
})
.controller('VideoCtrl', function($scope, $stateParams, $sce, $q, ProjectModels)
{
  $scope.pid = $stateParams.pid;
  $scope.playerVars = {
    modestbranding: 1,
    showinfo: 0
  }

  $scope.$on('youtube.player.ended', function ($event, player) {
    $scope.player = player;
    $scope.videoWatched = true;
  });

  $scope.replay = function()
  {
    $scope.videoWatched = false;
    $scope.player.playVideo();
  }

  $scope.next = function()
  {
    if(ProjectModels.incrementProjectStep())
    {
      console.log('no thanks');
      //if a video next play
      fetchData().then(function(data)
      {
        if(data.project.steps[data.step].type === 'video')
        {
          console.log('video');
          updateScopeVars(data)
        }else
        {
          //go to survey page
          console.log('survey');
        }
      });
    }else
    {
      //go to thank you page
      $scope.navigate('thankyou', $scope.pid);
    }
  }

  //helper functions
  function fetchData()
  {
    var deferred = $q.defer();
    ProjectModels.getCurrent($scope.pid).then(function(data)
    {
      deferred.resolve(data);
    })
    return deferred.promise;
  }

  function updateScopeVars(data)
  {
    $scope.videoWatched = false;
    $scope.steps = data.project.steps;
    $scope.currentStep = data.step;
    $scope.video = $scope.steps[$scope.currentStep];
  }

  fetchData().then(updateScopeVars);
})