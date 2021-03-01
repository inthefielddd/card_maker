import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        //수동적 데이터 미리 만들어보기
        {
            id: "1",
            name: "hyeon1",
            company: "Ola",
            theme: "dark",
            title: "software Engineer",
            email: "inthefield1027@gmail.com",
            message: "go for it",
            fileName: "hj",
            fileURL: null,
        },
        {
            id: "2",
            name: "hyeon2",
            company: "Ola",
            theme: "colorful",
            title: "singer",
            email: "inthefield1027@gmail.com",
            message: "go for it",
            fileName: "hj",
            fileURL: "hj.png",
        },
        {
            id: "3",
            name: "hyeon3",
            company: "Ola",
            theme: "light",
            title: "writer",
            email: "inthefield1027@gmail.com",
            message: "go for it",
            fileName: "hj",
            fileURL: null,
        },
    ]);
    const history = useHistory();

    //logout 로직
    //Maker에서 suthService를통해서 로그아웃 시켜준다
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (!user) {
                //유저가 없다면 다시 홈화면 렌더
                history.push("/");
            }
        });
    });

    const addCard = (card) => {
        const updated = [...cards, card];
        setCards(updated);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard} />
                <Preview cards={cards} />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};
export default Maker;
