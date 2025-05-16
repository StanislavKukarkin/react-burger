import { Modal } from '@/components/ui/modal/modal';
import React from 'react';
import styles from './info-modal.module.css';
import { TIngredient } from '@/utils/types';

type Props = {
	isOpen: boolean;
	item: TIngredient;
	onClose: () => void;
};

export const InfoModal = ({
	isOpen,
	item,
	onClose,
}: Props): React.JSX.Element => {
	return (
		<>
			<Modal
				header={<h3 className={styles.header}>Детали ингредиента</h3>}
				isOpen={isOpen}
				onClose={onClose}>
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
							<span className={`${styles.nutrition_value}`}>
								{item.calories}
							</span>
						</div>
						<div className={`${styles.nutrition} text text_type_main-default`}>
							<span className={`${styles.nutrition_title}`}>Белки, г</span>
							<span className={`${styles.nutrition_value}`}>
								{item.proteins}
							</span>
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
			</Modal>
		</>
	);
};
