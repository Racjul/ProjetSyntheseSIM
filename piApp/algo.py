def algo(x,y):
    
    #******Information importante
    #Toutes les mesures sont en milimètre

    #Grandeur du jeu
    Yhauteur_jeux=400
    Xlargeur_jeux=600


    #y et x sont les valeurs dans le plans de la case où l'on veut que l'aimant se déplace
    if(x>Xlargeur_jeux):
        print("position en x invalide")
        return
    
    if(y>Yhauteur_jeux):
        print("position en y invalide")
        return
    


    #longueur des branches  
    longueurBranche=300

    #rayon et nombre de dents des engrenages 
    rayonmenante = 5
    #rayonMene = ?

    nbDentMenante = 20
    nbDentMene = 50

    #Le rapport d'engrenage détermine le rapport de vitesse angulaire, donc le rapport entre le nombre d'angle parcourue ===> 
    #si le rapport est de 1/2, la roue 2 tourne de 1/2 fois pour chaque degrés
    raportEngrenage = nbDentMenante/nbDentMene

    angle_par_step_petit_engrenage = 200/360

    #représante le nombre de degré que la branche tourne (relié au grand engrenage)
    angle_par_step_grand_engrenage = raportEngrenage * angle_par_step_petit_engrenage


    #les angles sont a partir de l'axe des y pour l'agle  et à partir de l'autre branche pour l'angle 2
    Angle1 = math.degrees(math.atan(y/x)-2*math.sin(math.sqrt((x^2)+(y^2))/2))

     