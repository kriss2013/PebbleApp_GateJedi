// Gate Jedi Peddle APP (Version 1.3) @TVMiller 
// Pebble Blink APP @Jack-Dangerfield

var Vibe = require('ui/vibe');

var Accel = require('ui/accel');
Accel.init();
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

// Create Window
var main_window = new UI.Window();

// Open Button and Display
var txtOnLabel = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'Gothic 28 Bold',
    text: 'GATE JEDI',
    textAlign: 'center',						
    color: 'white'
});

var Sperre=0;

// Display Main Window
main_window.backgroundColor('black');
main_window.add(txtOnLabel);
main_window.show();

// URL To Particle Cloud (Token in Particle Build)
function Toggle(function_name,function_value){
  var URL_ON = 'http://192.168.178.87/gpio/0';
  var URL_OFF = 'http://192.168.178.87/gpio/1';

if (Sperre===0){
  Sperre=1;
  ajax(	
    {
      url: URL_ON,
      method: 'post',	
      type: 'json',
      data: { "args": function_value}
    }
  );
  console.log(URL_ON);
          // Send a long vibration to the user wrist
Vibe.vibrate('long');
  setTimeout(function(){  
    console.log(URL_OFF);
   ajax(	
    {
      url: URL_OFF,
      method: 'post',	
      type: 'json',
      data: { "args": function_value}
    }
    );
  },750);
  setTimeout(function(){Sperre=0;},3000);
}
}

// Accelerometer Poll and Function (Default 100Hz 25)
Accel.on('data', function(e) {
  console.log("x accel:");
  console.log(e.accel.x);
  // If X Axis Force (1)
  if (e.accel.y > 900  || e.accel.y < -900) { 
  //  console.log("y accel:");
  //  console.log(e.accel.z);
  // If Y Axis Force (2)
 //     if (e.accel.z < -900) {
    Toggle('gate','open');

 }//}
});

// Button Function and Photon Parameters
main_window.on('click', 'up', function() {
  Toggle('gate','open');
});
