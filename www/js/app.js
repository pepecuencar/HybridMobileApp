angular.module('conFusion', ['ionic', 'conFusion.controllers','conFusion.services'])

    .run(function($ionicPlatform){    
        $ionicPlatform.ready(function(){
        
            if (window.cordova && window.cordova.plugins.Keyboard){
                cordova.plugins.keyboard.hidekeyboardAccessoryBar(true);
                cordova.plugins.keyboard.disableScroll(true);
            
            }
            if (window.StatusBar){
                StatusBar.styleDefault();
            }
        });
    })  
    
    .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
    })
 
    .state('app.home', {
    url: '/home',
    views: {
    'mainContent': {
    templateUrl: 'templates/home.html',
    controller: 'IndexController'
    
    }
    }
    })
 
    .state('app.aboutus', {
    url: '/aboutus',
    views: {
        'mainContent': {
            templateUrl: 'templates/aboutus.html',
            controller: 'AboutController'
            }
        }
    })
    
    .state('app.contactus', {
    url: '/contactus',
    views: {
    'mainContent': {
            templateUrl: 'templates/contactus.html'
            }
        }
    })
    
    .state('app.menu', {
    url: '/menu',
    views: {
    'mainContent': {
            templateUrl: 'templates/menu.html',
            controller: 'MenuController'
            }
        }
    })
 
    .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
    'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController'
        }
        }
    });  
    
// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/home');

});  