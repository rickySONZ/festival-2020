# HipHop Fest 2020
Welcome to HipHop Fest 2020. This GraphQL API leverages local variables to demonstrate search and CRUD functionality. It does not allow for the permanent storage of data, so any objects that are added, modified or deleted will eventually time out. The local variables to create data are apps, stages, and events.

## Usage

To run (in development mode) use ```npm run dev```
Naviage to http://localhost:5000/graphql
GraphIQL is enabled

## Queries Available
Listed below are the syntax for the appropriate GraphQL queries.
## Apps
### Search Apps, Get List of All Apps

Query Name: apps

##### Use events / stages as an argument to pull any events or stages with this App

{
    apps{
        id
        name
        events{
            id
            name
        }
        stages {
            id
            name
        }
    }
}
### Search App by ID

Query Name: app

{
    app(id: insert ID to search for here){
        id
        name
    }
}

## Search Stages, Get List of All Stages

Query Name: stages

##### Use events as an argument to pull any events with this Stage

{
    stages{
        id
        name
        events {
            id
            name
        }
    }
}

### Search Stage by ID

Query Name: stage

{
    stage(id: insert ID to search for here){
        id
        name
    }
}

### Search Stage by Name

Query Name: stageName

{
    stageName(name: insert name to search for here){
        id
        name
    }
}

## Events

### Search Events, Get List of All Events

Query Name: events

#### Stage can be passed as an argument to get info for stage the event is associated with

{
    events{
        id
        name
        stage {
            id
            name
        }
    }
}

### Search Event by ID

Query Name: event

{
    event(id: insert ID to search for here){
        id
        name
    }
}

### Search Event by Name

Query Name: eventName

{
    eventName(name: insert name to search for here){
        id
        name
    }
}

### Search Events between two dates

Query Name: eventDates

{
    eventDates(startsAt: insert beginning of desired time window, endsAt: insert end of desired time window){
        id
        name
    }
}


## Mutations Available
The arg values are placeholders and should be replaced with desired data
### App
### Add App

##### Mutation: addApp

mutation {
    addApp(id: id, name: name){
        id
        name
    }
}

### Update App 
Did not allow for updating of IDs

##### Mutation: updateApp

mutation {
    updateApp(id: id of app to update, name: name){
        id
        name
    }
}

### Delete App

##### Mutation: deleteApp

mutation {
    deleteApp(id: id of app to delete){
        id
        name
    }
}

### Stage
### Add Stage

##### Mutation: addStage

mutation {
    addStage(id: id, name: name){
        id
        name
    }
}

### Update Stage
Did not allow for updating of IDs

##### Mutation: updateStage

mutation {
    updateStage(id: id of stage to update, name: name){
        id
        name
    }
}

### Delete Stage 

##### Mutation: deleteStage

``` 
mutation {
    deleteStage(id: id of stage to delete){
        id
        name
    }
} 
```

## Events
### Add Event


### Update Event


### Delete Event