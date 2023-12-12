$("#currentDay").text(moment().format("dddd, MMM, Do"));

var workingHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

for (var i = 0; i < workingHours.length; i++) {
    var hour = workingHours[i];
    var hourIn12Format = moment(hour, "hh A").format('hh A');
    workingHours[i] = hourIn12Format;
}

for (var i = 0; i < workingHours.length; i++) {
    var $timeblock = $("<div>", { class: "time-block" });
 
    var $hour = $("<div>", { class: "hour" });
    $hour.html(workingHours[i]);
    $timeblock.append($hour);

    $(".container").append($timeblock);

    var $eventTextarea = $("<textarea>", { class: "description" });
    $timeblock.append($eventTextarea);

    var time = workingHours[i];
    $eventTextarea.val(localStorage.getItem(time));

    var $saveButton = $("<button>", { class: "saveBtn" }).html("<i class='fas fa-save' title='Save Event'></i>");
    $timeblock.append($saveButton);

    $saveButton.on("click", function () {

        
        var inputValue = $(this).siblings(".description").val();
       
        $(this).siblings(".description").val(inputValue);

        
        var time = $(this).siblings(".hour").text();

       
        localStorage.setItem(time, inputValue);

        
        var alert = $("<p>").text("Congrats, event saved successfully!");
        $(".container").prepend(alert);

        
        setTimeout(function () {
            alert.remove();
        }, 3000);
    });

  
    var currentTime = moment().startOf('hour');
    if (moment(workingHours[i], "hh A").isAfter(currentTime)) {
        $timeblock.addClass("future");
    } else if (moment(workingHours[i], "hh A").isSame(currentTime)) {
        $timeblock.addClass("present");
    } else {
        $timeblock.addClass("past");
    }
};