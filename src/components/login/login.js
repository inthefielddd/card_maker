import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
    const history = useHistory();
    //goToMaker는 사용자를 /maker로 보낸다
    const goToMaker = (userId) => {
        //추가적인 정보를 보내고 싶을떄 {} 사용
        //userId는 onLogin에서 받아온 goToMaker(data.user.uid)
        history.push({
            pathname: "/maker", //url
            state: { id: userId }, //전달받은 userId를 state의 id에 넣어준다
        });
    };

    //로그인 할때
    //button에 클릭이벤트발생했을때
    //해당하는 button의 text를 가지고온다
    const onLogin = (event) => {
        authService //
            .login(event.currentTarget.textContent)
            .then((data) => goToMaker(data.user.uid));
    };

    //callback함수는 어떤 이벤트가 발생했을때
    //컴포넌트가 마운트가되거나 업데이트가 될때 활용
    //onAuthChange 사용자가 바꼈을때
    useEffect(() => {
        authService.onAuthChange((user) => {
            //사용자가 바뀌게 될떄 실행
            user && goToMaker(user.uid);
        });
    });

    return (
        <section className={styles.login}>
            <Header />
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Google
                        </button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Github
                        </button>
                    </li>
                </ul>
            </section>
            <Footer />
        </section>
    );
};

export default Login;
