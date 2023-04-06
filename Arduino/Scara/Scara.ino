
/*
 Stepper Motor Control - one revolution

 This program drives a unipolar or bipolar stepper motor.
 The motor is attached to digital pins 8 - 11 of the Arduino.

 The motor should revolve one revolution in one direction, then
 one revolution in the other direction.


 Created 11 Mar. 2007
 Modified 30 Nov. 2009
 by Tom Igoe

 */

#include <Stepper.h>

const int stepsPerRevolutionBottom = 200;  // change this to fit the number of steps per revolution
const int stepsPerRevolutionUpper = 336;  // change this to fit the number of steps per revolution
const int buttonPin = 2;
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepperBottom(stepsPerRevolutionBottom, 8, 9, 10, 11);
Stepper myStepperUpper(stepsPerRevolutionUpper, 4, 5, 6, 7);




int boutonPhase = LOW;

void setup() {
  // set the speed at 60 rpm:
  myStepperBottom.setSpeed(30);
  myStepperUpper.setSpeed(30);

    // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  
  // initialize the serial port:
  Serial.begin(9600);
}

void loop() {

  if(boutonPhase == HIGH)
  {
    deplacer(90,90);
    boutonPhase = LOW;

    delay(2000);
  }
  else
  {
    boutonPhase = digitalRead(buttonPin);
  }


}


int angleToStep(float angle, bool upper)
{
  return ceil((angle * 331)/360);
}

void deplacer(float angleUp, float angleBottom)
{

  float stepUp = angleToStep(angleUp,true);
  float stepBottom = angleToStep(angleBottom,false);

  int i =0;
  int cptStepBottom=0;
  int cptStepUp=0;

  while(i<=abs(stepUp) || i<= abs(stepBottom))
  {
    if(i<=abs(stepUp))
    {
      if(stepUp<0)
      {
        myStepperUpper.step(-1);
      }
      else if(stepUp>0)
      {
        myStepperUpper.step(1);
      }
    }
    
    if(i<=abs(stepBottom))
    {
      if(stepBottom<0)
      {
        myStepperBottom.step(-1);
      }
      else if(stepBottom>0)
      {
        myStepperBottom.step(1);
      }
    }
    i++;
  }




}









