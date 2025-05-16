import { TIngredient } from '@/utils/types';
import style from './burger-constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useMemo } from 'react';

type BurgerConstructorItemProps = {
	item: TIngredient;
	type?: 'top' | 'bottom';
	onDelete: () => void;
};

export const BurgerConstructorItem = ({
	item,
	type,
	onDelete,
}: BurgerConstructorItemProps): React.JSX.Element => {
	const handleClose = useCallback(() => {
		const stored = localStorage.getItem('selectedIngredientIds');
		const currentIds = stored ? JSON.parse(stored) : [];

		currentIds.splice(currentIds.indexOf(item._id), 1);
		localStorage.setItem('selectedIngredientIds', JSON.stringify(currentIds));
		onDelete();
	}, [item._id, onDelete]);

	const randomBool = useMemo(() => {
		return Math.random() < 0.5;
	}, []);

	return (
		<ConstructorElement
			type={type}
			text={item.name}
			price={item.price}
			isLocked={randomBool}
			thumbnail={item.image}
			handleClose={handleClose}
			extraClass={style.ingredientItem}
		/>
	);
};
