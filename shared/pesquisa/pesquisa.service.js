angular.module('shared.pesquisa').
	factory('Pesquisa', function(Restangular) {
  		return Restangular.service('search/users');
});