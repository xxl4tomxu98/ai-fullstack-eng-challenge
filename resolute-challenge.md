ResoluteAI Fullstack Challenge
=========================

Welcome to your challenge project!

For this challenge, we ask that you implement a solution at home in your own
time. When you're ready, please send us your results - including code, schema
definitions, commit history if available, and (if you're not using the starter
kit) a readme with setup instructions.


The Details
-----------

Your challenge is to design and implement a search experience for the MovieLens
dataset `ml-latest-small.zip`, which is found at
https://grouplens.org/datasets/movielens/latest/. You will need to write a load
script that pulls the data and loads the application's database for querying.
From the UI, a user can make queries against the data. The application can
support basic keyword queries, and support filtering such as by user id/name,
movie id/name, and movie tags. Display the results as you imagine would be most
helpful for a user. Consider paging the results.


Starter Kit
-----------
We've included a Docker-based starter kit to get you going. The kit includes a
skeleton db, server and client code. You're welcome but not required to use this
as the basis of your project. If you do so, you may change it as you see fit,
and even use a different db, such as elasticsearch, if you wish. To use the
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
* Please don't use the trademark ResoluteAI in the project. We hope the project
  is work that you're proud of, and we want you to be able to share it with
  others or make it public should you wish to.
* Have fun!
