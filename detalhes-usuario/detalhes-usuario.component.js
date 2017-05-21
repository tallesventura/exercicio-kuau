angular.module('detalhesUsuario').
	component('detalhesUsuario', {
		templateUrl: 'detalhes-usuario/detalhes-usuario.template.html',
		controller: ['$routeParams', 'Usuario',
			function($routeParams, Usuario){
				var instancia = this;


				this.parseData = function(dataOrig){
					// formato dataOrig: 2013-02-21T02:58:54Z
					// [ano-mes-dia]
					var arr = dataOrig.split('-');
					var dia = arr[2].slice(0,2);
					return dia + '/' + arr[1] + '/' + arr[0];
				}

				
				Usuario.one($routeParams.idUsuario).get().then(
					function(response){
						instancia.usuario = response.data;

						// Mudando o formato das datas
						var dataCriacao = instancia.parseData(instancia.usuario.created_at);
						var dataAtualizacao = instancia.parseData(instancia.usuario.updated_at);
						instancia.usuario.created_at = dataCriacao;
						instancia.usuario.updated_at = dataAtualizacao;

						// Lidando com usuário sem nome disponível
						if (instancia.usuario.name == null) {
							instancia.usuario.name = "Não fornecido.";
						}

						// Lidando com usuário sem email disponível
						if (instancia.usuario.email == null) {
							instancia.usuario.email = "Não fornecido.";
						}
					},
					function(reason){
						alert("Erro ao buscar usuario.");
					}
				);
			}
		]
	})