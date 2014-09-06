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
      alert('Jon\' TODO: Check login against backend');
      user = d;

      setTimeout(function()
      {
        //hack to show loader
        deferred.resolve(user);
      }, 500)

      return deferred.promise;
    },
    register: function(d)
    {
      var deferred = $q.defer();
      alert('Jon\' TODO: Check registration against backend. Create user.');
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