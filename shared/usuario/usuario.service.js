angular.module('shared.usuario').
	factory('Usuario', function(Restangular) {
  		return Restangular.service('users');
});