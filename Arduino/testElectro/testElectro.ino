  #include <light_CD74HC4067.h>


              // s0 s1 s2 s3: select pins
CD74HC4067 mux(3, 4, 5, 6);  // create a new CD74HC4067 object with its four select lines - 8,9,10,11

const int signal_pin = A0; // Pin A0 - Connected to Sig pin of CD74HC4067


  void setup()
  {
      Serial.begin(9600);
      pinMode(signal_pin, INPUT); // Set as input for reading through signal pin
  }


  void loop()
  {
    // loop through channels 0 - 2
      for (byte i = 0; i < 2; i++) {
          mux.channel(i);
          int val = analogRead(signal_pin);                       // Read analog value
          Serial.println("Channel "+String(i)+": "+String(val));  // Print value
          delay(500);
      }
    delay(2000);
  }
