angular.module('cauz.controllers', [])
.controller('LoginCtrl', function($scope, $ionicLoading, UserModels, ProjectModels, projects) {
  var user = UserModels.getUser();
  ProjectModels.resetAll();

  $scope.loginData = {
    email: (user)? user.email:'',
    projectId: 0
  };
  $scope.projects = projects;

  $scope.showButton = function()
  {
    return $scope.loginData.email != undefined && $scope.loginData.email.length > 0;
  }

  $scope.login = function()
  {
    showLoader();

    UserModels.login($scope.loginData).then(function(user)
    {
      $ionicLoading.hide();
      $scope.user = user;
    })
    .then(function()
    {
      var cur = $scope.loginData.projectId,
          p;
      if(cur < 0)
      {
        cur = $scope.projects.length - 1;
      }else if(cur >= $scope.projects.length)
      {
        cur -= $scope.projects.length;
      }
      p = $scope.projects[cur];
      $scope.navigate(p.steps[0].type, p.id);
    });
  }

  $scope.slide = function(i)
  {
    var i = parseInt(i);

    $scope.loginData.projectId += i;
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

  $timeout(function()
  {
    if($scope.user == undefined)
    {
      $scope.navigate('home', 'home');
    }
  }, 250)

  $scope.navigate = function(state, id)
  {
    console.log(state, id);
    if(screen && screen.lockOrientation)
    {
      console.log(screen)
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
  console.log('SurveyCtrl');
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
        //alert('Jon\'s TODO: submit data to backend');
        $scope.navigate('thankyou', $scope.pid);
      }
    });
  }

  $scope.select = function(id)
  {
    $scope.answer = id;
  }

  $scope.submit = function(answer)
  {
    $scope.setAnswer(answer);
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

    $scope.navigate('survey.' + $scope.question.type, $scope.pid);
  }
})
.controller('SurveyMultipleChoiceCtrl', function($scope) {
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
.controller('SurveySelectCtrl', function($scope) {
  $scope.answer = 'Select One';
})
.controller('SurveyOpenCtrl', function($scope) {
  $scope.answer = '';
  $scope.showSubmit = function()
  {
    return ($scope.question.optional || $scope.answer != '')
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