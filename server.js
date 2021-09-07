const express = require('express')
const expressGraphQL = require('express-graphql')
const { graphqlHTTP } = require('express-graphql')

const {
    GraphQLSchema,
    GraphQLObejectType,
    GraohQLString,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const app = express()

const apps = [
    {
    id: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    name: "HipHopFest 2020"
    }
    ]

const stages = [
    {
        id: "a4087686-ee6c-49d8-a4f0-d67f5931df3a",
        name: "Rizzle Stage"
    },
    {
        id: "89be560f-6905-471a-8096-102e29a84e77",
        name: "Tizzle Stage"
    },
    {
        id: "a6bb97dc-224c-4f8f-9af7-fd8b5731840f",
        name: "Fo’shizzle Stage"
    }
]

const events = [
    {
    id: "b4781407-da92-475e-8d87-596aee0d7f2d",
    appId: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    stageId: "a4087686-ee6c-49d8-a4f0-d67f5931df3a",
    name: "Kanye West",
    description: "Kanye Omari West is an American rapper, singer, songwriter, record producer, fashion designer, and entrepreneur.",
    image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/KanyeWest.jpeg",
    startsAt: 1577916000,
    endsAt: 1577919600
    },
    {
    id: "b471f99a-0942-4e4f-be26-344fe5f7e88d",
    appId: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    stageId: "a4087686-ee6c-49d8-a4f0-d67f5931df3a",
    name: "Drake",
    description: "Aubrey Drake Graham is a Canadian rapper, singer, songwriter, record producer, actor, and entrepreneur. Drake initially gained recognition as an actor on the teen drama television series Degrassi: The Next Generation in the early 2000s.",
    image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/Drake.jpeg",
    startsAt: 1577919600,
    endsAt: 1577923200
    },
    {
    id: "0161c438-21ca-4112-a166-91cff2a3e1b3",
    appId: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    stageId: "89be560f-6905-471a-8096-102e29a84e77",
    name: "Kendrick Lamar",
    description: "Kendrick Lamar Duckworth is an American rapper and songwriter. Raised in Compton, California, Lamar embarked on his musical career as a teenager under the stage name K-Dot, releasing a mixtape that garnered local attention and led to his signing with indie record label Top Dawg Entertainment (TDE)",
    image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/Kendrick.jpeg",
    startsAt: 1577916000,
    endsAt: 1577919600
    },
    {
    id: "4867d1ca-cabe-485f-aef8-daac15c1f998",
    appId: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    stageId: "89be560f-6905-471a-8096-102e29a84e77",
    name: "Future",
    description: "Nayvadius DeMun Wilburn, known professionally as Future, is an American rapper, singer, songwriter, and record producer.",
    image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/Future.jpeg",
    startsAt: 1577919600,
    endsAt: 1577923200
    },
    {
    id: "d4cec773-c287-4efe-aca5-4274accb6656",
    appId: "b810bf6d-d81d-4104-bc1a-3b21d5154076",
    stageId: "a6bb97dc-224c-4f8f-9af7-fd8b5731840f",
    name: "J. Cole",
    description: "Jermaine Lamarr Cole, better known by his stage name J. Cole, is an American hip hop recording artist and record producer.",
    image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/JCole.jpeg",
    startsAt: 1577923200,
    endsAt: 1577930400
    }
    ]

const EventType = new GraphQLObjectType({
    name: 'Event',
    description: 'List of all events',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLNonNull(GraphQLString)},
        appId: { type: GraphQLNonNull(GraphQLString)},
        stageId: { type: GraphQLNonNull(GraphQLString)},
        description: { type: GraphQLNonNull(GraphQLString)},
        image: { type: GraphQLNonNull(GraphQLString)},
        startsAt: { type: GraphQLNonNull(GraphQLInt)},
        endsAt: { type: GraphQLNonNull(GraphQLInt)},
        // Allows to search for the stage an event belongs to
        stage: {
            type: StageType,
            resolve: (arg) => {return stages.find(stage => stage.id === arg.stageId)}
        }
    })
})
    // Definition of an App object
const AppType = new GraphQLObjectType({
    name: 'App',
    description: 'List of all apps',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLString)},
        name: { type: GraphQLNonNull(GraphQLString)},
        // Allows for access to stages nested in this app
        stages: {
            type: GraphQLList(StageType),
            resolve: (apps) => {return stages.filter(stage => stage.appId === apps.id)}
        },
        // Allows for access to events nested in this app
        events : {
            type: GraphQLList(EventType),
            resolve: (apps) => {return events.filter(event => apps.id === event.appId)}
        }
    })
})

