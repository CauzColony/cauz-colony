.controller('VideoCtrl', function($scope, $stateParams, $sce, $q, $timeout, ProjectModels)
{
  $scope.videoStarted = false;
  $scope.videoPaused = false;

  if(screen && screen.unlockOrientation)
  {
    screen.unlockOrientation();
  }

  $scope.pid = $stateParams.pid;

  $scope.next = function()
  {
    if(ProjectModels.incrementProjectStep())
    {
      //console.log('no thanks');
      //if a video next play
      fetchData().then(function(data)
      {
        if(data.project.steps[data.step].type === 'video')
        {
          updateScopeVars(data)
        }else
        {
          //go to survey page
          $scope.navigate(data.project.steps[data.step].type, $scope.pid);
        }
      });
    }else
    {
      //go to thank you page
      $scope.navigate('thankyou', $scope.pid);
    }
  }

  $scope.playVideo = function()
  {
    if($scope.videoPaused || !$scope.videoStarted)
    {
      $scope.player.play();
      $scope.videoStarted = true;
      $scope.videoPaused = false;
    }else
    {
      $scope.player.pause();
      $scope.videoPaused = true;
    }
  }

  //helper functions
  function fetchData()
  {
    var deferred = $q.defer();
    ProjectModels.getCurrent().then(function(data)
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
    $scope.posterURL = $sce.trustAsResourceUrl('http://view.vzaar.com/'+ $scope.video.videoId +'/image');
    $scope.videoMarkup = $sce.trustAsHtml('<video id="vzvd" width="100%" height="100%" webkit-playsinline><source type="video/mp4" src="http://view.vzaar.com/'+ $scope.video.videoId +'/video" /></video>');
    $scope.steps = data.project.steps.length;
    $scope.text = $sce.trustAsHtml($scope.video.text);
    $scope.title = data.project.title;

    $timeout(createVideo);
  }

  function createVideo()
  {
    var options = {
        features: [],
        alwaysShowControls: false,
        success: function(media, node, player) {
          $scope.player = player;

          node.addEventListener("ended", onEnded);

          //$('.mejs-overlay-play').css('display', 'none')

          // $(Zoo.VideoPlayer.titleSelector).css('z-index', 0);
        },
        // fires when a problem is detected
        error: function (e) { 
          console.log(e);
        }
      };

    new MediaElementPlayer('#vzvd', options);
  }

  function onEnded()
  {
    $scope.next();
  }

  fetchData().then(updateScopeVars);
})