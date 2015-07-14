.controller('AboutVideoCtrl', function($scope, $timeout, $sce, aboutVideo)
{
  $scope.videoStarted = false;
  $scope.videoPaused = false;
  $scope.posterURL = $sce.trustAsResourceUrl('http://view.vzaar.com/'+ aboutVideo +'/image');
  $scope.videoMarkup = $sce.trustAsHtml('<video id="vzvd" width="100%" height="100%" webkit-playsinline><source type="video/mp4" src="http://view.vzaar.com/'+ aboutVideo +'/video" /></video>');
  $timeout(createVideo);

  if(screen && screen.unlockOrientation)
  {
    screen.unlockOrientation();
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
    $scope.navigate('about');
  }
})