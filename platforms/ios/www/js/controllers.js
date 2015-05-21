angular.module('cauz.controllers', [])
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
.controller('LoginCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate, ProjectModels) {
  $scope.projects;
  ProjectModels.resetAll();
  showLoader();

  ProjectModels.getProjects().then(function(projects){
    $scope.projects = projects;
    $scope.projectId = 0;

    $ionicLoading.hide();
    $ionicSlideBoxDelegate.update();
  })

  $scope.login = function()
  {
    showLoader();

    ProjectModels.getProjectById($scope.projects[$scope.projectId].id).then(function(p)
    {
      $ionicLoading.hide();
      $scope.navigate(p.steps[0].type, p.id);
    });
  }

  $scope.slide = function(i)
  {
    var i = parseInt(i);

    $scope.projectId += i;

    if($scope.projectId >= $scope.projects.length)
    {
      $scope.projectId -= $scope.projects.length;
    }else if($scope.projectId < 0)
    {
      $scope.projectId = $scope.projects.length - 1
    }
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
.controller('RootCtrl', function($scope, $q, $ionicModal, $state, $ionicLoading, $timeout, UserModels, $ionicSideMenuDelegate)
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

    if(screen && screen.lockOrientation)
    {
      screen.lockOrientation('portrait');
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
    return ($scope.question.optional || $scope.answer != '')
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
    $scope.offer = data.project.offer;
    $scope.charityName = data.project.charityName;
    $scope.offerText = $scope.offer.text;
    $scope.offerText = $sce.trustAsHtml($scope.offerText);
  });

  //TODO
  $scope.offerClick = function()
  {
    window.open($scope.offer.link, '_blank', 'location=no,closebuttoncaption=Done,disallowoverscroll=yes,enableViewportScale=yes,toolbarposition=top,presentationstyle=fullscreen');
  }
})
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
    $scope.videoPlaying = false;
    if(screen && screen.lockOrientation)
    {
      screen.lockOrientation('portrait');
    }
    $scope.next();
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
          $scope.navigate(data.project.steps[data.step].type, $scope.pid);
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
    ProjectModels.getCurrent().then(function(data)
    {
      console.log(data);
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
    $scope.text = $sce.trustAsHtml($scope.video.text);
    $scope.title = data.project.title;
  }

  fetchData().then(updateScopeVars);
})