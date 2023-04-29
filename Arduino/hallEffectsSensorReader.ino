#include<Multiplexer.h>
void setup()
{
    Multiplexer multiplexer1(1,2,3,4,0);
    Multiplexer multiplexer2(1,2,3,4,1);
    Multiplexer multiplexer3(1,2,3,4,2);
    Multiplexer multiplexer4(1,2,3,4,3);
    Serial.begin(9600);
}

void loop()
{

    if (Serial.available() > 0) {
       
        Serial.print("You sent me: ");
        Serial.println(data);
    }

}