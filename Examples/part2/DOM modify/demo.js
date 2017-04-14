$(document).ready(function(){
    // --------------------------------------------------------------------
    // Schrijf hier je code

    // gebruik deze variabele om elementen unieke IDs te geven
    var aantalElementen = 0;

    $('#save').click(function(){
        var klantelement = $('#templates .klant').clone();

        klantelement.attr('data-id', aantalElementen);
        aantalElementen = aantalElementen + 1;

        klantelement.find('.naam').html($('#klant').val());
        klantelement.find('.beschrijving').html($('#beschrijving').val());
        klantelement.find('.cijfer').html($('#cijfer').val());

        klantelement.find('.verwijder').click(function(){
            $(this).parent().remove();
        });

        $('#resultaten').append(klantelement);
    });
    $('#reset').click(function(){
        
    });


    // --------------------------------------------------------------------
});
