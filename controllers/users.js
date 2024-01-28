
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = 'mongodb://localhost:27017'; // Your MongoDB connection URI
const client = new MongoClient(uri);

let usersCollection; // Collection reference

client.connect()
  .then(() => {
    const database = client.db('azhar'); // Change 'your-database-name' to your actual database name
    usersCollection = database.collection('users'); // Collection name for users
    console.log('Connected to MongoDB');

    // Insert initial user data
    insertInitialUserData();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

const insertInitialUserData = async () => {
  const initialUserData = [
    {
      "name": "typescript",
      "description": "TypeScript is a language for application scale JavaScript development",
      "repos": ""
    },
    {
      "name": "tslint",
      "description": "An extensible linter for the TypeScript language.",
      "repos": ""
    },
    {
      "name": "ts-node",
      "description": "TypeScript execution and REPL for node.js, with source map support",
      "repos": ""
    },
    {
      "name": "ts-loader",
      "description": "TypeScript loader for webpack",
      "repos": ""
    },
    {
      "name": "ts-jest",
      "description": "A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.",
      "repos": ""
    }
  ];

  try {
    // Insert documents into the collection
    await usersCollection.insertMany(initialUserData.map(user => ({ ...user, id: uuidv4() })));
    console.log('Initial user data inserted successfully.');
  } catch (error) {
    console.error('Error inserting initial user data:', error);
  } finally {
    // Close the connection after inserting initial data
    await client.close();
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  try {
    const newUser = { ...user, id: uuidv4() };
    await usersCollection.insertOne(newUser);
    res.send(`User with name: ${user.firstName} added to the database!`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Error getting users');
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await usersCollection.findOne({ id });
    res.send(foundUser);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send('Error getting user');
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    await usersCollection.deleteOne({ id });
    res.send(`User with the id ${id} deleted from the database.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  try {
    const query = { id };
    const update = { $set: { firstName, lastName, age } };
    await usersCollection.updateOne(query, update);
    res.send(`User with the id ${id} has been updated`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
};





/*
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = 'mongodb://localhost:27017'; // Your MongoDB connection URI
const client = new MongoClient(uri);

let usersCollection; // Collection reference

client.connect()
  .then(() => {
    const database = client.db('your-database-name'); // Change 'your-database-name' to your actual database name
    usersCollection = database.collection('users'); // Collection name for users
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

export const createUser = async (req, res) => {
  const user = req.body;

  try {
    const newUser = { ...user, id: uuidv4() };
    await usersCollection.insertOne(newUser);
    res.send(`User with name: ${user.firstName} added to the database!`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Error getting users');
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await usersCollection.findOne({ id });
    res.send(foundUser);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send('Error getting user');
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    await usersCollection.deleteOne({ id });
    res.send(`User with the id ${id} deleted from the database.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  try {
    const query = { id };
    const update = { $set: { firstName, lastName, age } };
    await usersCollection.updateOne(query, update);
    res.send(`User with the id ${id} has been updated`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
};



*/

/*

import { v4 as uuidv4 } from 'uuid';


let users=[];

export const createUser=(req,res)=>{

    const user=req.body;


    users.push({...user,id:uuidv4()});
       
    res.send(`User with name :${user.firstName} added to the database!`);
    

}

export const getUsers=(req,res)=>{

    console.log(users);

res.send(users);

}

export const getUser=(req,res)=>{

    const {id} =req.params;
    const foundUser=users.find((user)=>user.id=id);
  
  res.send(foundUser);
  
  }

  export const deleteUsers=(req,res)=>{

    const {id} =req.params;
   
  users=users.filter((user)=>user.id!=id);
  res.send(`User with the id ${id} deletedfrom the database.`);
  
  }

  export const updateUser=(req,res)=>{

    const {id} =req.params;

    const {firstName,lastName,age}=req.body;



    const user=users.find((user)=>user.id=id);


    if(firstName){

        user.firstName=firstName;
    }

    if(lastName){

        user.lastName=lastName;
    }

    if(age){

        user.age=age;
    }

  
  res.send(`User with the id ${id} has been updated`);
  
  }

  */