import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { TPageState } from 'src/index';

type TFormProps = {
	setPageState: React.Dispatch<React.SetStateAction<TPageState>>;
	pageState: TPageState;
};
export const ArticleParamsForm = (props: TFormProps) => {
	const rootRef = useRef(null);
	const [isFormOpen, setFormOpen] = useState(false);
	const [formState, setFormState] = useState({
		fontSelected: defaultArticleState.fontFamilyOption,
		fontSizeSelected: defaultArticleState.fontSizeOption,
		fontColorSelected: defaultArticleState.fontColor,
		bgColorSelected: defaultArticleState.backgroundColor,
		selectedContentWidth: defaultArticleState.contentWidth,
	});
	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: rootRef,
		onChange: () => setFormOpen(false),
	});

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormOpen((prevValue) => !prevValue);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(
					styles.container,
					isFormOpen ? styles.container_open : ''
				)}>
				<form className={styles.form}>
					<div className={styles.title}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
					</div>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontSelected}
						title='Шрифт'
						onChange={(option) => {
							setFormState({ ...formState, fontSelected: option });
						}}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeSelected}
						title='размер шрифта'
						onChange={(option) => {
							setFormState({ ...formState, fontSizeSelected: option });
						}}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColorSelected}
						title='цвет шрифта'
						onChange={(option) => {
							setFormState({ ...formState, fontColorSelected: option });
						}}
					/>
					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.bgColorSelected}
						title='цвет фона'
						onChange={(option) =>
							setFormState({ ...formState, bgColorSelected: option })
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.selectedContentWidth}
						title='Ширина контента'
						onChange={(option) => {
							setFormState({ ...formState, selectedContentWidth: option });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								props.setPageState({
									fontFamily: defaultArticleState.fontFamilyOption.value,
									fontSize: defaultArticleState.fontSizeOption.value,
									fontColor: defaultArticleState.fontColor.value,
									containerWidth: defaultArticleState.contentWidth.value,
									bgColor: defaultArticleState.backgroundColor.value,
								});
								setFormState({
									fontSelected: defaultArticleState.fontFamilyOption,
									fontSizeSelected: defaultArticleState.fontSizeOption,
									fontColorSelected: defaultArticleState.fontColor,
									selectedContentWidth: defaultArticleState.contentWidth,
									bgColorSelected: defaultArticleState.backgroundColor,
								});
								console.log(props.pageState);
							}}
						/>

						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={(e) => {
								e.preventDefault();

								props.setPageState({
									fontFamily: formState.fontSelected.value,
									fontSize: formState.fontSizeSelected.value,
									fontColor: formState.fontColorSelected.value,
									containerWidth: formState.selectedContentWidth.value,
									bgColor: formState.bgColorSelected.value,
								});
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
