import React, { useMemo, useState } from 'react';
import { TIngredient, TIngredientType } from '@utils/types.ts';
import { TabPanel } from './tab-panel/tab-panel';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientItem } from './burger-igredient-item/burger-ingredient-item';
import { InfoModal } from './info-modal/info-modal';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

type GroupedIngredients = {
	bun: TIngredient[];
	sauce: TIngredient[];
	main: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [activeType, setActiveType] = useState<TIngredientType>(
		TIngredientType.Bun
	);
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<TIngredient | null>(null);

	const handleClose = () => setModalOpen(false);
	const handleShow = (item: TIngredient) => {
		setSelectedItem(item);
		setModalOpen(true);
	};

	const groupedIngredients: GroupedIngredients = useMemo(() => {
		return ingredients.reduce<Record<TIngredientType, TIngredient[]>>(
			(acc, item) => {
				if (!acc[item.type]) {
					acc[item.type] = [];
				}
				acc[item.type].push(item);
				return acc;
			},
			{
				bun: [],
				sauce: [],
				main: [],
			}
		);
	}, [ingredients]);

	return (
		<>
			<div className={`${styles.wrapper} pb-10 pt-10`}>
				<TabPanel activeType={activeType} setActiveType={setActiveType} />
				<div className={styles.burgerIngredients}>
					<h3>Булки</h3>
					<article className={styles.ingredientsContainer}>
						{groupedIngredients.bun.map((item) => (
							<BurgerIngredientItem
								key={item._id}
								item={item}
								onDoubleClick={() => handleShow(item)}></BurgerIngredientItem>
						))}
					</article>

					<h3>Начинки</h3>
					<article className={styles.ingredientsContainer}>
						{groupedIngredients.main.map((item) => (
							<BurgerIngredientItem
								key={item._id}
								item={item}
								onDoubleClick={() => handleShow(item)}></BurgerIngredientItem>
						))}
					</article>

					<h3>Соусы</h3>
					<article className={styles.ingredientsContainer}>
						{groupedIngredients.sauce.map((item) => (
							<BurgerIngredientItem
								key={item._id}
								item={item}
								onDoubleClick={() => handleShow(item)}></BurgerIngredientItem>
						))}
					</article>
				</div>
			</div>
			{selectedItem && (
				<InfoModal
					item={selectedItem}
					isOpen={isModalOpen}
					onClose={handleClose}
				/>
			)}
		</>
	);
};
