var $juego = {};

$juego.filas = [[], [], []];

$juego.espacioVacio = {
	fila: 2, 
	columna: 2
};

$juego.iniciarJuego = function(elementoJuego){
	this.instalarPiezas(elementoJuego);
	this.capturarTeclas();
	this.mezclarFichas();
};

$juego.crearPieza = function(numero, fila, columna) {
	var $pieza = $("<div>");

	$pieza.addClass("pieza");

	$pieza.css({
		"background-image": "url(img/" + numero + ".jpg)",
		"top": fila * 200 + "px",
		"left": columna * 200 + "px",
	});

	return {
		"elemento": $pieza,
		"origen": {
			fila: fila,
			columna: columna
		},
		"posicion": {
			"fila": fila,
			"columna": columna
		},
		"contador": numero,
	};
}

$juego.moverHaciaArriba = function(){	
	var filaOrigen = this.espacioVacio.fila+1;
	var columnaOrigen = this.espacioVacio.columna;


	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen)
	setTimeout(function() {
		$juego.chequearSiGano()
	}, 300);
};
$juego.moverHaciaAbajo = function(){
	var filaOrigen = this.espacioVacio.fila-1;
	var columnaOrigen = this.espacioVacio.columna;


	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen)
	setTimeout(function() {
		$juego.chequearSiGano()
	}, 300);
};
$juego.moverHaciaLaIzquierda = function(){
	var filaOrigen = this.espacioVacio.fila;
	var columnaOrigen = this.espacioVacio.columna+1;


	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen)
	setTimeout(function() {
		$juego.chequearSiGano()
	}, 300);
};
$juego.moverHaciaLaDerecha = function(){
	var filaOrigen = this.espacioVacio.fila;
	var columnaOrigen = this.espacioVacio.columna-1;


	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen)
	setTimeout(function() {
		$juego.chequearSiGano()
	}, 300);
};

$juego.intercambiarPosicionConEspacioVacio = function(fila, columna){
	var pieza = this.filas[fila] && this.filas[fila][columna];

	if (pieza) {
		pieza.elemento.css({
			"top": this.espacioVacio.fila * 200,
			"left": this.espacioVacio.columna * 200,
		});

		this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = pieza;

		this.filas[fila][columna] = null;

		this.espacioVacio = {
			fila: fila,
			columna: columna,
		};
	}
};

$juego.chequearSiGano = function() {
	var gane = true;
	for (var fila = 0; fila < 3; fila++) {
		for (var columna = 0; columna < 3; columna++) {
			var ficha = $juego.filas[fila][columna];
			if (ficha && (ficha.origen.fila != fila || ficha.origen.columna != columna))
			{
				gane = false;
			}
		}
	}
	if (gane == true) {
		alert('ganaste');
	}
};

$juego.estaEnEspacioVacio = function(ficha) {
	if (!ficha) return true;
	if (ficha.origen.fila == this.espacioVacio.fila && ficha.origen.columna == this.espacioVacio.columna) {
		return true;
	}
	return false;
}

$juego.mezclarFichas = function(){
	var that = this;
	var veces = 200;
	var rand = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaDerecha','moverHaciaLaIzquierda'];

	for (var i = 0; i <= veces; i++) {
		var posicion = Math.floor((Math.random() * 4));
		that[rand[posicion]]();
	}
};

$juego.capturarTeclas = function() {
	var that = this;

	$(document).keydown(function(event) {
		switch (event.which) {
			case 38:
				that.moverHaciaArriba();
				
			break;
			case 40:
				that.moverHaciaAbajo();
				
			break;
			case 37:
				that.moverHaciaLaIzquierda();
				
			break;
			case 39:
				that.moverHaciaLaDerecha();
				
			break;
		}
	});
	
};

$juego.instalarPiezas = function(elementoJuego){
	var numero = 1;

	for (var fila = 0; fila <= 2; fila++) {
		for (var columna = 0; columna <= 2; columna++) {
			if (columna == this.espacioVacio.columna && fila == this.espacioVacio.fila) {
				this.filas[fila][columna]= null;
			} else {
				var pieza = this.crearPieza(numero, fila, columna);

				this.filas[fila][columna] = pieza;

				elementoJuego.append(pieza.elemento);

				numero++;
			}	
		}
	}
};

/*
Cada método deberá mover la ficha indicada hacia
el sentido que indica el nombre del método,
siempre y cuando el destino de la ficha sea el espacio vacío.
*/

$(document).ready(function() {
	$juego.iniciarJuego($("div#juego"));
});

