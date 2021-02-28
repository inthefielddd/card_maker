import firebase from "firebase";
import firebaseApp from "./firebase";

class AuthService {
    //login
    //github로 들어올수도있고 구글로 들어올 수 있기때문에 이렇게 proviederName 설정해주기
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }

    //logout
    logout() {
        firebase.auth().signOut();
    }

    //callback 함수를 가진다
    //사용자 변화가 감지 될때 발생하는 콜백함수
    onAuthChange(onUserChanged) {
        //사용자가 바뀔때마다
        //firebase auth 안에 있는 onAuthStateChanged
        firebase.auth().onAuthStateChanged((user) => {
            //사용자 정보를 전달해준다
            onUserChanged(user);
        });
    }
}

export default AuthService;
