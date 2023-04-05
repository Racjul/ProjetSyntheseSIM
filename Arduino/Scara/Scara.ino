
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
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepperBottom(stepsPerRevolutionBottom, 8, 9, 10, 11);
Stepper myStepperUpper(stepsPerRevolutionUpper, 4, 5, 6, 7);






void setup() {
  // set the speed at 60 rpm:
  myStepperBottom.setSpeed(30);
  myStepperUpper.setSpeed(30);
  
  // initialize the serial port:
  Serial.begin(9600);
}

void loop() {

  deplacer(90,90);
  delay(500);
  
  deplacer(-90,-90);
  delay(500);

}


int angleToStep(float angle, bool upper)
{
  if(upper)
  {
    return ceil((angle * 336)/360);
  }
  else
  {
    return ceil((angle * 200)/360);
  }

  return 0;
}

void deplacer(float angleUp, float angleBottom)
{
  float stepUp = angleToStep(angleUp,true);
  float stepBottom = angleToStep(angleBottom,false);

  int i =0;
  int cptStepBottom=0;
  int cptStepUp=0;

  while(true)
  {
    if((i % 2 == 0) && cptStepUp < abs(stepUp))
    {
      if(stepUp<0)
      {
        myStepperUpper.step(-1);
        cptStepUp++;
      }
      else if(stepUp >0)
      {
        myStepperUpper.step(1);
        cptStepUp++;
      }

      
    }
    else if((i % 2 != 0 ) && cptStepBottom < stepBottom)
    {
      if(stepBottom<0)
      {
        myStepperBottom.step(-1);
        cptStepBottom++;
      }
      else if(stepBottom >0)
      {
        myStepperBottom.step(1);
        cptStepBottom++;
      }

    }
    else
    {
      break;
    }
    i++;

    delay(10);
  }

}









