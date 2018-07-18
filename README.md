#Readme
##RULES:
Modified so that the server requires an intial folder
to read the file. So the URL must be typed as such 
-- localhost:8000/home/index.html -- for a file that is 
contained in the home folder. 

##API Calls: 
Call the api by redirecting to an address that
starts with '/api' and followed by a path to your api
location. In the serveApiCall function, add your path to
switch statement, then add a function call to that case
and a break statement. Then create your function to
perform what the api endpoint is meant to do.