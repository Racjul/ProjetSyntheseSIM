
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
  
  
  if(Serial.available())
  {
    angles = Serial.readStringUntil("\n");
  }

  
  if(angles != "")
  {
    delay(1000);
    
    

    
    int upI = angles.substring(0,angles.indexOf(",")).toInt();
    angles.remove(0,angles.indexOf(",")+1);
    int bottomI = angles.substring(0,angles.indexOf(",")).toInt();
    angles.remove(0,angles.indexOf(",")+1);
    //Serial.println(upI);
    //erial.println(bottomI);
    deplacer(upI,bottomI,150,1000);

    int tempUp;
    int tempBottom;
    while(angles.length()>0)
    {
      tempUp = angles.substring(0,angles.indexOf(",")).toInt();
      angles.remove(0,angles.indexOf(",")+1);
      tempBottom = angles.substring(0,angles.indexOf(",")).toInt();
      angles.remove(0,angles.indexOf(",")+1);
      //Serial.println(tempUp);
      //Serial.println(tempBottom);
      deplacer(tempUp,tempBottom,75,0);
    }
  
    delay(1000);

    deplacer(0,0,150,0);

  
    
    
    
    angles = "";
    

 
  }


  








}


void deplacer(double angleTop, double angleBottom, int maxSpeed, int delayTime)
{
  stepperBottom.setMaxSpeed(maxSpeed);
  stepperTop.setMaxSpeed(maxSpeed);


  position[1] = round(angleTop * 333 / 360);
  position[0] = round(angleBottom * 333 / 360);

  steppers.moveTo(position);
  steppers.runSpeedToPosition();

  delay(delayTime);
}  

