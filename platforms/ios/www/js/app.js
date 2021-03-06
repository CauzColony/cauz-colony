angular.module('cauz', ['ionic', 'ngCordova', 'cauz.controllers', 'cauz.services'])

.run(function($ionicPlatform, $rootScope) {
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

    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
    }, 100);
  });

  $rootScope.$on('$stateChangeStart', function(){
    if(screen && screen.lockOrientation)
    {
      screen.lockOrientation('portrait');
    }
  });
})

.value('aboutVideo', '4503406')
//coment next line for production build
.value('testing', true)

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html'
    })
    .state('about-video', {
      url: '/about-video',
      templateUrl: 'templates/about-video.html',
      controller: 'AboutVideoCtrl'
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'templates/privacy.html'
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
    .state('survey.multiple-choice', {
      url: '/multiple-choice',
      templateUrl: 'templates/survey.multiple-choice.html',
      controller: 'SurveyMultipleChoiceCtrl'
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

