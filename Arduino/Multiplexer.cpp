#include<Arduino.h>
#include"Multiplexer.h"

Multiplexer::Multiplexer(int out1,int out2,int out3,int out4, int ana1)
{
    this->out1 =out1;
    this->out2 = out2;
    this->out3 = out3;
    this->out4 = out4;
    this->ana1 = ana1;      

    pinMode(out1,OUTPUT);
    pinMode(out2,OUTPUT);
    pinMode(out3,OUTPUT);
    pinMode(out4,OUTPUT);

    digitalWrite(out1, LOW);
    digitalWrite(out2, LOW);
    digitalWrite(out3, LOW);
    digitalWrite(out4, LOW);

    int liste[4] = {out1,out2,out3,out4}; 
    listeOut = liste;
}

float Multiplexer::readChannel(int channelNumber)
{
    for(int i= 0; i<4;i++)
    {
        digitalWrite(listeOut[i],channel[channelNumber][i]);   
    }

    return analogRead(ana1);
}


Multiplexer::~Multiplexer()
{
    delete[] listeOut;
}