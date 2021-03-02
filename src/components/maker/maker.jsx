import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ FileInput, authService }) => {
    const [cards, setCards] = useState({
        //key=>'1': card값(value)
        //오브젝트형태로 card를 관리
        1:{
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
        2:{
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
        3: {
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
    });
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


    const createOrUpdateCard = (card) =>{
        setCards(cards=> {
            const updated = {...cards}; //기존의 cards를 복사
            updated[card.id] = card; //받아온 card에 key를 이용해 하나씩 지정
            return updated;
        })
    }


    const deleteCard = (card) =>{
        setCards(cards=> {
            const updated = {...cards}; 
            delete updated[card.id]; 
            return updated;
        })

        
    }
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor 
                FileInput={FileInput}
                cards={cards}
                addCard={createOrUpdateCard} 
                updateCard={createOrUpdateCard} 
                deleteCard={deleteCard}/>
                <Preview cards={cards} />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};
export default Maker;
