var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var Course = require( "./models/course");
var mongoose = require("mongoose")

var indexRouter = require('./routes/index');


const expressGraphQL = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Enabling cors
var cors = require('cors');
app.use(cors());

app.use('/', indexRouter);

//Connecting to mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))









    const CourseType = new GraphQLObjectType({
        name:'Course',
        description:'Represents courses from a college',
        fields:()=> ({
          _id:{type: (GraphQLString)},
          code: {type: (GraphQLString)},
          name:{ type: (GraphQLString)},
          section:{ type: (GraphQLInt)},
          semester:{ type: (GraphQLInt)},
            
          }
        )
    })
      

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({

        course: {
            type: CourseType,
            description: 'Represents a course',
            args: {
                id: { type: GraphQLInt },

            },
            resolve: async (parent, args) => {
              try{
                const response = await Course.find().exec();
                return response;
            
        
            }
        
            catch (error){
                console.log(error.message);
                return {error:error.message}
        
            }
                
            }
        } ,
        courses: {
            type: new GraphQLList(CourseType),
            description: 'Represents courses',
            resolve: async (parent, args) => {
              try{
                const response = await Course.find().exec();
                return response;
            
        
            }
        
            catch (error){
                console.log(error.message);
                return {error:error.message}
        
            }
                
            }
        }
    })
})


const RootMutationType= new GraphQLObjectType({
    name:'Mutation',
    description:'Root Mutation',
    fields:()=>({
      addCourse:{
        type:CourseType,
        description:'Add Course',
        args:{
            //code: 1, name: "Emerging Technologies", section: 3, semester: 2 
          code: {type: GraphQLNonNull(GraphQLString)},
          name: { type: GraphQLNonNull(GraphQLString) },
          section:{type: GraphQLNonNull(GraphQLInt)},
          semester:{type: GraphQLNonNull(GraphQLInt)},
          
        },
        resolve: async (parent,args)=>{
          try{
            console.log("Add course mutation")
            //const coursesLength = await Course.find().exec();
            //const newId = coursesLength.length+1;
            const course={code: args.code, name:args.name, section: args.section, semester:args.semester}
            console.log("course",course)
            const newCourse = new Course(course);
            return  await newCourse.save();
    
        }
    
        catch (err){
           
            return err.message
        }
          
        }
      },

      updateCourse: {
        type: CourseType,
        description: 'Update Course',
        args: {
          _id: { type: GraphQLNonNull(GraphQLString) },
          code: { type: GraphQLNonNull(GraphQLString) },
          name: { type: GraphQLNonNull(GraphQLString) },
          section: { type: GraphQLNonNull(GraphQLInt) },
          semester: { type: GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (parent, args) => {
          try {
            const response = await Course.findByIdAndUpdate(args._id, { code: args.code, name: args.name, section: args.section, semester: args.semester }, { new: true });
            return response;
          } catch (err) {
            return err;
          }
        },
      },
      
      deleteCourse:{
        type:CourseType,
        description:'Delete Course',
        args:{
            //code: 1, name: "Emerging Technologies", section: 3, semester: 2 
          _id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve:async (parent,args)=>{
          try{
            
            const response = await Course.findOneAndDelete({ _id: args._id }); 
            return response;
    
        }
    
        catch (err){
           
            return err
        }
          
        }
      },
    })
  
  })

  /**deleteOne() */

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

//GraphQL
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(3001 , () => console.log('Server Running 3001'))


module.exports = app;
