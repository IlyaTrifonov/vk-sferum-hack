import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack, Text} from '@vkontakte/vkui';

const Card = ({ id }) => {
    const [isViewed, setIsViewed] = useState(false);

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack/>}
            >
                Карточка
            </PanelHeader>
            <Group header={<Header mode="secondary">Управление статусом</Header>}>
                <Div>
                    <Text>Статус просмотра: </Text>
                    <Button stretched size="l" mode="secondary">
                        Посмотрел
                    </Button>
                    <Button stretched size="l" mode="secondary">
                        Не смотрел
                    </Button>
                </Div>
            </Group>
        </Panel>
    );
}

export default Card;
