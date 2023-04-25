import math
import serial


##arduino = serial.Serial('/dev/ttyACM5', 9600, timeout=.1)

## Variables globales
listNotation = ['a','b','c','d','e','f','g',]

def nbCaseTraverser(caseI, caseF):
    listMvt = [caseF]

    if caseI[0] == caseF[0] or caseI[1] == caseF[1]:
        return listMvt

    ## si c'est en diagonale on continue
    ## 4 possibilitées

    diffNotation = listNotation.index(caseF[0]) - listNotation.index(caseI[0])
    diffNum = int(caseF[1]) - int(caseI[1])

    if diffNotation > 0 and diffNum > 0:
        num = int(caseI[1])
        for x in range(listNotation.index(caseI[0]) , listNotation.index(caseF[0])):
            print(x)
            num +=1
            temp = str(listNotation[x+1]) + str(num) 
            listMvt.append(temp)
        listMvt.pop(0)
        return listMvt

    if diffNotation < 0 and diffNum > 0:
        i=1
        num = int(caseI[1])
        for x in range(listNotation.index(caseF[0]) , listNotation.index(caseI[0])):
            print(x)
            num +=1
            temp = str(listNotation[listNotation.index(caseI[0])-i]) + str(num) 
            listMvt.append(temp)
            i+=1
        listMvt.pop(0)
        return listMvt
    

    if diffNotation < 0 and diffNum < 0:
        i=1
        num = int(caseI[1])
        for x in range(listNotation.index(caseF[0]) , listNotation.index(caseI[0])):
            print(x)
            num -=1
            temp = str(listNotation[listNotation.index(caseI[0])-i]) + str(num) 
            listMvt.append(temp)
            i+=1
        listMvt.pop(0)
        return listMvt
    
    if diffNotation > 0 and diffNum < 0:
        i=1
        num = int(caseI[1])
        for x in range(listNotation.index(caseI[0]) , listNotation.index(caseF[0])):
            print(x)
            num -=1
            temp = str(listNotation[x+1]) + str(num) 
            listMvt.append(temp)
            i+=1
        listMvt.pop(0)
        return listMvt


  

def grille():
    posX = -111
    posY = -111
    
    grille = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
              
              

    i=0
    j=0
    k=0
    
    
    for x in range(17):
        for y in range(17):
            if k % 2 ==0 and y % 2 ==0:
                case = {
                "notation" : listNotation[i] + str(y+1),
                "posX" : posX,
                "posY" : posY + (16 * y)
                }
                i+=1
            else :
                case = {
                "notation" : 'ligne',
                "posX" : posX,
                "posY" : posY + (16 * y)
                }

            grille[7-y][k] = case
        if k % 2 ==0:
            j+=1
        posX += 16
        k+=1
        

    print(grille)
    return grille
            

    



def cooToAngle(x,y,L):

    ### formule de theta2
    theta2 = math.degrees(2 * math.asin(math.hypot(abs(x),abs(y))/(2 * L)))
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

    #s'il est dans le cadrant 2, on ajoute 90 deg au theta 1 (ne peut pas dépasser)
    if x <= 0 and y >= 0:
        theta1 = (360 - (2 * theta2))/2 + 180 - theta1
    
    
    #s'il est dans le cadrant 3, on ajoute 180 deg au theta 1 (ne peut pas dépasser)
    if x < 0 and y < 0:
        theta1 = (360 - (2 * theta1))/2 + (2*theta1)

    
    #s'il est dans le cadrant 4, on ajoute 270 deg au theta 1
    if x >= 0 and y <= 0:
        theta1 = (360 - (2 * theta2))/2 + 180 - theta1 + 180


       
    
    if theta1 == 360:
        theta1 -= 360

    theta1 = round(theta1)
    theta2 = round(theta2)

    
    return str(theta2) + ',' + str(theta1)







def test():
    
    grille = grille()

    xi=0
    xf=0
    yi=0
    yf=0
    L=107

    while(True):
    

        caseI = input("choisissez une case initiale : ")
        caseF = input("choisissez une case finale: ")




        ## La variable chemin contient toute les cases à partir de la case initiales jusqu'a la case finale 
        chemin = nbCaseTraverser(caseI,caseF)
        chemin.insert(0,caseI)
        print(chemin)

        listCoo = ''

        for x in chemin:
            for y in range(8):
                for z in range(8):
                    temp = grille[y][z]
                    if temp.get("notation") == x:
                        x = temp.get("posX")
                        y = temp.get("posY")
                        print(str(x) + ", " + str(y))
                        listCoo = listCoo + (cooToAngle(x,y,L) + ',')
                        break


        ##arduino.write(str.encode(listCoo))
        
        print(listCoo)





####################################
# Main()
if __name__ == "__main__":
    test()






