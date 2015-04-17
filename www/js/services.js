angular.module('cauz.services', [])
.factory('ProjectModels', function($q, $http){
  var projects = null,
      current = null,
      step = 0,
      answers = [];

  return {
    getProjects: function()
    {
      console.log('getProjects');

      var deferred = $q.defer();
      $http({
          url: 'http://jsonstub.com/projects',
          method: 'GET',
          dataType: 'json', 
          data: '',         
          headers: {
              'Content-Type': 'application/json',
              'JsonStub-User-Key': '7221dec9-6763-4f8a-86fc-41d361311c0a',
              'JsonStub-Project-Key': '838d6804-623d-4f01-97cf-020b075b8453'
          }
      }).success(function (data, status, headers, config) {
          projects = data;
          deferred.resolve(projects);
      }).error(function(data, status, headers, config) {
        //TODO Error handling
      });

      return deferred.promise;
    },
    getProjectById: function(id)
    {
      var deferred = $q.defer();
      current = _.find(projects, {id: id});
      step = 0;
      answers = [];
      deferred.resolve(current);
      return deferred.promise;
    },
    getCurrent: function(id)
    {
      var deferred = $q.defer();
      if(current)
      {
        deferred.resolve({
            project: current,
            step: step
          }
        );
      }else
      {
        this.getProjectById(id).then(function()
        {
          deferred.resolve({
              project: current,
              step: step
            }
          );
        });
      }
      return deferred.promise;
    },
    incrementProjectStep: function()
    {
      step++;
      return current.steps.length > step;
    },
    setAnswer: function(answer)
    {
      var deferred = $q.defer();
      step++;
      answers.push(answer);
      
      deferred.resolve({
        project: current,
        step: step
      });

      console.log(answers);

      return deferred.promise;
    },
    resetAll: function()
    {
      current = null;
      step = 0;
    },
    getAnswers: function()
    {
      return answers;
    }
  };
})
.factory('UserModels', function($q){
  var user;

  return {
    getUser: function()
    {
      return user;
    },
    login: function(d)
    {
      var deferred = $q.defer();
      //alert('Jon\' TODO: Check login against backend');
      user = d;

      setTimeout(function()
      {
        //hack to show loader
        deferred.resolve(user);
      }, 500)

      return deferred.promise;
    }
  };
})