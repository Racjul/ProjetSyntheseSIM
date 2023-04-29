#ifndef Multiplexer_h
#define Multiplexer_h

#include "Arduino.h"

class Multiplexer
{
private:
    int* listOut;
public:
    Multiplexer(int out1,int out2,int out3,int out4, int ana1);
    ~Multiplexer();
    int out1, out2, out3, out4, ana1;
    
    float readChannel(int channelNumber);
   
    int channel[16][4]={
    {0,0,0,0}, 
    {1,0,0,0}, 
    {0,1,0,0}, 
    {1,1,0,0}, 
    {0,0,1,0}, 
    {1,0,1,0}, 
    {0,1,1,0}, 
    {1,1,1,0}, 
    {0,0,0,1}, 
    {1,0,0,1}, 
    {0,1,0,1}, 
    {1,1,0,1}, 
    {0,0,1,1}, 
    {1,0,1,1}, 
    {0,1,1,1}, 
    {1,1,1,1}  
  };
};

#endif
