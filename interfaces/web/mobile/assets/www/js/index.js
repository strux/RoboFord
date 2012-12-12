
var app = {
    // Member Vars
    requestedCommands: { vector: 'c', acceleration: 's' },
    activeCommands: { vector: '', acceleration: '' },
    turnThreshold: 2,
    watchID: 0,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady);
        document.getElementById('forward').addEventListener('touchstart',app.onForwardPress);
        document.getElementById('forward').addEventListener('touchend',app.onForwardRelease);
        document.getElementById('backward').addEventListener('touchstart',app.onReversePress);
        document.getElementById('backward').addEventListener('touchend',app.onReverseRelease);
    },
    onDeviceReady: function() {
        app.sendCommands();
        var options = { frequency: 100 }; 
        app.watchID = navigator.accelerometer.watchAcceleration(app.onAccelSucces, app.onAccelError, options);
    },
    onForwardPress: function() {
        $('#status').html('forward');
        app.requestedCommands['acceleration'] = 'f';
        app.sendCommands();
    },
    onForwardRelease: function() {
        $('#status').html('stop');
        app.requestedCommands['acceleration'] = 's';
        app.sendCommands();
    },
    onReversePress: function() {
        $('#status').html('reverse');
        app.requestedCommands['acceleration'] = 'b';
        app.sendCommands();
    },
    onReverseRelease: function() {
        $('#status').html('stop');
        app.requestedCommands['acceleration'] = 's';
        app.sendCommands();
    },
    onAccelSucces: function(acceleration) {
        if(acceleration.y < -app.turnThreshold) {
            $('#direction').html('left');
            app.requestedCommands['vector'] = 'l';
            app.sendCommands();
        }
        if(acceleration.y > app.turnThreshold) {
            $('#direction').html('right');
            app.requestedCommands['vector'] = 'r';
            app.sendCommands();
        }
        if(acceleration.y >= -app.turnThreshold && acceleration.y <= app.turnThreshold){
            $('#direction').html('center');
            app.requestedCommands['vector'] = 'c';
            app.sendCommands();
        }

        $('#x').html(acceleration.x);
        $('#y').html(acceleration.y);
        $('#z').html(acceleration.z);
    },
    smoothTurn: function() {
        // If transition is directly from 'r' to 'l' or vice versa inject a center command
        if(app.activeCommands['vector'].charCodeAt() + app.requestedCommands['vector'].charCodeAt() == 222) {
            sendCommand('c');
        }
    },
    onAccelError: function() {
        alert('onError!');
    },
    sendCommands: function() {
        if(app.activeCommands['vector'] != app.requestedCommands['vector']) {
            app.smoothTurn();
            app.sendCommand(app.requestedCommands['vector']); 
            app.activeCommands['vector'] = app.requestedCommands['vector'];
        }
        if(app.activeCommands['acceleration'] != app.requestedCommands['acceleration']) {
            app.sendCommand(app.requestedCommands['acceleration']); 
            app.activeCommands['acceleration'] = app.requestedCommands['acceleration'];
        }
    },
    sendCommand: function(command) {
        $.ajax({
            url: 'http://192.168.0.104:4567',
            data: { command: command } 
        })
    }
};



var app_old = {
    currentCommands: [],
    turnThreshold: 2,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady);
        document.getElementById('forward').addEventListener('touchstart',app.onForwardPress);
        document.getElementById('forward').addEventListener('touchend',app.onForwardRelease);
        document.getElementById('backward').addEventListener('touchstart',app.onReversePress);
        document.getElementById('backward').addEventListener('touchend',app.onReverseRelease);
    },
    onDeviceReady: function() {
        var options = { frequency: 100 }; 
        var watchID = navigator.accelerometer.watchAcceleration(app.onAccelSucces, app.onAccelError, options);
    },
    onForwardPress: function(){
        $('#status').html('forward');
        $.ajax({
            url: 'http://192.168.0.104:4567',
            data: { command: 'f'}
        })
    },
    onForwardRelease: function(){
        $('#status').html('stop');
        $.ajax({
            url: 'http://192.168.0.104:4567',
            data: { command: 's'}
        })
    },
    onReversePress: function(){
        $('#status').html('reverse');
        $.ajax({
            url: 'http://192.168.0.104:4567',
            data: { command: 'b'}
        })
    },
    onReverseRelease: function(){
        $('#status').html('stop');
        $.ajax({
            url: 'http://192.168.0.104:4567',
            data: { command: 's'}
        })
    },
    onAccelSucces: function(acceleration){
        if(acceleration.y < -app.turnThreshold && $.inArray('l', app.currentCommands) < 0){
            $('#direction').html('left');
            app.currentCommands.push('l');
            app.currentCommands.splice($.inArray('r', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('c', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'l'}
            })
        }
        if(acceleration.y > app.turnThreshold && $.inArray('l', app.currentCommands) < 0){
            $('#direction').html('right');
            app.currentCommands.push('r');
            app.currentCommands.splice($.inArray('l', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('c', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'r'}
            })
        }
        if(acceleration.y >= -app.turnThreshold && acceleration.y <= app.turnThreshold && $.inArray('c', app.currentCommands) < 0){
            $('#direction').html('center');
            app.currentCommands.push('c');
            app.currentCommands.splice($.inArray('l', app.currentCommands), 1);
            app.currentCommands.splice($.inArray('r', app.currentCommands), 1);
            $.ajax({
                url: 'http://192.168.0.104:4567',
                data: { command: 'c'}
            })
        }

        $('#x').html(acceleration.x);
        $('#y').html(acceleration.y);
        $('#z').html(acceleration.z);
    },
    onAccelError: function() {
        alert('onError!');
    }
};



