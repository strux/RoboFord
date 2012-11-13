
var app = {
    currentCommands: [],
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady);
    },
    onDeviceReady: function() {
        var options = { frequency: 500 };  // Update every .5 seconds
        var watchID = navigator.accelerometer.watchAcceleration(app.onAccelSucces, app.onAccelError, options);
    },
    onAccelSucces: function(acceleration){
        if(acceleration.y < -3 && $.inArray('l', app.currentCommands) < 0){
            $('#status').html('left');
            app.currentCommands.push('l');
            app.currentCommands.splice($.inArray('r', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('c', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'l'}
            })
        }
        if(acceleration.y > 3 && $.inArray('l', app.currentCommands) < 0){
            $('#status').html('right');
            app.currentCommands.push('r');
            app.currentCommands.splice($.inArray('l', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('c', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'r'}
            })
        }
        if(acceleration.y >= -3 && acceleration.y <= 3 && $.inArray('c', app.currentCommands) < 0){
            $('#status').html('center');
            app.currentCommands.push('c');
            app.currentCommands.splice($.inArray('l', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('r', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'c'}
            })
        }


        document.querySelector('#x').innerHTML = acceleration.x;
        document.querySelector('#y').innerHTML = acceleration.y;
        document.querySelector('#z').innerHTML = acceleration.z;
    },
    onAccelError: function() {
        alert('onError!');
    }
};



