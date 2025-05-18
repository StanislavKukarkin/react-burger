import { TIngredient } from '@/utils/types';
import styles from './burger-ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';

type BurgerIngredientItemProps = {
	item: TIngredient;
	onItemClick: (item: TIngredient) => void;
};

export const BurgerIngredientItem = ({
	item,
	onItemClick,
}: BurgerIngredientItemProps): React.JSX.Element => {
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem('selectedIngredientIds');
		const currentIds = stored ? JSON.parse(stored) : [];
		setIsSelected(currentIds.includes(item._id));
	}, [item._id]);

	const handleClick = useCallback(() => {
		const stored = localStorage.getItem('selectedIngredientIds');
		const currentIds = stored ? JSON.parse(stored) : [];

		const setId = () => {
			const currentIds = getCurrentIds();
			currentIds.push(item._id);
			localStorage.setItem('selectedIngredientIds', JSON.stringify(currentIds));
			setIsSelected(true);
		};

		const removeId = () => {
			const currentIds = getCurrentIds();
			currentIds.splice(currentIds.indexOf(item._id), 1);
			localStorage.setItem('selectedIngredientIds', JSON.stringify(currentIds));
			setIsSelected(false);
		};

		currentIds.includes(item._id) ? removeId() : setId();
		window.dispatchEvent(new Event('ingredientListUpdated'));

		onItemClick(item);
	}, [item._id, onItemClick]);

	const getCurrentIds = () => {
		const stored = localStorage.getItem('selectedIngredientIds');
		return stored ? JSON.parse(stored) : [];
	};

	return (
		<div
			role='button'
			tabIndex={0}
			className={`${styles.ingredientItem} `}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}>
			<Counter
				count={1}
				size='default'
				extraClass={`m-1 ${styles.badge} ${isSelected ? styles.visible : styles.hidden}`}
			/>

			<div className='pl-4 pr-4'>
				<img src={item.image} alt={item.name || 'ingredient image'} />
			</div>

			<div className={styles.priceContainer}>
				<span className={styles.price}>{item.price}</span>
				<CurrencyIcon type='primary' />
			</div>

			<span className={`${styles.name} pb-6`}>{item.name}</span>
		</div>
	);
};
