
#include <MultiStepper.h>
#include <AccelStepper.h>


AccelStepper stepperBottom(AccelStepper::FULL4WIRE, 4, 5, 6, 7);
AccelStepper stepperTop(AccelStepper::FULL4WIRE, 8,9,10,11);

MultiStepper steppers;
eval "$(ssh-ag
int boutonPhase = LOW;
const int buttonPin = 2;
long position[2];

void deplacer(double,double,int,int);
 

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);



  steppers.addStepper(stepperTop);
  steppers.addStepper(stepperBottom);


 
}

void loop() {
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPU+GhHJRDMvnOdKu9NSlo2q6xJ7pWS1pxcwx4lQ2MpX mathisbaril1@hotmail.com

  boutonPhase = digitalRead(buttonPin);

  if(boutonPhase == HIGH)
  {
    
    
    deplacer(180,90,200,1000);
    deplacer(0,180,100,0);
    deplacer(-180,270,100,1000);
    deplacer(0,0,150,2000);

    deplacer(180,45,200,1000);
    deplacer(0,135,100,0);
    deplacer(-180,225,100,1000);
    deplacer(0,0,150,2000);


    deplacer(180,45,200,1000);
    deplacer(135,90,50,0);
    deplacer(180,135,50,1000);
    deplacer(0,0,150,2000);
    

 
  }

}


void deplacer(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);


  position[1] = ceil(angleTop * 333 / 360);
  position[0] = ceil(angleBottom * 333 / 360);

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  

