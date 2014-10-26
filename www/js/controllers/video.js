.controller('VideoCtrl', function($scope, $stateParams, $sce, $q, ProjectModels)
{
  if(screen && screen.unlockOrientation)
  {
    screen.unlockOrientation();
  }

  $scope.pid = $stateParams.pid;
  $scope.playerVars = {
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
    playsinline: 1
  };
  $scope.videoWatched = false;

  $scope.$on('youtube.player.ended', function ($event, player) {
    $scope.videoWatched = true;
    $scope.videoPlaying = false;
    if(screen && screen.lockOrientation)
    {
      screen.lockOrientation('portrait');
    }
  });

  $scope.$on('youtube.player.playing', function ($event, player) {
    $scope.videoPlaying = true;
  });

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
          updateScopeVars(data)
        }else
        {
          //go to survey page
          $scope.navigate('survey.'+data.project.steps[data.step].type, $scope.pid);
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
    $scope.steps = data.project.steps.length;
    $scope.copy = $scope.video.copy;
    $scope.copy = $sce.trustAsHtml($scope.copy);
    $scope.title = data.project.title;
  }

  fetchData().then(updateScopeVars);
})