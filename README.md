WARNING: THE EXAMPLE ELASTIC SEARCH SERVICE HAS BEEN SHUT DOWN


# Meatnheat

The next generation cooking platform. Developed using AWS services and a angular frontend.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Usefull design tools
Color:
- http://colormind.io/
- https://color.adobe.com

Fonts:
- https://fontpair.co/
- https://www.typewolf.com/google-fonts


## Roadmap/Todos
- tool to clear the database and elasicsearch
- use lowDB to manage your local storage
- follow other users
- Dashboard - recently viewed
- Dashboard - New Recipes (only from the bigger users)
- Menge der Zutaten pro Person berechnen
- implement Cooking Tutorials
- create a new user pool which allows email and phone logins

## Important Notes
- Zutaten sollten gruppierbar sein (z.B. Zutaten für die Beilage oder Zutaten für die Soße)
- Welche Zeitenangaben sind wichtig für den User ?


## Elastic Search Recipes
- userid (for faster access)
- username (display in the search results)
- userimage (display in the search results)
- recipeid
- title
- image

## User Data for the next user pool

- email and phone logins
- first name
- last name
