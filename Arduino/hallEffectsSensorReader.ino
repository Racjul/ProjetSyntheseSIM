#include<string.h>

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    if (Serial.available() > 0) {
       
        Serial.print("You sent me: ");
        Serial.println(data);
    }

}