import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";

 
var firebaseConfig = {
    databaseURL: "https://test-66ad6-default-rtdb.firebaseio.com" 
  };
   
// Initialize Firebase
initializeApp(firebaseConfig);
var db = getDatabase();
 
export default db;