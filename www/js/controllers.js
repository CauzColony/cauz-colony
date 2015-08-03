angular.module('cauz.controllers', [])
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
.controller('LoginCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, ProjectModels) {
  $scope.projects;
  ProjectModels.resetAll();
  showLoader();
  $scope.hideLeft = true;

  ProjectModels.getProjects().then(function(projects){
    $scope.projects = projects;

    $ionicLoading.hide();
    $ionicSlideBoxDelegate.update();
  })

  $scope.login = function()
  {
    showLoader();
    ProjectModels.getProjectById($scope.projects[$ionicSlideBoxDelegate.currentIndex()].id)
      .then(function(p)
      {
        $ionicLoading.hide();
        $scope.navigate(p.steps[0].type, p.id);
      });
  }

  $scope.slide = function(i)
  {
    i = parseInt(i);

    if(i > 0)
    {
      $ionicSlideBoxDelegate.next();
    }else
    {
      $ionicSlideBoxDelegate.previous();
    }
  }

  $scope.checkArrows = function(i)
  {
    $scope.hideLeft = (i == 0)? true:false;
    $scope.hideRight = (i == $scope.projects.length - 1)? true:false;
  }


  function showLoader()
  {
    $ionicLoading.show({
      template: 'Loading...'
    });
  }

})
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
    if($scope.firstType === 'survey')
      $scope.firstType = 'survey.' + data.steps[0].questions[0].type;
  });

  $scope.goto = function()
  {
    $scope.navigate($scope.firstType, $scope.pid);
  }
})
.controller('QuestionCtrl', function($scope) {
	
})
.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels, $ionicSideMenuDelegate, $cordovaSocialSharing)
{
  $scope.loggedIn = false;
  $scope.user = UserModels.getUser();
  $scope.complete = false;

  $scope.navigate = function(state, id)
  {
    if(state === 'login')
    {
      $ionicLoading.show({
        template: 'Loading...'
      });
    }
    
    $state.go(state, {pid: id});
  }

  $scope.toggleLeft = function()
  {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('SurveyCtrl', function($scope, $stateParams, $sce, ProjectModels) {
  $scope.pid = $stateParams.pid;
  ProjectModels.getCurrent($scope.pid).then(function(data)
  {
    setQuestion(data);
  });

  $scope.setAnswer = function(answer)
  {
    ProjectModels.setAnswer(answer).then(function(data)
    {
      if(data.step < data.project.steps.length)
      {
        setQuestion(data);
      }else
      {
        ProjectModels.submitAnswers().then(function()
        {
          $scope.navigate('thankyou', $scope.pid);
        })
      }
    });
  }

  $scope.select = function(id)
  {
    $scope.answer = id;
  }

  $scope.submit = function(answer)
  {
    $scope.setAnswer({
      questionId: $scope.question._id,
      answer: answer + 1
    });
  }

  function setQuestion(data)
  {
    $scope.currentStep = data.step;
    $scope.title = data.project.title;
    $scope.steps = data.project.steps;
    $scope.question = data.project.steps[$scope.currentStep];
    $scope.steps = data.project.steps.length;
    $scope.placeholder = (data.project.optional)? 'Optional':'Enter answer';
    $scope.qText = $scope.question.text;
    $scope.qText = $sce.trustAsHtml($scope.qText);
    $scope.answer = null;

    $scope.navigate($scope.question.type, $scope.pid);
  }
})
.controller('SurveyCheckAllCtrl', function($scope) {
  $scope.answer = [];

  $scope.select = function(id)
  {
    if(_.contains($scope.answer, id))
    {
      $scope.answer = _.filter($scope.answer, function(item){ return item !== id});
    }else
    {
      $scope.answer.push(id);
    }
  }
})
.controller('SurveyMultipleChoiceCtrl', function($scope) {
  $scope.labels = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];

  $scope.submit = function(answer)
  {
    $scope.setAnswer({
      questionId: $scope.question._id,
      answer: $scope.labels[answer]
    });
  }
})
.controller('SurveySelectCtrl', function($scope) {
  $scope.answer = 'Select One';
})
.controller('SurveyOpenCtrl', function($scope) {
  $scope.answer = '';
  $scope.showSubmit = function()
  {
    return $scope.answer != '';
  }

  $scope.submit = function(answer)
  {
    $scope.setAnswer({
      questionId: $scope.question._id,
      answer: answer
    });
  }
})
.controller('ThankYouCtrl', function($scope, $stateParams, $sce, ProjectModels) {

  ProjectModels.getCurrent($stateParams.pid).then(function(data)
  {
    $scope.shareMessage = data.project.shareMessage;
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

  $scope.share = function()
  {
    $cordovaSocialSharing
      .share(
        $scope.shareMessage.message,
          $scope.shareMessage.subject,
          $scope.shareMessage.image.url,
          $scope.shareMessage.link)
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }
})
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