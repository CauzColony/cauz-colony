.controller('SurveyCtrl', function($scope, $stateParams, $sce, ProjectModels) {
  $scope.pid = $stateParams.pid;
  $scope.labels = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
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