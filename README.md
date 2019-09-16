# HackTheNorth2019

## Inspiration
When we’re visiting friends, the last thing we want to do is constantly pull out our phones to check bus routes. It’s a hassle and takes away from what should be carefree time. It feels like we either spend the last 5 minutes of every visit obsessively checking the bus, or we get to the stop 5 minutes early -- either way, that’s time lost.

InTime is our way of reducing that time. Instead of having to perform multiple actions to find a bus on Google Maps, what if the bus times were a turn of the wrist away?

## What it does
InTime uses a Fitbit, Firebase, HERE Maps API and React-Native to deliver a more seemless experience while taking transit. Every 3 minutes a request gets sent to a couple of Firebase Cloud Functions, which return data about the 3 closest bus routes, and how long before each bus arrived. Coupled with the React-Native Mobile App, the user can select their perferered route, and link the app with the Fitbit.

## How we built it
We started the project with an idea in mind; how can we improve the way people get around? Transit is something we all take, so we decided to focus on that.

We started by building the design using Figma, a prototyping solution, exactly what we needed.

We then used Expo to create the React-Native App.

We used the Fitbit studio

## Challenges we ran into
Sleep, or lack there of (Lol). We ran into a lot of challenges with Firebase Cloud Functions, especially when creating API calls. There were issues with Axios, Fetch, and Request. Overall we got past all of the challenges, and documented each step of the way (thank goodness for whiteboards)

## Accomplishments that we're proud of
UI Elegance and seemless integration from IOS/Android app to the Fitbit itself. In our experience, during hackathons, most of the time the end products have many working components, but can sometimes lack a seemless experience to the user. We feel like our product fits together perfectly, with practicallity and a clean design at the forefront of our project.

## What we learned
We learned a ton, from working with modern technologies, to working as a team (and without sleep).

## What's next for InTime
Publishing to the App Store, and the Google Play Store. The goal is to get InTime into as many hands as possible so that more people can spend less time waiting for transit, and more time living their lives!

Built With React + React-Native, Firebase, HereMap, Cloud-Functions, Figma, Fitbit

## Authors:
https://github.com/evanmkim
https://github.com/timothy-e
https://github.com/M-Faheem-Khan
https://github.com/EricMarcantonio
