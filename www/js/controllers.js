'use strict';

angular.module('conFusion.controllers', ['ionic'])
    .controller('AppCtrl',function ($scope, $ionicModal, $timeout) {
    
    $scope.loginData = {};
    $scope.reservation = {};
    
    $ionicModal.fromTemplateUrl('templates/login.html',{
     scope: $scope
        }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.closeLogin = function(){
        $scope.modal.hide();    
    }
    
     $scope.login = function(){
        $scope.modal.show();
    }
     
     $scope.doLogin = function(){
        console.log('Doing login',$scope.loginData);
        $scope.closeLogin();
     }
      
    $timeout(function(){
        $scope.closeLogin();
        },1000);
    
    $ionicModal.fromTemplateUrl('templates/reserve.html',{
     scope: $scope
        }).then(function(modal){
        $scope.reserveform = modal;
    });

    $scope.closeReserve = function(){
        $scope.reserveform.hide();    
    }
    
    $scope.openReserve = function(){
        $scope.reserveform.show();
    }
     $scope.doReserve = function(){
        console.log('Doing Reserve',$scope.reservation);
         $scope.closeReserve();
     }
     
     $timeout(function(){
        $scope.closeReserve();
        },1000);
})

    .controller('MenuController', ['$scope', 'menuFactory','favoriteFactory','baseURL', '$ionicListDelegate', function($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {
            
            $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.message = "Loading ...";
            
        
            $scope.dishes = menuFactory.query(
                function(response) {
                    $scope.dishes = response;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        
            $scope.addFavorite = function (index){
                console.log("index is " + index);
                
                favoriteFactory.addToFavorites(index);
                $ionicListDelegate.closeOptionButtons();
            }
    }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams','dish', 'menuFactory','favoriteFactory','baseURL','$ionicPopover','$ionicModal', function($scope, $stateParams, dish, menuFactory,favoriteFactory, baseURL,$ionicPopover,$ionicModal) {
            
            $scope.baseURL = baseURL;
            $scope.dish = {};
            $scope.message="Loading ...";
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.dish = dish;

            $scope.addToFavorites = function (){
                console.log("Dish Index is " + $scope.dish.id);
                favoriteFactory.addToFavorites($scope.dish.id);
                $scope.closePopover();
            }
            
           $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
               scope: $scope
            }).then(function(popover) {
            $scope.popover = popover;
            });            
            
            $scope.openPopover = function($event) {
                $scope.popover.show($event);
            };
            
            $scope.closePopover = function() {
                $scope.popover.hide();
            };
            
            $scope.$on('$destroy', function() {
                $scope.popover.remove();
            });
                    
            $ionicModal.fromTemplateUrl('templates/dish-comment.html',{
                scope: $scope,
                animation: 'slide-in-up',
            }).then(function(modal){
                $scope.commentform = modal;
            }  );

            $scope.openComment = function(){
                $scope.commentform.show();
            }
            
            $scope.closeComment = function(){
                $scope.commentform.hide();    
            }

             $scope.$on('$destroy', function() {
                $scope.commentform.remove();
                });
            
            $scope.addComment = function() {
                $scope.openComment();
            }

             $scope.doComment = function(){
                console.log('Submiting Comments',$scope.mycomment);
                 $scope.submitComment();
                 $scope.closePopover();
                 $scope.closeComment();
             }

            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);    
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
                  
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

       .controller('IndexController', ['$scope', 'menuFactory','promotionFactory', 'corporateFactory','baseURL', function($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {
            $scope.baseURL = baseURL;
            $scope.leader = corporateFactory.get({id:3});
            $scope.dish = menuFactory.get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            $scope.promotion = promotionFactory.get({id:0});
        }])

        .controller('AboutController', ['$scope', 'corporateFactory','baseURL', function($scope, corporateFactory,baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.leaders = corporateFactory.query();
            console.log($scope.leaders);

        }])

        .controller('FavoritesController', ['$scope','dishes','favorites', 'favoriteFactory','baseURL','$ionicListDelegate','$ionicPopup','$ionicLoading', '$timeout', function($scope,dishes,favorites,favoriteFactory, baseURL,$ionicListDelegate,$ionicPopup, $ionicLoading, $timeout) {
            $scope.baseURL = baseURL;
            $scope.shouldShowDelete = false;
           
                                            
            $scope.favorites = favorites;

            $scope.dishes = dishes;

            $scope.toggleDelete = function() {
                $scope.shouldShowDelete = !$scope.shouldShowDelete;
                console.log($scope.shouldShowDelete);    
            }
            
            $scope.deleteFavorite = function (index){
                
                var confirmPopup = $ionicPopup.confirm({
                    title:'Confirm Delete',
                    template: 'Are you sure you want to delete this item?'
                });
                
                confirmPopup.then(function(res){
                    if (res){
                        console.log ('Ok to delete');
                        favoriteFactory.deleteFromFavorites (index);        
                    }   
                    else
                        console.log('Canceled delete');    
                });
                
                $scope.shouldShowDelete = false;
            }
           
        }])

    .filter ('favoriteFilter', function() {
            
        return function (dishes, favorites){
            
            var out = [];
            for (var i=0; i < favorites.length; i++){
                for (var j=0; j < dishes.length; j++)
                    if (dishes[j].id === favorites[i].id){ 
                        out.push(dishes[j]);
                    }
                }
            return out;
        }
    
    })

;