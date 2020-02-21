# park-spectre-api

app link : http://parkinspector.herokuapp.com/

<h2>Project-3 - park-spectre-api</h2>
The api is for supplying melbourn city street parking, real-time data.<br/>
(Bay-id, parking availability, Time-restriction, bay-information)<br/>
<br>
<h3>1. The challenge: </h3>
This app provides users real time data of available on street parking spaces in Melbourne city. Melbourne City Council provides few different open apis for their car parking system. However, some apis have old data and parking bay number do not match with other paring bay information at times. After some data cleaning and testing it was finally descided to link two of the open data sets to coincide correctly.<br/>

<h3>2. Solution</h3>
After some testing and data cleaning, the following 2 data sets were identified, they correctly provide the location, availibility, and relevant parking infomration needed to be provided to the users: 
<br> <br>
On-street sensor parking api :<br> https://data.melbourne.vic.gov.au/Transport/On-street-Parking-Bay-Sensors/vh2v-4nfs <br> 
On-street parking restriction api :<br>  https://data.melbourne.vic.gov.au/Transport/On-street-Car-Park-Bay-Restrictions/ntht-5rk7
<br>
The api obtains updated data from the api to populate a database, merge the datasets and provide it to the client.<br/>
To send real-time data, we used SSE (Server Sent Event) tech from server to push data to browser.
<br>

<h3>3. Cool technology</h3>
Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via HTTP connection.<br/>

SSE: 
![alt text][logo]

[logo]: https://4.bp.blogspot.com/-ZQvpkvWYyhg/XLoKAGCdSpI/AAAAAAAAAV8/MFsEcdxBGC4RNWuHH9woD9TE-8SiL9AHgCLcBGAs/s1600/SSE.jpg

Our api is updating real time with on-street parking status so api needs to stream data in regular basis to client. There are few options to solve this problem, as in websoket etc but we don't need bi-directional approach here so we used SSE.


ER diagram: 
![alt text][logos]

[logos]: https://github.com/tmak1/park-spectre-api/blob/master/images/ER_Diagram.png "Logo Title Text 2"
