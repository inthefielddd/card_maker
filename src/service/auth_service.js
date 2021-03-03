import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {
    //login
    //github로 들어올수도있고 구글로 들어올 수 있기때문에 이렇게 proviederName 설정해주기
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }

    //logout
    logout() {
        firebaseAuth.signOut();
    }

    //callback 함수를 가진다
    //사용자 변화가 감지 될때 발생하는 콜백함수
    onAuthChange(onUserChanged) {
        //사용자가 바뀔때마다
        //firebase auth 안에 있는 onAuthStateChanged
        firebaseAuth.onAuthStateChanged((user) => {
            //사용자 정보를 전달해준다
            onUserChanged(user);
        });
    }

    getProvider(providerName) {
        switch (providerName) {
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`);
        }
    }
}

export default AuthService;
