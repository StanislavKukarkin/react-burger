import React, { useMemo, useState } from 'react';
import { TIngredient, TIngredientType } from '@utils/types.ts';
import { TabPanel } from './tab-panel/tab-panel';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsSegment } from './burger-ingridients-segment/burger-ingredients-segment';
import { GroupedIngredients } from '@/interfaces/ingrediensts';
import { Modal } from '../ui/modal/modal';
import { IngredientInfo } from './ingredient-info/ingredient-info';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
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
				<div className={styles.burger_ingredients}>
					<BurgerIngredientsSegment
						ingredients={groupedIngredients.bun}
						title='Булки'
						onItemClick={handleShow}
					/>
					<BurgerIngredientsSegment
						ingredients={groupedIngredients.main}
						title='Начинки'
						onItemClick={handleShow}
					/>
					<BurgerIngredientsSegment
						ingredients={groupedIngredients.sauce}
						title='Соусы'
						onItemClick={handleShow}
					/>
				</div>
			</div>
			{selectedItem && (
				<Modal
					header={<h3 className={styles.modal_header}>Детали ингредиента</h3>}
					isOpen={isModalOpen}
					onClose={handleClose}>
					<IngredientInfo item={selectedItem} />
				</Modal>
			)}
		</>
	);
};
