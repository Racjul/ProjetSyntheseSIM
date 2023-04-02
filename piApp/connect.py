import firmata
import time

def connect():
    board = pyfirmata.Arduino(deviceName)
    print("Communication Successfully started")