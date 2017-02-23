
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
        Form validation
    */

    var target_date = new Date('July, 15, 2017').getTime();
    var days, hours, minutes, seconds;
    var countdown = document.getElementById('countdown');
    setInterval(function () {
 
    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
 
    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;
     
    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;
     
    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);
     
    // format countdown string + set tag value
    countdown.innerHTML = '<span class="days"><b>' + days +  ' Days</span> <span class="hours">' + hours + ' Hours</span> <span class="minutes">'
    + minutes + ' Minutes</span> <span class="seconds">' + seconds + ' Seconds</span>';  
 
}, 1000);
    
    
});
