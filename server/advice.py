import math
import random

advice_expressions=["","ouch!!","Watch out!","careful","alert!"]
advice_descriptor=["a blunder","a mistake","an inaccuracy"]


def advice(game,analysis,blunder_threshold):


    
    blunders=[]
    for value in analysis["cp_lost"]:
        if abs(value) >= blunder_threshold:
           blunders.append(analysis["cp_lost"].index(value))

    print(blunders)
    for move_number in blunders:
        if abs(analysis["cp_lost"][move_number])>=blunder_threshold:
            
            # format move number for display
            remainder = move_number % 2
            quotient = math.floor(move_number / 2)
            if (remainder != 0):
                move_number1=quotient+remainder
                formatted_move_number=".."+str(move_number1)
                
            else:
                formatted_move_number=quotient+remainder+1
                

            # format cp loss
            formatted_cp_lost=(analysis["cp_lost"][move_number])/100

            # create_advice="on move# {}, {}  was a mistake. Lost {} points. Best Move was {}"\
            # .format(formated_move_number+1,game["moves_san"][move_number],formated_cp_lost,game["bestmove"][move_number])

            expression=random.choice(advice_expressions)
            descriptor=random.choice(advice_descriptor)
            
            create_advice="move-# {formatted_move_number} {move} was {descriptor}. Lost {formatted_cp_lost} points. Better was {bestmove}"\
            .format(expression=expression,formatted_move_number=str(formatted_move_number),move=game["moves_san"][move_number],descriptor=descriptor,formatted_cp_lost=formatted_cp_lost,bestmove=game["bestmove"][move_number])

            if(formatted_cp_lost > 1000):
                create_advice="{expression} move-# {formatted_move_number} {move} was {descriptor}. Moved into mate."\
                .format(expression=expression,formatted_move_number=str(formatted_move_number),move=game["moves_san"][move_number],descriptor=descriptor)

        analysis["advice"].append(create_advice)
