.controller('SurveyCtrl', function($scope, $stateParams, SurveyModels, ProjectModels) {
  console.log('SurveyCtrl');
  $scope.pid = $stateParams.pid;
  SurveyModels.setProject($scope.pid).then(function(data)
  {
    $scope.title = data.title;
    $scope.step = data.step;
    $scope.total = data.total;
    $scope.setQuestion(data.question);

    console.log($scope.question);
  });

  $scope.setQuestion = function(question)
  {
    $scope.question = question;
    $scope.placeholder = ($scope.question.optional)? 'Optional':'Enter answer';
    
  }

  $scope.setAnswer = function(answer)
  {
    SurveyModels.setAnswer(answer).then(function(data)
    {
      if(data.question)
      {
        $scope.step = data.step;
        $scope.setQuestion(data.question);
        $scope.navigate('survey.' + $scope.question.type, $scope.pid);
      }else
      {
        alert('Jon\'s TODO: submit data to backend');

        if(ProjectModels.incrementProjectStep())
        {
          ProjectModels.getCurrent($scope.pid).then(function(data)
          {
            $scope.navigate('video', $scope.pid);
          });
        }else
        {
          $scope.navigate('thankyou', $scope.pid);
        }
      }
    });
  }

  $scope.select = function(id)
  {
    $scope.answer = id;
  }

  $scope.submit = function(answer)
  {
    console.log('submit', answer);
    $scope.setAnswer(answer);
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