# park-spectre-api

link : http://parkinspector.herokuapp.com/

<h2>Project-3 - park-spectre-api</h2>
The api is for supplying melbourn city street parking, real-time data.<br/>
(Bay-id, parking availability, Time-restriction, bay-information)<br/>
We used 2 melbourne city parking api - on-street sensor parking api, on-street parking restriction api
<br>
<h3>1.Challenges - define the problem</h3>
Melbourne city provides few different apis for car parking system. They are all public open apis. But some api has old datas and bay number is not matching many times<br/>
on-street sensor parking is updating real-time, so our api needs real-time stream tech to browser.
<br>
<h3>2. demo your solution</h3>
we had to create new database to merge all datas and create data we need for our app.<br/>
To send real-time data, we used SSE (Server Sent Event) tech from server to push data to browser.
<br>
<h3>3. Cool technology</h3>
Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via HTTP connection.<br/>
Our api is updating real time with on-street parking status so api needs to stream data in regular basis to client. There are few options to solve this problem, as in websoket etc but we don't need bi-directional approach here so we used SSE.
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/tmak1/park-spectre-client/blob/master/app.js "Logo Title Text 2"
