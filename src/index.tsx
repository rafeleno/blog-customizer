import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { RadioGroup } from './ui/radio-group';
import { Select } from './ui/select';
import { Spacing } from './ui/spacing/Spacing';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontValue, setFontValue] = useState<OptionType>(fontFamilyOptions[0]);
	const [fontSizeValue, setFontSizeValue] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [fontColorValue, setFontColorValue] = useState<OptionType>(
		fontColors[0]
	);
	const [backgroundColorValue, setBackgroundColorValue] = useState<OptionType>(
		backgroundColors[0]
	);
	const [contentWidthValue, setContentWidthValue] = useState<OptionType>(
		contentWidthArr[0]
	);

	const resetStyles = () => {
		setFontValue(fontFamilyOptions[0]);
		setFontSizeValue(fontSizeOptions[0]);
		setFontColorValue(fontColors[0]);
		setBackgroundColorValue(backgroundColors[0]);
		setContentWidthValue(contentWidthArr[0]);

		setMainStyleValue(defaultStylesValue);
	};

	const defaultStylesValue = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const currentStyleValue = {
		'--font-family': fontValue.value,
		'--font-size': fontSizeValue.value,
		'--font-color': fontColorValue.value,
		'--container-width': contentWidthValue.value,
		'--bg-color': backgroundColorValue.value,
	};

	const [mainStyleValue, setMainStyleValue] =
		useState<Record<string, string>>(defaultStylesValue);

	return (
		<main className={clsx(styles.main)} style={mainStyleValue as CSSProperties}>
			<ArticleParamsForm
				setValue={setMainStyleValue}
				argsOfSetter={currentStyleValue}
				resetStyles={resetStyles}>
				<Spacing />
				<Select
					selected={fontValue}
					onChange={setFontValue}
					options={fontFamilyOptions}
					placeholder='Open Sans'
					title='шрифт'
				/>
				<Spacing />
				<RadioGroup
					name='radio'
					options={fontSizeOptions}
					selected={fontSizeValue}
					onChange={setFontSizeValue}
					title='размер текста'
				/>
				<Spacing />
				<Select
					selected={fontColorValue}
					onChange={setFontColorValue}
					options={fontColors}
					placeholder='Чёрный'
					title='Цвет шрифта'
				/>
				<Spacing />
				<Separator />
				<Spacing />
				<Select
					selected={backgroundColorValue}
					onChange={setBackgroundColorValue}
					options={backgroundColors}
					placeholder='Белый'
					title='Цвет фона'
				/>
				<Spacing />
				<Select
					selected={contentWidthValue}
					onChange={setContentWidthValue}
					options={contentWidthArr}
					placeholder='Широкий'
					title='Ширина контента'
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
