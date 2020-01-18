import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  // I have named the callback 'callbackFromBookComments' for ease of understanding. Teacher called it onSnapshot to use Firebase naming conventions.
  subscribeToBookComments({ bookId, callbackFromBookComments }) {
    const bookRef = this.db.collection('books').doc(bookId);
    return this.db.collection('comments').where('book', '==', bookRef)
    .orderBy('dateCreated', 'desc')
    .onSnapshot(callbackFromBookComments);
  }

  async register(email, password, username) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('user_profiles').doc(username).set({
      user_id: newUser.user.uid
    })
  }

  async getUserProfile({userId}) {
    return this.db.collection('user_profiles').where('user_id', '==', userId).get();
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async postComment({text, bookId}){
    const postCommentCallable = this.functions.httpsCallable('postComment');
    console.log({text, bookId});
    return postCommentCallable({text, bookId})
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
