angular.module('cauz', ['ionic', 'youtube-embed', 'cauz.controllers', 'cauz.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

    .state('project', {
      url: '/project/:pid',
      templateUrl: 'templates/project.html',
      controller: 'ProjectCtrl'
    })

    .state('video', {
      url: '^/project/:pid/video',
      templateUrl: 'templates/video.html',
      controller: 'VideoCtrl'
    })

    .state('survey', {
      url: '^/project/:pid/survey',
      templateUrl: 'templates/survey.html',
      controller: 'ProjectCtrl'
    })

    .state('thankyou', {
      url: '/thankyou',
      templateUrl: 'templates/thankyou.html',
      controller: 'ThankYouCtrl'
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent' :{
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});

