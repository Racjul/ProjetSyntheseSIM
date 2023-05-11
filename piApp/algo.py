import math
import serial
import numpy as np

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

class Grille:
    
    def __init__(self, widht,colorBot):
        self.colorBot= colorBot
        self.L = 100
        self.nbRow = 17
        self.nbColumn = 17
        self.listNotation = ['a','b','c','d','e','f','g','h']
        self.grille = []
        
        
        
        
        i=8
        k=0
        posX = -widht
        posY = widht
        for row in range(self.nbRow):
            temp = []
            for column in range(self.nbColumn):
                if row % 2 !=0 and column % 2 !=0:
                    case = {
                    "notation" : self.listNotation[k] + str(i),
                    "posX" : posX + (16* column),
                    "posY" : posY
                    }
                    print(case)
                    k+=1
                    if k == 8:
                        k=0
                        i-=1
                    
                else :
                    case = {
                    "notation" : 'ligne',
                    "posX" : posX + (16 * column),
                    "posY" : posY 
                    }

                temp.append(case)
            self.grille.append(temp)
            posY -= 16

        self.grilleCapture =[]
        for x in range(8):
            temp = []
            for y in range(2):
                case = {
                    "posX" : 145 + 17 * y,
                    "posY" : 111 - 32 * x,
                    "free" : True
                }
                temp.append(case)
            self.grilleCapture.append(temp)
                
        
       
        
    def cooToAngle(self,x,y,rectification):

        ### formule de theta2
        theta2 = math.degrees(2 * math.asin(math.hypot(abs(x),abs(y))/(2 * self.L)))
        theta2 = round(theta2,2)

        ##formule de beta
        b = math.degrees(math.asin(abs(y)/math.hypot(abs(x),abs(y))))
        b = round(b,2)

        ## formule d'alpha
        a = (180 - theta2) / 2

        ## theta 1
        theta1 = b + a
        

        ##############################################################
        ## ajustement des cadrant et choix du theta 1
        # on ajoute 90 degrés au theta 1 par cadrant 
        # MAIS, on ne veut pas que le theta 1 dépasse 360 degrées, donc on les choisis en fonction de ce paramètre 
        # éventuellement, on pourra le choisir en fonction du trajet qu'il devra faire pour éviter qu'il dépasse de 360 degrés
        # (il ne peut pas dépasser 360 degrés à cause d'une contrainte de construction (fils))

        #numérotation des cadrants selon le contexte:  2 1
        #                                              3 4

        
        
        
        #si on est dans le quadrant 1, on n'a rien a faire

        #s'il est dans le cadrant 2
        if x <= 0 and y >= 0:
            theta1 = (360 - (2 * theta2))/2 + 180 - theta1
        
        
        #s'il est dans le cadrant 3
        if x < 0 and y < 0:
            theta1 = (360 - (2 * theta1))/2 + (2*theta1)

        #cadrant4
        if x >= 0 and y <= 0:
            theta1 = (360 - (2 * theta2))/2 + 180 - theta1 + 180


        
        

        theta1 = round(theta1,1)
        theta2 = round(theta2,1)

        if rectification and x >0 and y > 0:
            theta1 += 360
        
        return str(theta2) + ',' + str(theta1)

    def chemin(self,caseI,caseF):
        listMvt = []
        posLigne = 16- ((2 * (int(caseI[1]) -1))+1)
        posColonne = 2 * self.listNotation.index(caseI[0]) + 1
            
        if caseF == None:
            i=0
            listMvt.append(f"{posLigne},{posColonne}")
            listMvt.append(f"{posLigne-1},{posColonne}")
            while(posColonne +i != 17):
                listMvt.append(f"{posLigne-1},{posColonne+i}")
                i+=1
            return listMvt
        
        
        
        
        ##on veut prendre un déplacement d'une case initiale à une case finale et la transformer en plein de petit déplacements pour augmenter la précision
        ##4 possibilités
        
        diffColonne = self.listNotation.index(caseF[0]) - self.listNotation.index(caseI[0])
        diffLigne = int(caseI[1]) - int(caseF[1])
        
        
        ##Si on se déplace sur la colonne
        if diffColonne == 0 and diffLigne != 0:
            
            templistColonne = []
            
            ##on prend la colonne en question:
            for x in range(17):
                templistColonne.append(self.grille[x][posColonne].get("notation"))
                
            ##on trouve l'index de la case initiale et on se rend à la case finale
            itteration = int(diffLigne/ abs(diffLigne))
            indexCaseI = templistColonne.index(caseI)
            i=0
            while True:
                listMvt.append(str(indexCaseI+i) + "," + str(posColonne))
                if templistColonne[indexCaseI+i] == caseF:
                    break
                i += itteration
        elif diffColonne != 0 and diffLigne == 0:
            ##Si on se déplace sur la ligne
            templistLigne = []
            
            ##on prend la colonne en question:
            for x in range(17):
                templistLigne.append(self.grille[posLigne][x].get("notation"))
                
            ##on trouve l'index de la case initiale et on se rend à la case finale
            itteration =  int(diffColonne/ abs(diffColonne))
            indexCaseI = templistLigne.index(caseI)
            i=0
            while True:
                listMvt.append(str(posLigne) + "," + str(indexCaseI+i))
                if templistLigne[indexCaseI+i] == caseF:
                    break
                i += itteration
        elif diffColonne != 0 and diffLigne != 0 and abs(diffColonne) == abs(diffLigne):
            ##on se déplace sur la diagonale
            itterationColonne = int(diffColonne / abs(diffColonne))
            itterationLigne = int(diffLigne/ abs(diffLigne))
            
            ##trouver l'index de la case I sur la grille 
            
            i=0 
            k=0
             
            while True:
                listMvt.append(str(posLigne+k) + "," + str(posColonne+i))
                
                if self.grille[posLigne + k][posColonne+i].get("notation") == caseF:
                    break
                i+= itterationColonne
                k+= itterationLigne
        elif (abs(diffColonne) == 2 and abs(diffLigne) == 1) or ( abs(diffColonne) ==1 and abs(diffLigne)==2):
            itterationColonne = int(diffColonne / abs(diffColonne))
            itterationLigne = int(diffLigne/ abs(diffLigne))
            print("C'Est un knight")
            posLigne = 16- ((2 * (int(caseI[1]) -1))+1)
            posColonne = 2 * self.listNotation.index(caseI[0]) + 1
            
            print(itterationLigne)
            print(itterationColonne)
            
            
            listMvt.append(str(posLigne) + "," + str(posColonne))
            
            if abs(diffColonne)==1:
                for i in range(5): 
                    listMvt.append(str(posLigne + i * itterationLigne) + "," + str(posColonne +  itterationColonne))
                listMvt.append(str(posLigne + 4 * itterationLigne) + "," + str(posColonne + 2 * itterationColonne))
            
            if abs(diffLigne)==1:
                for i in range(5): 
                    listMvt.append(str(posLigne + itterationLigne) + "," + str(posColonne + i * itterationColonne))
                listMvt.append(str(posLigne + 2 * itterationLigne) + "," + str(posColonne + 4 * itterationColonne))
                
        
        
        return listMvt
    
    
    def pathToAngle(self,path):
        rectification = False
        angles =""
        for i in path:
            temp = i.split(',')
            
            x = self.grille[int(temp[0])][int(temp[1])].get("posX")
            y = self.grille[int(temp[0])][int(temp[1])].get("posY")
            ##print(f"x: {x}, y: {y}")
            if x >0 and y <0:
                rectification= True
            angles = angles + str(self.cooToAngle(x,y,rectification)) + ","
        return angles
        
    
    def moveCapture(self,caseCapture):
        for x in self.grilleCapture:
            for y in range(1,-1,-1):
                if x[y].get("free"):
                    x[y]["free"] = False
                    posXCapture = x[y].get("posX")
                    posYCapture = x[y].get("posY")
                    break
        
        path = self.chemin(caseCapture,None)
        
        ligne  = 16- ((2 * (int(caseCapture[1]) -1))+1)
        i=1
        
        while self.grille[ligne + i-1][16].get("posY") != posYCapture:
            path.append(f"{ligne+i},16")
            i+=1
        
        angles = self.pathToAngle(path)
        
        
        
        angles = angles+ str(self.cooToAngle(posXCapture,posYCapture,False)+",")
        return angles 
    
    def move(self,caseI,caseF,capture, enPassant):
        angles = ""
        if capture and enPassant== False:
            ##print(self.moveCapture(caseF))
            angles = "c" + self.moveCapture(caseF) + ";"
            
            
        path = self.chemin(caseI,caseF)
        angles = angles + self.pathToAngle(path) + "%"
        print("it works")
        ser.write(angles.encode())
    
        
              
    def castleKingSide(self):
        if self.colorBot== "white":
            path = self.chemin("e1","g1")
            angles1 = self.pathToAngle(path)
            print(angles1)
            
            path = ["15,15"]
            for x in range(5):
                path.append(f"16,{15-x}")
            path.append("15,11")
            angles2 = self.pathToAngle(path)
            print(angles2)
        elif self.colorBot =="black":
            path = self.chemin("e8","g8")
            angles1 = self.pathToAngle(path)
            print(angles1)
            
            path = ["1,15"]
            for x in range(5):
                path.append(f"0,{15-x}")
            path.append("1,11")
            angles2 = self.pathToAngle(path)
            print(angles2)
        
        
    def castleQueenSide(self):
        if self.colorBot== "white":
            path = self.chemin("e1","c1")
            angles1 = self.pathToAngle(path)
            print(angles1)
            
            path = ["15,1"]
            for x in range(7):
                path.append(f"16,{1+x}")
            path.append("15,7")
            angles2 = self.pathToAngle(path)
            print(angles2)
        elif self.colorBot =="black":
            path = self.chemin("e8","c8")
            angles1 = self.pathToAngle(path)
            print(angles1)
            
            path = ["1,1"]
            for x in range(7):
                path.append(f"0,{1+x}")
            path.append("1,7")
            angles2 = self.pathToAngle(path)
            print(angles2)
    
 
def test():
   
    grille = Grille(127,"black")
    capture = True
    cI = input("Entrez une case initile: ")
    cF = input("Entrez une case finale: ")

    print(grille.move(cI,cF,capture,False))
	##arduino.write(str.encode(grille.deplacer(cI,cF)))
	##print(grille.cooToAngle(17,-79))



if __name__ == "__main__":
	test()



            
            
        
        
