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