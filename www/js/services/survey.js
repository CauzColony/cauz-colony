.factory('SurveyModels', function(ProjectModels, $q)
{
  var project,
      questions,
      answers;
  return {
    setProject: function(id)
    {
      var deferred = $q.defer();
      ProjectModels.getCurrent(id).then(function(data)
      {
        project = data.project;
        questions = project.steps[data.step].questions;
        answers = [];
        deferred.resolve(
          {
            title: project.title,
            question: questions[answers.length],
            step: answers.length,
            total: questions.length
          }
        );
      });
      return deferred.promise;
    },
    setAnswer: function(answer)
    {
      var deferred = $q.defer();
      answers.push(answer);
      console.log(answers);
      
      deferred.resolve(
        {
          question: questions[answers.length],
          step: answers.length
        }
      );

      return deferred.promise;
    }
  };
})