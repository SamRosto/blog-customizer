import styles from './App.module.scss'
import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm currAppState={articleState} setArticleState={setArticleState}/>
			<Article />
		</main>
	);
};