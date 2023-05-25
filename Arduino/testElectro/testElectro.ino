#include <light_CD74HC4067.h>




              // s0 s1 s2 s3: select pins
CD74HC4067 mux(3, 4, 5, 6);  // create a new CD74HC4067 object with its four select lines - 8,9,10,11

const int signal_pin = A0; 
const int signal_pin1 = A1; 
const int signal_pin2= A2; 
const int signal_pin3 = A3; 

  void setup()
  {
      Serial.begin(9600);
      pinMode(signal_pin, INPUT); 
      pinMode(signal_pin1, INPUT); 
      pinMode(signal_pin2, INPUT); 
      pinMode(signal_pin3, INPUT); 
  }


  String getPosition()
  {
      String colonne1,colonne2,colonne3,colonne4,colonne5,colonne6,colonne7,colonne8;
      for (byte i = 0; i < 16; i++) {
          mux.channel(i);
          if(i<8)
          {
              
              if(analogRead(signal_pin)>100)
              {
                colonne1 += "0";
              }
              else{
                colonne1 += "1";
              }
              if(analogRead(signal_pin1)>100)
              {
                colonne3 += "0";
              }
              else
              {
                colonne3 += "1";
              }
              if(analogRead(signal_pin2)>100)
              {
                colonne5 += "0";
              }
              else
              {
                colonne5 += "1";
              }
              if(analogRead(signal_pin3)>100)
              {
                colonne7 += "0";
              }
              else
              {
                colonne7 += "1";
              }
          }
          else
          {
              if(analogRead(signal_pin)>100)
              {
                colonne2 += "0";
              }
              else{
                colonne2 += "1";
              }
              if(analogRead(signal_pin1)>100)
              {
                colonne4 += "0";
              }
              else
              {
                colonne4 += "1";
              }
              if(analogRead(signal_pin2)>100)
              {
                colonne6 += "0";
              }
              else
              {
                colonne6 += "1";
              }
              if(analogRead(signal_pin3)>100)
              {
                colonne8 += "0";
              }
              else
              {
                colonne8 += "1";
              }
          }
          
      }
      return colonne1+"/"+colonne2+"/"+colonne3+"/"+colonne4+"/"+colonne5+"/"+colonne6+"/"+colonne7+"/"+colonne8;
  }


void loop(){
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('#');
    Serial.print(getPosition());
  }
}
