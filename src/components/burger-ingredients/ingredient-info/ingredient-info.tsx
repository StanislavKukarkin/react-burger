import React from 'react';
import styles from './ingredient-info.module.css';
import { TIngredient } from '@/utils/types';

type Props = {
	item: TIngredient;
};

export const IngredientInfo = ({ item }: Props): React.JSX.Element => {
	return (
		<>
			<div className={styles.content}>
				<img
					src={item.image}
					alt={item.name || 'ingredient image'}
					width='480'
				/>
				<p className={`mt-4 mb-8 ${styles.name}`}>{item.name}</p>
				<div className={`${styles.nutritions}`}>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Калории,ккал</span>
						<span className={`${styles.nutrition_value}`}>{item.calories}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Белки, г</span>
						<span className={`${styles.nutrition_value}`}>{item.proteins}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Жиры, г</span>
						<span className={`${styles.nutrition_value}`}>{item.fat}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Углеводы, г</span>
						<span className={`${styles.nutrition_value}`}>
							{item.carbohydrates}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
