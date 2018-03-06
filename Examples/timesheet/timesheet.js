$(document).ready(function(){
    $("#save").click(function(){
        var input = {
            category: $("#category").val(),
            startdate: new Date($("#startdate").val()),
            enddate: new Date($("#enddate").val()),
            weekends: $("#weekends")[0].checked
        };

        var curdate = input.startdate;

        while(curdate < input.enddate) {
            var row = $("#templates .day").clone();
            row.find(".name").html("name");
            row.find("." + input.category).html(8);
            
            $("#results").append(row);

            curdate.setDate(curdate.getDate() + 1);
        }
    });
});