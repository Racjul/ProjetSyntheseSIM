import time
import serial
import threading

def connection():
    con = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    con.reset_input_buffer()
    read(con)
def read(con):
    con.write(b"Hello from Pi!\n")
    line = con.readline().decode('utf-8').rstrip()
    print(line)
    timer  = threading.Timer(1,read(con)).start()
if __name__ == '__main__':
    connection()

     