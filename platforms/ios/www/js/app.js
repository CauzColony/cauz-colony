angular.module('cauz', ['ionic', 'youtube-embed', 'cauz.controllers', 'cauz.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      resolve: {
        projects: function(ProjectModels)
        {
          return ProjectModels.getProjects().then(function(data)
          {
            return data;
          })
        }
      }
    })

    .state('video', {
      url: '/video/:pid',
      templateUrl: 'templates/video.html',
      controller: 'VideoCtrl'
    })

    .state('survey', {
      abstract: true,
      url: '/survey/:pid',
      templateUrl: 'templates/survey.html',
      controller: 'SurveyCtrl'
    })
      .state('survey.rating', {
        url: '/rating',
        templateUrl: 'templates/survey.rating.html'
      })
      .state('survey.check-all', {
        url: '/check-all',
        templateUrl: 'templates/survey.check-all.html',
        controller: 'SurveyCheckAllCtrl'
      })
      .state('survey.select', {
        url: '/select',
        templateUrl: 'templates/survey.select.html',
        controller: 'SurveySelectCtrl'
      })
      .state('survey.open', {
        url: '/open',
        templateUrl: 'templates/survey.open.html',
        controller: 'SurveyOpenCtrl'
      })

    .state('thankyou', {
      url: '/thankyou/:pid',
      templateUrl: 'templates/thankyou.html',
      controller: 'ThankYouCtrl'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});

