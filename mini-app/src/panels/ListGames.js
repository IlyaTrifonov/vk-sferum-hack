import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Div,
    Avatar,
    CardGrid,
    ContentCard,
    PanelHeaderBack, Text
} from '@vkontakte/vkui';

import card1 from '../img/card1.png';
import card2 from '../img/card2.png';
import card3 from '../img/card3.png';
import card4 from '../img/card4.png';
import card5 from '../img/card5.png';
import card6 from '../img/card6.png';

const DEFAULT_VALUE = false;

import Games from '../components/Games'

const ListGames = ({id, go, route, fetchedUser, fetchedState, snackbarError}) => {
    console.log(fetchedState);

    /*
    * Я не понял почему fetchedState на момент инициализации стейтов равен null, из-за этого hasOwnProperty
    * выдаёт ошибку и всё падает
    *
    * Скорее всего это из-за того, что useEffect ещё ниразу не вызван к моменту инициализации
    *
    * При этом, данные пользователя сохраняются в VK Bridge, но из-за ошибки не получилось их достать при следующем запуске
    * */
/*
    const [card1State, setCard1State] = useState(fetchedState.hasOwnProperty('card1State') ? fetchedState.card1State : DEFAULT_VALUE);
    const [card2State, setCard2State] = useState(fetchedState.hasOwnProperty('card2State') ? fetchedState.card2State : DEFAULT_VALUE);
    const [card3State, setCard3State] = useState(fetchedState.hasOwnProperty('card3State') ? fetchedState.card3State : DEFAULT_VALUE);
    const [card4State, setCard4State] = useState(fetchedState.hasOwnProperty('card4State') ? fetchedState.card4State : DEFAULT_VALUE);
    const [card5State, setCard5State] = useState(fetchedState.hasOwnProperty('card5State') ? fetchedState.card5State : DEFAULT_VALUE);
    const [card6State, setCard6State] = useState(fetchedState.hasOwnProperty('card6State') ? fetchedState.card6State : DEFAULT_VALUE);
*/

    const [card1State, setCard1State] = useState(false);
    const [card2State, setCard2State] = useState(false);
    const [card3State, setCard3State] = useState(false);
    const [card4State, setCard4State] = useState(false);
    const [card5State, setCard5State] = useState(false);
    const [card6State, setCard6State] = useState(false);

    const setStorage = async function(properties) {
        await bridge.send('VKWebAppStorageSet', {
            key: 'cardStatus',
            value: JSON.stringify({
                card1State,
                card2State,
                card3State,
                card4State,
                card5State,
                card6State,
                ...properties
            })
        });
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack/>}>
                Мои игры
            </PanelHeader>
            {/*{fetchedState && <Games fetchedState={fetchedState} snackbarError={snackbarError}/>}*/}
            <Group>
                <CardGrid size="s">
                    <ContentCard
                        onClick={() => {
                            setCard1State(!card1State)
                            setStorage({
                                card1State: card1State
                            })
                        }}
                        src={card1}
                        header="Многоклеточные"
                        text="Итоговый срез знаний по теме «Многоклеточные»"
                        caption="5 раундов"
                        maxHeight={123}
                    />
                    <ContentCard
                        onClick={() => {
                            setCard2State(!card2State)
                            setStorage({
                                card2State: card2State
                            })
                        }}
                        src={card2}
                        header="Кактусы"
                        text="Задание на тему «Эукариоты»"
                        caption="Игра начата"
                        maxHeight={123}
                    />
                    <ContentCard
                        onClick={() => {
                            setCard3State(!card3State)
                            setStorage({
                                card3State: card3State
                            })
                        }}
                        src={card3}
                        header="Насекомые"
                        text="Задание на тему «Эукариоты»"
                        caption="6 раундов"
                        maxHeight={123}
                    />
                    <ContentCard
                        onClick={() => {
                            setCard4State(!card4State)
                            setStorage({
                                card4State: card4State
                            })
                        }}
                        src={card4}
                        header="Бактерии"
                        text="Задание к уроку"
                        caption="3 раунда"
                        maxHeight={123}
                    />
                    <ContentCard
                        onClick={() => {
                            setCard5State(!card5State)
                            setStorage({
                                card5State: card5State
                            })
                        }}
                        src={card5}
                        header="Хищники"
                        text="Найди пару каждому хищнику"
                        caption="5 раундов"
                        maxHeight={123}
                    />
                    <ContentCard
                        onClick={() => {
                            setCard6State(!card6State)
                            setStorage({
                                card6State: card6State
                            })
                        }}
                        src={card6}
                        header="Млекопитающие"
                        text="Задание к уроку 5 классов"
                        caption="10 раундов"
                        maxHeight={123}
                    />
                </CardGrid>
            </Group>
            <Div>
                <h3>Нажатые карточки:</h3>
                <Text>Карточка 1: {card1State.toString()}</Text>
                <Text>Карточка 2: {card2State.toString()}</Text>
                <Text>Карточка 3: {card3State.toString()}</Text>
                <Text>Карточка 4: {card4State.toString()}</Text>
                <Text>Карточка 5: {card5State.toString()}</Text>
                <Text>Карточка 6: {card6State.toString()}</Text>
            </Div>
            <Div>
                <Button stretched size="l" onClick={() => {
                    setCard1State(false)
                    setCard2State(false)
                    setCard3State(false)
                    setCard4State(false)
                    setCard5State(false)
                    setCard6State(false)
                    setStorage({
                        card1State: card1State,
                        card2State: card2State,
                        card3State: card3State,
                        card4State: card4State,
                        card5State: card5State,
                        card6State: card6State
                    })
                    /*
                                    setUserHasSeenCard1(false);
                                    hasNoSeenCard1()
                    */
                }}>
                    Сбросить
                </Button>
            </Div>
        </Panel>
    );
}

export default ListGames;
