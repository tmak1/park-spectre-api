# park-spectre-api

app link : http://parkinspector.herokuapp.com/

<h2>Project-3 - park-spectre-api</h2>
The api is for supplying melbourn city street parking, real-time data.<br/>
(Bay-id, parking availability, Time-restriction, bay-information)<br/>

We used 2 melbourne city parking api : <br> <br>
on-street sensor parking api :<br> https://data.melbourne.vic.gov.au/Transport/On-street-Parking-Bay-Sensors/vh2v-4nfs <br> 
on-street parking restriction api :<br>  https://data.melbourne.vic.gov.au/Transport/On-street-Car-Park-Bay-Restrictions/ntht-5rk7
<br>
<h3>1. The challenge: </h3>
Melbourne city provides few different open api data for car parking system. But some api has old data and parking bay number do not match with other paring bay info at times <br/>
<br>
<h3>2. Solution</h3>
we had to create new database to merge all datas and create data we need for our app.<br/>
To send real-time data, we used SSE (Server Sent Event) tech from server to push data to browser.
<br>
<h3>3. Cool technology</h3>
Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via HTTP connection.<br/>
![alt text][logo]

[logo]: https://4.bp.blogspot.com/-ZQvpkvWYyhg/XLoKAGCdSpI/AAAAAAAAAV8/MFsEcdxBGC4RNWuHH9woD9TE-8SiL9AHgCLcBGAs/s1600/SSE.jpg
Our api is updating real time with on-street parking status so api needs to stream data in regular basis to client. There are few options to solve this problem, as in websoket etc but we don't need bi-directional approach here so we used SSE.
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/tmak1/park-spectre-api/blob/master/images/ER_Diagram.png "Logo Title Text 2"
