import React, { useCallback, useEffect, useState } from "react";
import styles from "./maker.module.css";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({ FileInput, authService, cardRepository }) => {
    const history = useHistory();
    const historyState = history?.location.state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id );

    //logout 로직
    //Maker에서 suthService를통해서 로그아웃 시켜준다
    const onLogout = useCallback(() => {
        authService.logout();
    },[authService]);

    //사용자의 id가 변경될때마다
    useEffect(()=>{
        if(!userId){
            return; //유저없을떄
        }
        //유저가 있을때
        const stopSync= cardRepository.syncCards(userId, cards => {
            setCards(cards);
        })
        //컴포넌트가 unMount 되었을때
        //불필요한 네트워크 사용을 최소화 해준다.
        return ()=> stopSync();
    },[userId, cardRepository])

    //로그인과 관련된 useEffect
    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                //유저가 있다면
                setUserId(user.uid);
            }else{
                //유저가 없다면 다시 홈화면 렌더
                history.push("/");
            }
        });
    },[authService, userId, history]);

    const createOrUpdateCard = (card) =>{
        setCards(cards=> {
            const updated = {...cards}; //기존의 cards를 복사
            updated[card.id] = card; //받아온 card에 key를 이용해 하나씩 지정
            return updated;
        })
        cardRepository.saveCard(userId, card);
    }

    const deleteCard = (card) =>{
        setCards(cards=> {
            const updated = {...cards}; 
            delete updated[card.id]; 
            return updated;
        })
        cardRepository.removeCard(userId, card);
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
