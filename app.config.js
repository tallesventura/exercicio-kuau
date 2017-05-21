angular.module('githubApp').
	config(['$routeProvider', '$locationProvider', 'RestangularProvider', 
		function config($routeProvider, $locationProvider, RestangularProvider){
			//$locationProvider.hashPrefix('!');
			
			$routeProvider.
				when('/usuarios', {
					template: '<lista-usuarios></lista-usuarios>'
				}).
				when('/usuarios/:idUsuario', {
					template: '<detalhes-usuario></detalhes-usuario>'
				}).
				otherwise('/usuarios');

			RestangularProvider.setBaseUrl('https:/\/api.github.com');
			RestangularProvider.setFullResponse(true);
			RestangularProvider.setDefaultHttpFields({cache: true});
			//RestangularProvider.setDefaultHeaders({'Access-Control-Expose-Headers': 'Status'});
			//RestangularProvider.setDefaultHeaders({"User-Agent": "https://api.github.com/users/tallesventura"});
		}
		
	]);