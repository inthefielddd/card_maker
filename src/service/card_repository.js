import firebaseApp from './firebase';
class CardRepository {
    syncCards(userId, onUpdate) {
        const ref = firebaseApp.database().ref(`${userId}/cards`);
        ref.on('value', (snapshot) => {
            //변경될때마다 value
            const value = snapshot.val();
            //변경된 값이 있다면
            //onUpdate 콜백에 value 값을 넣어서 호출해줄 것이다.
            value && onUpdate(value);
        });
        return () => ref.off();
    }
    // return을 사용해서 변경사항이 없을때는 꺼두기
    saveCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
    }

    removeCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove(card);
    }
}

export default CardRepository;
