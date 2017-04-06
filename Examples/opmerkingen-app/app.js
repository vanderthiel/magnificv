$(document).ready(function(){
    // Initialisatie
    var controller = new OpmerkingenModule.controller(
        new OpmerkingenModule.view(),
        new OpmerkingenModule.storage());
    controller.laden();

    // Wanneer de vastleggen knop geklikt wordt
    $('#vastleggen').click(function(){
        controller.vastleggen();
    });
    // Ook vastleggen bij keypress
    $('#opmerking').keypress(function( event ){
        if(event.which == 13){
            controller.vastleggen();
        }
    });
});