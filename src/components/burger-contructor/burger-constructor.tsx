import { TIngredient } from '@utils/types.ts';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { BurgerConstructorFooter } from './burger-constructor-footer/burger-constructor-footer';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>(
		[]
	);

	const refreshIngredientsFromStorage = useCallback(() => {
		const data = localStorage.getItem('selectedIngredientIds');
		if (data) {
			const getIngredientsById = (id: string) => {
				return ingredients.find((item) => item._id === id);
			};
			setSelectedIngredients(JSON.parse(data).map(getIngredientsById) || []);
		}
	}, [ingredients]);

	useEffect(() => {
		refreshIngredientsFromStorage();

		const listener = () => refreshIngredientsFromStorage();

		window.addEventListener('ingredientListUpdated', listener);

		return () => {
			window.removeEventListener('ingredientListUpdated', listener);
		};
	}, [refreshIngredientsFromStorage]);

	return (
		<section className={`${styles.burger_constructor} mt-25`}>
			<ul className={`${styles.burger_constructor_list} pl-4 pr-4`}>
				{selectedIngredients.map((item, index) => {
					const isFirst = index === 0;
					const isLast = index === selectedIngredients.length - 1;

					return (
						<li key={item._id} className={styles.burger_constructor_item}>
							{isFirst || isLast ? <div /> : <DragIcon type='primary' />}
							<BurgerConstructorItem
								item={item}
								type={isFirst ? 'top' : isLast ? 'bottom' : undefined}
								onDelete={refreshIngredientsFromStorage}
							/>
						</li>
					);
				})}
			</ul>

			<BurgerConstructorFooter
				finalPrice={selectedIngredients.reduce(
					(sum, item) => sum + item.price,
					0
				)}
			/>
		</section>
	);
};
