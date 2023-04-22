
#include <MultiStepper.h>
#include <AccelStepper.h>
#include <string.h>


AccelStepper stepperBottom(AccelStepper::FULL4WIRE, 4, 5, 6, 7);
AccelStepper stepperTop(AccelStepper::FULL4WIRE, 8,9,10,11);

MultiStepper steppers;
long position[2];

void deplacer(double,double,int,int);
  int degTopI =0;
  int degBottomI = 0;
  
  int degTopF = 0;
  int degBottomF = 0;
  String angles = "";

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

  stepperBottom.setAcceleration(20);
  stepperTop.setAcceleration(20);

  steppers.addStepper(stepperTop);
  steppers.addStepper(stepperBottom);
}

void loop() {
  
//LE void ne fonctionne pas 

  if(Serial.available())
  {
    delay(1000);
    double upI = angles.substring(0,angles.indexOf(",")).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    double bottomI = angles.substring(0,angles.indexOf(",")).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    deplacer(upI,bottomI,150,1000);

    double tempUp;
    double tempBottom;
    while(angles.length()>0)
    {
      tempUp = angles.substring(0,angles.indexOf(",")+1).toDouble();
      angles.remove(0,angles.indexOf(",")+1);
      tempBottom = angles.substring(0,angles.indexOf(",")+1).toDouble();
      angles.remove(0,angles.indexOf(",")+1);
      deplacer(tempUp,tempBottom,50,10);
    }
  
    delay(1000);

    deplacer(0,0,150,100);
   
  

    angles = "";
    

 
  }


}


void deplacer(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);


  position[1] = angleTop * 1000 / 360;
  position[0] = angleBottom * 500 / 360;

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  

