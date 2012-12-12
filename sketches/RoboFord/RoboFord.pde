
int pinI1=8;//define I1 interface
int pinI2=11;//define I2 interface 
int speedpinA=9;//enable motor A
int pinI3=12;//define I3 interface 
int pinI4=13;//define I4 interface 
int speedpinB=10;//enable motor B
int driveSpeed=173;//define the drive speed 
int turnSpeed=240;//define turn speed
int incomingByte=0;//define serial message default
 
void setup()
{
  pinMode(pinI1,OUTPUT);
  pinMode(pinI2,OUTPUT);
  pinMode(speedpinA,OUTPUT);
  pinMode(pinI3,OUTPUT);
  pinMode(pinI4,OUTPUT);
  pinMode(speedpinB,OUTPUT);
  Serial.begin(9600);
}
 
void forward()
{
     analogWrite(speedpinA,driveSpeed);//input a simulation value to set the speed
     digitalWrite(pinI2,LOW);//turn DC Motor A move counter-clockwise
     digitalWrite(pinI1,HIGH);
}
void backward()//
{
     analogWrite(speedpinA,driveSpeed);//input a simulation value to set the speed
     digitalWrite(pinI2,HIGH);//turn DC Motor A move clockwise
     digitalWrite(pinI1,LOW);
 }
void left()//
{
     analogWrite(speedpinB,turnSpeed);
     digitalWrite(pinI4,HIGH);//turn DC Motor B move clockwise
     digitalWrite(pinI3,LOW);
}
void right()//
{
     analogWrite(speedpinB,turnSpeed);
     digitalWrite(pinI4,LOW);//turn DC Motor B move counter-clockwise
     digitalWrite(pinI3,HIGH);
}
void center()//
{
     digitalWrite(speedpinB,LOW);
}
void stop()//
{
     digitalWrite(speedpinA,LOW);// Unenble the pin, to stop the motor. this should be done to avid damaging the motor. 
}

void loop()
{
  if(Serial.available() > 0){
    incomingByte = Serial.read();
    if(incomingByte == 'f'){
      forward();
    }
    if(incomingByte == 'b'){
      backward();
    }
    if(incomingByte == 's'){
      stop();
    }
    if(incomingByte == 'l'){
      left();
    }
    if(incomingByte == 'r'){
      right();
    }
    if(incomingByte == 'c'){
      center();
    }
  }
}