const StageType = new GraphQLObjectType({
    name: 'Stage',
    description: 'List of all stages',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString)},
        name: { type: GraphQLNonNull(GraphQLString)},
        events: {
            type: GraphQLList(EventType),
            resolve: (stages) => {return events.filter(event => event.stageId === stages.id)}
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({


        // Query Event by ID
        event: {

            type: EventType,
            description: "Single Event",
            args: {
                id: {type: GraphQLString}
            },
            resolve: (parent, args) => 
            events.find(event => event.id === args.id)
        },
        // Query event by name
        eventName: {
            type: EventType,
            description: "Single Event by Name",
            args: {
                name: {type: GraphQLString}
            },
            resolve: (parent, args) => 
            events.find(event => event.name === args.name)
        },
        // Query event by name
        eventDates: {
            type: GraphQLList(EventType),
            description: "Filter events by start and end date",
            args: {
                startsAt: {type: GraphQLInt},
                endsAt: {type: GraphQLInt}
            },
            resolve: (parent, args) => 
            events.filter(event => event.startsAt >= args.startsAt && event.endsAt <= args.endsAt)
        },
        // Query App by ID
        app: {
            type: AppType,
            description: "Single App",
            args: {
                id: {type: GraphQLString}
            },
            resolve: (parent, args) => apps.find(app => app.id === args.id)
        },
        // Query Stage by ID
        stage : {
            type: StageType,
            description: "Single Stage",
            args: {
                id: {type: GraphQLString}
            },
            resolve: (parent, args) => stages.find(stage => stage.id === args.id)
        },
        // Query Stage by Name
        stageName : {
            type: StageType,
            description: "Single Stage",
            args: {
                name: {type: GraphQLString}
            },
            resolve: (parent, args) => stages.find(stage => stage.name === args.name)
        },
        // Query all Apps
        apps: {
            type: new GraphQLList(AppType),
            description: "List of all apps",
            resolve: () => apps
        },
        // Query all Stages
        stages: {
            type: new GraphQLList(StageType),
            description: 'List of stages',
            resolve: () => stages
        },
        // Query all events
        events: {
            type: new GraphQLList(EventType),
            description: 'List of events',
            resolve: () => events 
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addApp: {
            type: AppType,
            description: 'Add an app',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const newApp = {id: args.id, name: args.name}
                apps.push(newApp)
            }
        },
        addStage: {
            type: StageType,
            description: 'Add an app',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLNonNull(GraphQLString)},
                appId: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const newStage = {id: args.id, name: args.name, appId: args.appId}
                stages.push(newStage)
            }
        },
        addEvent: {
            type: EventType,
            description: 'Add an event',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                appId: { type: GraphQLNonNull(GraphQLString)},
                stageId: { type: GraphQLNonNull(GraphQLString)},
                image: {type: GraphQLNonNull(GraphQLString)},
                startsAt: { type: GraphQLNonNull(GraphQLInt)},
                endsAt: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const newEvent = {
                    id: args.id,
                    name: args.name, 
                    appId: args.appId,
                    description: args.description,
                    stageId: args.stageId,
                    image: args.image,
                    startsAt: args.startAt,
                    endsAt: args.endsAt
        }
                events.push(newEvent)
            }
        },
        updateApp: {
            type: AppType,
            description: 'Edit an app',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString}
            },
            resolve: (parent, args) => {
                let updateId = apps.findIndex(app => app.id === args.id)
                if(updateId){
                    if(args.name) apps[updateId].name = args.name
                }
            }
        },
        updateStage: {
            type: StageType,
            description: 'Edit a stage',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString},
                appId: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                let updateId = stages.findIndex(stage => stage.id === args.id)
                if(updateId){
                    if(args.name) stages[updateId].name = args.name
                    if(args.appId) stages[updateId].appId = args.appId
                }
            }
        },
        updateEvent: {
            type: EventType,
            description: 'Add an event',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString},
                description: {type: GraphQLString},
                appId: { type: GraphQLString},
                stageId: { type: GraphQLString},
                image: {type: GraphQLString},
                startsAt: { type: GraphQLInt},
                endsAt: { type: GraphQLInt}
            },
            resolve: (parent, args) => {
               updateId = events.findIndex(event => event.id === args.id)
                if(updateId){
                    if(args.name) events[updateId].name = args.name
                    if(args.description) events[updateId].description = args.description
                    if(args.appId) events[updateId].appId = args.appId
                    if(args.stageId) events[updateId].stageId = args.stageId
                    if(args.image) events[updateId].image = args.image
                    if(args.startsAt) events[updateId].startsAt = args.startsAt
                    if(args.endsAt) events[updateId].endsAt = args.endsAt
                }
            }
        },
        deleteApp: {
            type: AppType,
            description: 'Delete an app',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                let deleteId = apps.findIndex(app => app.id === args.id)
            
                if(deleteId){
                  let deleted = apps.splice(deleteId, 1)[0]
                  return deleted
                }
            }
        },
        deleteStage: {
            type: StageType,
            description: 'Delete a stage',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                let deleteId = stages.findIndex(app => app.id === args.id)
            
                if(deleteId){
                  let deleted = stages.splice(deleteId, 1)[0]
                  return deleted
                }
            }
        },
        deleteEvent: {
            type: EventType,
            description: 'Delete an event',
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                let deleteId = events.findIndex(app => app.id === args.id)
            
                if(deleteId){
                  let deleted = events.splice(deleteId, 1)[0]
                  return deleted
                }
            }
        }

        })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    mutation: schema
}))

app.listen(5000., () => console.log("The Server is Online"))