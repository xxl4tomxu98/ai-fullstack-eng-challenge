MovieLens Fullstack Challenge
=========================

Welcome to my Movielens project!


The Details
-----------

My challenge is to design and implement a search experience for the MovieLens
dataset `ml-latest-small.zip`, which is found at
https://grouplens.org/datasets/movielens/latest/. I wrote a load script that pulls
the data and loads the application's database for querying.
From the UI, a user can make queries against the data. The application can
support basic keyword queries, and support filtering such as by user id/name,
movie id/name, and movie tags. Display the results as you imagine would be most
helpful for a user. Consider paging the results.


Starter Kit
-----------
A Docker-based starter kit to get you going. The kit includes a skeleton db, server
and client code. This is definitely one of popular way to be used as the basis of the
project. Another two methods involving frontend sorting and pagination and backend 
sorting and pagination were also attached. To use the docker container based 
starter kit, follow the readme in challenge-eng-base-master.


Suggestions
-----------

* Think about both the technical design (how to model your data, structure your
  APIs) and also the user experience (how should a search product work).
* Write unit tests.
* Use open source libraries if needed rather than reinventing the wheel. Here
  are a some relevant tools that we use, but you can use the tools you are most
  comfortable with:
```
    github.com/facebook/react
    github.com/MariaDB/server
    github.com/pallets/flask
    github.com/elastic/elasticsearch
```
* I hope the project is work I am proud of, and I hope you would like it and feel
free to share and fork and allow others or make it public should you wish to.
* Have fun!
