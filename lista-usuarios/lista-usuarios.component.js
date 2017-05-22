angular.module('listaUsuarios').
	component('listaUsuarios', {
		templateUrl: 'lista-usuarios/lista-usuarios.template.html',
		controller: ['Restangular', 'Pesquisa',
			function ListaUsuariosController(Restangular, Pesquisa)	{

				// Inicialização de variáveis
				this.query = "";
				this.pagAtual = 1;
				this.numPaginas = 1;
				this.links = {
					first: "",
					prev: "",
					next: "",
					last: ""
				};
				this.constTimeout = 1350;	

				var instancia = this;


				this.resetaLinks = function(){
					instancia.links = {
						first: "",
						prev: "",
						next: "",
						last: ""
					};
				}


				this.atualizaLinks = function(listaLinks){

					var trimmed = listaLinks.replace(/\s/g, '');
					var aux = trimmed.split(',');
					for(l in aux){
						var arr = aux[l].split(';');
						var link = arr[0];						
						var rel = arr[1];						
						link = link.slice(1,link.length-1);
						rel = rel.slice(5,rel.length-1);
						instancia.links[rel] = link;
					}
				}


				this.atualizaBtnsNavegacao = function(){
					$('#btnPrim').prop('disabled', instancia.links.first == "");
					$('#btnAnt').prop('disabled', instancia.links.prev == "");
					$('#btnProx').prop('disabled', instancia.links.next=="");
					$('#btnUlt').prop('disabled', instancia.links.last=="");
				}


				this.irParaPrimeira = function(){
					instancia.url = instancia.links.first;
					instancia.pesquisar();
					instancia.pagAtual = 1;
				}


				this.irParaUltima = function(){
					instancia.url = instancia.links.last;
					instancia.pesquisar();
				}


				this.irParaAnterior = function(){
					instancia.url = instancia.links.prev;
					instancia.pesquisar();
					instancia.pagAtual--;
				}


				this.irParaProxima = function(){
					instancia.url = instancia.links.next;
					instancia.pesquisar();
					instancia.pagAtual++;
				}




				this.pesquisar = function(){

					instancia.resetaLinks();
								
					Restangular.oneUrl('usuarios', instancia.url).get({per_page:100}).
						then(
							function(response){
								var users = response.data;
								instancia.etag = response.headers('X-RateLimit-Remaining');							
								instancia.usuarios = users['items'];
								instancia.total = users.total_count;

								// calculando o num de paginas
								var n = Math.floor(instancia.total/100);
								if(instancia.total%100 > 0){
									n++;
								}
								instancia.numPaginas = n;

								var strLinks = response.headers('Link');
								if(strLinks != null){
									instancia.atualizaLinks(strLinks);		
								}
								instancia.atualizaBtnsNavegacao();	
								$('#icCarregando').addClass('hidden');
							},
							function(reason){
								alert("Requisições excedidas. Espere alguns segundos e tente novamente");
							}
					);
				}


				this.executarQuery = function(){
					instancia.pagAtual = 1;
					instancia.numPaginas = 1;
					instancia.url = Restangular.all('search').all('users').
							getRestangularUrl() + "?q=" + instancia.query + 
							"+in:login";

					instancia.pesquisar();
				}


				this.dispararTimer = function(){
					clearTimeout(instancia.timer);
					instancia.timer = setTimeout(instancia.executarQuery, instancia.constTimeout);
					$('#icCarregando').removeClass('hidden');
				}

				$('#btnPrim').prop('disabled', true);
				$('#btnAnt').prop('disabled', true);
				$('#btnProx').prop('disabled', true);
				$('#btnUlt').prop('disabled', true);

			}						
		]
	});