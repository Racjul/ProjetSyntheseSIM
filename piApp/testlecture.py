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

def fen_to_board(fen):
    board = []
    for row in fen.split('/'):
        brow = []
        for c in row:
            if c == ' ':
                break
            elif c in '12345678':
                brow.extend( ['--'] * int(c) )
            elif c == 'p':
                brow.append( 'bp' )
            elif c == 'P':
                brow.append( 'wp' )
            elif c > 'Z':
                brow.append( 'b'+c.upper() )
            else:
                brow.append( 'w'+c )

        board.append( brow )
    return board

if __name__ == "__main__":
    while True:
        input()
        with lock:
            ser.write("s#".encode('utf-8'))
            reading = True





