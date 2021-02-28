import React, { useEffect } from "react";
import styles from "./maker.module.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

//Maker에서 suthService를통해서 로그아웃 시켜준다
const Maker = ({ authService }) => {
    const history = useHistory();
    //logout 로직
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (!user) {
                history.push("/");
            }
        });
    });
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor />
                <Preview />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};
export default Maker;
