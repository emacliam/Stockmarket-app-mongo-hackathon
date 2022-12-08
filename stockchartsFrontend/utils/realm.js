import * as Realm from "realm-web";
export const realmApp = new Realm.App({ id: 'stockmarket-yichz' });




export const realmLogin = async () => {
    const credentials = Realm.Credentials.anonymous();

    try {
      const user  = await realmApp.logIn(credentials);
  
      if (user.id !== realmApp?.currentUser?.id) {
        console.log('failed to login')
      }
  
      return user;
    } catch (err) {
      console.log('failed to login')
    }
  };

