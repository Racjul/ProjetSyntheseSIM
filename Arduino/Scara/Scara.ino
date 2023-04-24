
#include <MultiStepper.h>
#include <AccelStepper.h>
#include <string.h>


AccelStepper stepperBottom(AccelStepper::FULL4WIRE, 4, 5, 6, 7);
AccelStepper stepperTop(AccelStepper::FULL4WIRE, 8,9,10,11);

MultiStepper steppers;
long position[2];

void rotationMoteur(double,double,int,int);
void deplacer(String,String);


int i = 0;

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

  stepperBottom.setAcceleration(20);
  stepperTop.setAcceleration(20);

  steppers.addStepper(stepperTop);
  steppers.addStepper(stepperBottom);
}

void loop() {
  if(i==0)
  {
    String angles1 ="69.7,333.7,68.8,326.1,69.5,317.7,71.7,308.8,75.5,299.7,";
    String angles2 = "104.7,263.1,116.6,261.0,106.5,270.4,98.3,279.4,91.8,288.1,86.7,296.6,83.1,304.9,81.0,312.9,69.5,317.7,";

    deplacer(angles1,angles2);
    i++;
  }
}


void deplacer(String angles1,String angles2)
{
  delay(1000);
  double upI = angles1.substring(0,angles1.indexOf(",")).toDouble();
  angles1.remove(0,angles1.indexOf(",")+1);
  double bottomI = angles1.substring(0,angles1.indexOf(",")).toDouble();
  angles1.remove(0,angles1.indexOf(",")+1);
  rotationMoteur(upI,bottomI,150,1000);

  double tempUp;
  double tempBottom;
  while(angles1.length()>0)
  {
    tempUp = angles1.substring(0,angles1.indexOf(",")+1).toDouble();
    angles1.remove(0,angles1.indexOf(",")+1);
    tempBottom = angles1.substring(0,angles1.indexOf(",")+1).toDouble();
    angles1.remove(0,angles1.indexOf(",")+1);
    rotationMoteur(tempUp,tempBottom,50,10);
  }
  
  delay(1000);

  if(angles2 != "")
  {
    delay(1000);
    deplacer(angles2,"");
  }

  rotationMoteur(0,0,150,100);
}

void rotationMoteur(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);


  position[1] = angleTop * 1000 / 360;
  position[0] = angleBottom * 500 / 360;

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  

