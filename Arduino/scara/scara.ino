
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

String angles = "118.7,265.1,107.5,276.5,92.3,280.2,79.6,281.5,68.9,280.6,60.0,276.9,50.2,289.9,";

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  pinMode(3,OUTPUT);
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




  double upI = angles.substring(0,angles.indexOf(",")).toDouble();
  angles.remove(0,angles.indexOf(",")+1);
  double bottomI = angles.substring(0,angles.indexOf(",")).toDouble();
  angles.remove(0,angles.indexOf(",")+1);
  rotationMoteur(upI,bottomI,75,1500);
  digitalWrite(3,HIGH);
  delay(1250);
  double tempUp;
  double tempBottom;
  while(angles.length()>0)
  {
    tempUp = angles.substring(0,angles.indexOf(",")+1).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    tempBottom = angles.substring(0,angles.indexOf(",")+1).toDouble();
    angles.remove(0,angles.indexOf(",")+1);
    rotationMoteur(tempUp,tempBottom,40,10);
  }
  digitalWrite(3,LOW);
  delay(1000);


  
}

void rotationMoteur(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);

  double position1 = -angleTop * 1000 / 360;
  double position2 = -angleBottom * 333.33 / 360;

  Serial.println(position1);
  Serial.println(position2);

  position[1] = position1;
  position[0] = position2;

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  
