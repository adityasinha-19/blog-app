import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // login method call
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error :: AppwriteService :: createAccount", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error :: AppwriteService :: login", error);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      if (currentUser) return currentUser;
      else return null;
    } catch (error) {
      console.log("Error :: AppwriteService :: getCurrentUser", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error :: AppwriteService :: logout", error);
    }
  }
}

const authService = new AuthService();

export default authService;

/*
Built an appwrite service for authentication using "Class" --> "AuthService".

Now we made an  object "authService" initalized we that Class "AuthService", so that whenever we need to access the methods, we can directly call the object only.And we exported that object with default.

Then we initialized a "Client" and a "account".

Now under constructor we would properly call both "Client" and "account" providing the necessary parameters.So, whenever the object is being called then only "Client" and "Account" is initialized.

These are 4 methods in the class --> createAccount, login, getCurrentUser, logout. We can directly access it using the object "authService".
Eg: authService.createAccount() 

All methods may or may not return a value.

*/
