'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL","http://127.0.0.1:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "promotions/:id");

        }])
    
        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
    
        }])

        .factory('favoriteFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            var favFac = {};
            var favorites = [];
            
            favFac.addToFavorites = function (index) {
                for (var i=0; i < favorites.length; i++){
                    if (favorites[i].id == index)
                        return;
                }
                favorites.push({id: index});
            };

            favFac.getFavorites = function () {
                return favorites;
            };

            favFac.deleteFromFavorites = function (index) {
                for (var i=0; i < favorites.length; i++){
                    if (favorites[i].id == index){ 
                        favorites.splice(i,1);
                    }
                }
            };

            return favFac;
            
        }])
;