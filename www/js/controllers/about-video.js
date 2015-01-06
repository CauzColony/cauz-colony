.controller('AboutVideoCtrl', function($scope, aboutVideo)
{
  if(screen && screen.unlockOrientation)
  {
    screen.unlockOrientation();
  }

  $scope.playerVars = {
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
    playsinline: 1
  };

  $scope.video = aboutVideo;

  $scope.$on('youtube.player.ended', function ($event, player) {
    $scope.navigate('about');
    
    screen.lockOrientation('portrait');
  });

  $scope.$on('youtube.player.playing', function ($event, player) {
    $scope.videoPlaying = true;
  });
})