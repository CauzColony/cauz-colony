angular.module('cauz.services', [])
.factory('ProjectModels', function($q){
  var projects = [
        {
          title: 'Powerbeats',
          offer: {
            link: 'http://www.beatsbydre.com/earphones/powerbeats/beats-powerbeats.html',
            text: 'You’ve also earned<br>this exclusive offer<br>from Powerbeats <span>&gt;</span>',
            image: 'assets/images/powerbeats@2x.png',
            style: 'margin: 70px 0 0 115px; display:block; line-height:1.2; font-size: 16px;'
          },
          charityId: 0,
          charityName: 'SF-MARIN FOOD BANK',
          id: '0',
          image: 'assets/images/logos/sf-martin@2x.png',
          steps: [
            {
              type: 'video',
              copy: 'Powerbeats. Earbuds designed for athletes by LeBron James and Dr. Dre. Learn more below. Press play.',
              id: '7qraNrqA2pw'
            },
            {
              type: 'rating',
              text: '<span>MADE FOR ATHLETES.</span><br>Flexible earclips are designed to<br>secure Powerbeats earphones in<br>your ears no matter how rigorous<br>your workout.',
              options: [ 1, 2, 3, 4]
            },
            {
              type: 'rating',
              text: '<span>CLEARER SOUND. DEEPER BASS.</span><br>Powerbeats earphones are the<br>only Beats by Dr. Dre earbuds<br>that come with two speakers<br>inside each bud. That means you<br>get crystal clear highs and deep,<br>rumbling lows',
              options: [ 1, 2, 3, 4]
            },
            {
              type: 'rating',
              text: '<span>SAFETY FIRST.</span><br>Powerbeats earphones are<br>specially designed to pump<br>clear bass at any volume while<br>letting in ambient noise – making<br>sure athletes stay safe while<br>running on the road.',
              options: [ 1, 2, 3, 4]
            },
            {
              type: 'rating',
              text: '<span>REMOTE CONTROL CORD.</span><br>You can adjust your music to<br>find your power song right from<br>the cord. No need to fumble<br>with your MP3 player during<br>your workout.',
              options: [ 1, 2, 3, 4]
            }
          ]
        },
        {
          title: 'Powerbeats',
          offer: {
            link: 'http://www.beatsbydre.com/earphones/powerbeats/beats-powerbeats.html',
            text: 'You’ve also earned<br>this exclusive offer<br>from Powerbeats <span>&gt;</span>',
            image: 'assets/images/powerbeats@2x.png',
            style: 'margin: 70px 0 0 115px; display:block; line-height:1.2; font-size: 16px;'
          },
          charityId: 1,
          charityName: 'San Francisco AIDS Foundation',
          id: '0',
          image: 'assets/images/logos/sf-af@2x.png',
          steps: [
            {
              type: 'video',
              copy: 'Powerbeats. Earbuds designed for athletes by LeBron James and Dr. Dre. Learn more below. Press play.',
              id: '7qraNrqA2pw'
            },
            {
              type: 'rating',
              text: 'How many licks does it take to get to the center of a Tootsie Roll Tottsie Pop?',
              options: [
                {
                  text: '1',
                  value: '1'
                },
                {
                  text: '2',
                  value: '2'
                },
                {
                  text: '3',
                  value: '3'
                }
              ]
            }
          ]
        }
      ],
      current = null,
      step,
      answers;

  return {
    getProjects: function()
    {
      var deferred = $q.defer();
      setTimeout(function()
      {
        //hack to show loader
        deferred.resolve(projects);
      }, 500)
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

      return deferred.promise;
    },
    resetAll: function()
    {
      current = null;
      step = 0;
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