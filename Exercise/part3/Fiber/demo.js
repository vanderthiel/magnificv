// Glasvezel
// admin
// snelheid upgraden, downgraden

var FiberAdministration = (function(){
	var klanten = [];
	var klantcounter = 0;

	function Klant(naam, snelheid){
		this.Id = ++klantcounter;
		this.Naam = naam;
		this.Snelheid = snelheid;
	}

	var registreer = function(naam, snelheid){
		var klant = new Klant(naam, snelheid);
		klanten.push(klant);
		return klant.Id;
	};

	return {
		registreerKlant: registreer,
		upgraden: function(id, snelheid){},
		downgraden: function(id, snelheid){},
		overzicht: function(){ }
	};
})();

console.log('id: ' + FiberAdministration.registreerKlant('Sogeti', 34));
console.log('id: ' + FiberAdministration.registreerKlant('Sogeti', 34));
console.log('id: ' + FiberAdministration.registreerKlant('Sogeti', 34));
