# permet de calibrer les halls effects sensors au début des parties
# ainsi, il est facile d'identifier quel hall effect sensor ne fonctionne pas
import threading as th
import time
import serial
reading = False
lock = th.Lock()
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)



def lireSerial():
    global ser  
    global reading
    print(reading)
    while True:
        with lock:
            if reading:
                line = ser.readline().decode('utf-8').rstrip()
                print(line)
                ser.reset_input_buffer()
                reading = False
            




thread = th.Thread(target=lireSerial, args=())
thread.start()


if __name__ == "__main__":
    while True:
        input()
        with lock:
            ser.write("s#".encode('utf-8'))
            reading = True





