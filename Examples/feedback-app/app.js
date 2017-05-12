$(document).ready(function(){
    var feedback = FeedbackModule.newHomeController(
        FeedbackModule.newView(),
        FeedbackModule.newService()
    );

    $(".star").click(function(){ feedback.Rate(Number($(this).attr("data-value"))); });
    $("#verstuur").click(function(){ feedback.Save(); });
});