import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type TPageState = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	bgColor: string;
};

const App = () => {
	const [pageState, setPageState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	});
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamily,
					'--font-size': pageState.fontSize,
					'--font-color': pageState.fontColor,
					'--container-width': pageState.containerWidth,
					'--bg-color': pageState.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageState={setPageState} pageState={pageState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
