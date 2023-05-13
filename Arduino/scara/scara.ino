
#include <MultiStepper.h>
#include <AccelStepper.h>
#include <string.h>


AccelStepper stepperTop(AccelStepper::FULL4WIRE, 4, 5, 6, 7);
AccelStepper stepperBottom(AccelStepper::FULL4WIRE, 8,9,10,11);

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
    if (Serial.available() > 0) {
    String data = Serial.readStringUntil('%');
    Serial.print("You sent me: ");
    Serial.println(data);
    deplacer(data);
    rotationMoteur(0,0,150,100);
  }
    

}


void deplacer(String angles)
{
  
  if(angles[0] == 'c'){
    String anglesCapture = angles.substring(1,angles.indexOf(";"));
    angles.remove(0,angles.indexOf(";")+1);
    Serial.println(anglesCapture);
    Serial.println(angles);
    deplacer(anglesCapture);
  }
  else if(angles[0] == 'p')
  {
    angles.indexOf(";");
    String anglesPlayer = angles.substring(0,angles.indexOf(";"));
    angles.remove(1,angles.indexOf(";"));
    deplacer(anglesPlayer);
  }







  delay(1000);
  double upI = angles.substring(0,angles.indexOf(",")).toDouble();
  angles.remove(0,angles.indexOf(",")+1);
  double bottomI = angles.substring(0,angles.indexOf(",")).toDouble();
  angles.remove(0,angles.indexOf(",")+1);
  rotationMoteur(upI,bottomI,150,1000);

  double tempUp;
  double tempBottom;
  while(angles.length()>0)
  {
    tempUp = angles.substring(0,angles.indexOf(",")+1).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    tempBottom = angles.substring(0,angles.indexOf(",")+1).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    rotationMoteur(tempUp,tempBottom,50,10);
  }
  
  delay(1000);


  
}

void rotationMoteur(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);


  position[1] = -angleTop * 1000 / 360;
  position[0] = -angleBottom * 500 / 360;

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  


