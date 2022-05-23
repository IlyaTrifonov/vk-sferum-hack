import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	Snackbar, Avatar
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import ListGames from "./panels/ListGames";
import Card from "./panels/Card";
import {Icon24Error} from "@vkontakte/icons";

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	LIST_GAMES: 'listGames'
}

const STORAGE_KEYS = {
	// STATUS: 'status',
	CARD_STATUS: 'cardStatus'
}



const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState(ROUTES.LIST_GAMES);
	// const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [snackbar, setSnackbar] = useState(null);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [fetchedState, setFetchedState] = useState(null);

	useEffect(() => {
/*
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
*/
		async function fetchData() {
			// const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEYS.CARD_STATUS]});
			console.log(storageData);
			if (Array.isArray(storageData.keys)) {
				console.log("Массив не пуст, данные есть");
				const data = {};
				storageData.keys.forEach(({ key, value }) => {
					console.log(key, value);
					try {
						data[key] = value ? JSON.parse(value) : {};
						switch (key) {
							case STORAGE_KEYS.CARD_STATUS:
								setFetchedState(data[STORAGE_KEYS.CARD_STATUS]);
								break;
/*
							case STORAGE_KEYS.STATUS:
								if (data[key] && data[key].hasSeenIntro) {
									setActivePanel(ROUTES.HOME);
									setUserHasSeenIntro(true);
								}
								break;
*/
							default:
								break;
						}
					} catch (error) {
						setSnackbar(<Snackbar
								layout='vertical'
								onClose={() => setSnackbar(null)}
								before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
								duration={900}
							>
								Проблема с получением данных из Storage
							</Snackbar>
						);
						setFetchedState({});
					}
				});

			} else {
				setFetchedState({});
			}
			// setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<ListGames id={ROUTES.LIST_GAMES} fetchedState={fetchedState} snackbarError={snackbar}/>
								{/*<Card id={'card'}/>*/}
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
