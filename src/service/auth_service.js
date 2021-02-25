import firebase from "firebase";
import firebaseApp from "./firebase";

class AuthService {
    //github로 들어올수도있고 구글로 들어올 수 있기때문에 이렇게 proviederName 설정해주기
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;
