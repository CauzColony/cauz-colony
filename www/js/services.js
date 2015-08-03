angular.module('cauz.services', [])
.factory('ProjectModels', function($q, $http, testing){
  var projects = null,
      current = null,
      step = 0,
      answers = [],
      //api = 'http://api.cauzcolony.mod.bz/api/';
      api = 'http://localhost:3000/api/';

  return {
    getProjects: function()
    {
      var deferred = $q.defer()
      $http({
          url: (testing)? api + 'projects' + '?testing=true':api + 'projects',
          method: 'GET',
          dataType: 'json', 
          data: ''
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
      $http({
          url: api + 'project-by-id',
          method: 'POST',
          dataType: 'json', 
          data: { id: id }
      }).success(function (data, status, headers, config) {
          current = data;
          step = 0;
          answers = [];
          deferred.resolve(current);
      }).error(function(data, status, headers, config) {
        //TODO Error handling
      });
      
      return deferred.promise;
    },
    getCurrent: function(id)
    {
      //console.log('getCurrent');

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

      //console.log(answers);

      return deferred.promise;
    },
    resetAll: function()
    {
      current = null;
      step = 0;
      answers = [];
    },
    getAnswers: function()
    {
      return answers;
    },
    submitAnswers: function()
    {
      var deferred = $q.defer();
      console.log(current, answers);
      $http({
          url: api + 'answers',
          method: 'POST',
          dataType: 'json', 
          data: {project: current.id, answers:answers}
      }).success(function (data, status, headers, config) {
          //console.log(data);
          deferred.resolve();
      }).error(function(data, status, headers, config) {
        //TODO Error handling
      });
      return deferred.promise;
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