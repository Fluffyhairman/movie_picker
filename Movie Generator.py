#Import the random module
import random as rand

#open a file and read it
file = open ("/Users/vickcoding/Coding projects/movie.txt",'r')

#create a variable called movie that has a list of all 
#the movies we want to look at
movie = []

#store the values as strings
for i in file.readlines():
    movie.append(i)

#close the file
file.close()

#Generate a random number
random_number = rand.randint (0, len(movie)-1)

#determine the chosen movie
potential = movie[random_number]

#run a logic check for a multi movie sequence
#check if the random movie is one of the lord of the rings movie
if (potential[:21] == "The Lord of the Rings"):
   
   #if it is, iterate through the movie list to find the first lord of the rings movie
    for i in movie:

        #check if its a lord of the rings movie
        if (i[:21] == "The Lord of the Rings"):
            
            #set the chosen variable as the first instance of it
            chosen = i

            #exit the for loop
            break
else:
    #return the movie that was randomly chosen
    chosen = potential

#remove the movie from the list
movie.remove(chosen)

#open a file and write to it it
file = open ("/Users/vickcoding/Coding projects/movie.txt",'w')

#rewrite the movies into the file without the chosen movie
for i in movie:
    file.write(i)

#close the file
file.close()

#Print what the movie will be
print('The movie Jesus has determined is:', chosen)

