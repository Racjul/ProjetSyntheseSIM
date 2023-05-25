
  #include <light_CD74HC4067.h>


              // s0 s1 s2 s3: select pins
CD74HC4067 mux(3, 4, 5, 6);  // create a new CD74HC4067 object with its four select lines - 8,9,10,11

const int signal_pin = A0; 
const int signal_pin1 = A1; 
const int signal_pin2= A2; 
const int signal_pin3 = A3; 
int tableau[8][8] = {
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0},
  {0,0,0,0,0,0,0,0}
  };
  void setup()
  {
      Serial.begin(9600);
      pinMode(signal_pin, INPUT); 
      pinMode(signal_pin1, INPUT); 
      pinMode(signal_pin2, INPUT); 
      pinMode(signal_pin3, INPUT); 
  }


  void loop()
  {
      Serial.println("Multiplexer #1:");
      for (byte i = 0; i < 16; i++) {
          mux.channel(i);
          int val = analogRead(signal_pin);                       // Read analog value
          Serial.println("Channel "+String(i)+": "+String(val));  // Print value
          delay(200);
      }
      Serial.println("Multiplexer #2:");
      for (byte i = 0; i < 16; i++) {
          mux.channel(i);
          int val = analogRead(signal_pin1);                       // Read analog value
          Serial.println("Channel "+String(i)+": "+String(val));  // Print value
          delay(200);
      }
      
      Serial.println("Multiplexer #3:");
      for (byte i = 0; i < 16; i++) {
          mux.channel(i);
          int val = analogRead(signal_pin2);                       // Read analog value
          Serial.println("Channel "+String(i)+": "+String(val));  // Print value
          delay(200);
      }
          Serial.println("Multiplexer #4:");
      for (byte i = 0; i < 16; i++) {
          mux.channel(i);
          int val = analogRead(signal_pin3);                       // Read analog value
          Serial.println("Channel "+String(i)+": "+String(val));  // Print value
          delay(200);
      }
    delay(1000);
  }
