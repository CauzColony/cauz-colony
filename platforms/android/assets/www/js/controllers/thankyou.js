.controller('ThankYouCtrl', function($scope, $stateParams, $sce, ProjectModels) {

  ProjectModels.getCurrent($stateParams.pid).then(function(data)
  {
    $scope.offer = data.project.offer;
    $scope.charityName = data.project.charityName;
    $scope.offerText = $scope.offer.text;
    $scope.offerText = $sce.trustAsHtml($scope.offerText);
  });

  //TODO
  $scope.offerClick = function()
  {
    if(typeof $scope.offer.link != undefined && $scope.offer.link != '')
    window.open($scope.offer.link, '_blank', 'location=no,closebuttoncaption=Done,disallowoverscroll=yes,enableViewportScale=yes,toolbarposition=top,presentationstyle=fullscreen');
  }
})