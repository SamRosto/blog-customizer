import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useEnterSubmit } from 'src/ui/select/hooks/useEnterSubmit';

import { ArticleStateType, defaultArticleState, fontFamilyOptions, fontSizeOptions, OptionType, 
	fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	currAppState: ArticleStateType
	setArticleState: (v: ArticleStateType) => void;
};

export const ArticleParamsForm = ({setArticleState}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState)

	const asideRef = useRef<HTMLDivElement>(null)

	useOutsideClickClose({
		isOpen: isMenuOpen, 
		rootRef: asideRef, 
		onChange: ()=>  setIsMenuOpen,
		onClose: ()=> setIsMenuOpen(prevState => !prevState),
	})

	const handleOptionChange = (field: string) => {
		return (val: OptionType) => {
			setFormState((state) => ({
				...state,
				[field]: val
			}))
		}
	}

	const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setArticleState(formState)
	}

	const handleReset = (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault
		setFormState(defaultArticleState)
		setArticleState(defaultArticleState)
	}

	return (
		<>
			<ArrowButton 
				isOpen={isMenuOpen} 
				onClick={() => {
					setIsMenuOpen(prevState => !prevState)
			}} />

			 <aside 
				ref={asideRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>

				<form 
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}
					>
					<Text uppercase={true} weight={800} size={31}>задайте параметры</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='name'
						onChange={handleOptionChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOptionChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
