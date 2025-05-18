import style from './burger-constructor-footer.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { OrderModal } from '../order-modal/order-modal';

type BurgerConstructorItemProps = {
	finalPrice: number;
};

export const BurgerConstructorFooter = ({
	finalPrice,
}: BurgerConstructorItemProps): React.JSX.Element => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleClose = () => setModalOpen(false);

	const handleShow = useCallback(() => {
		setModalOpen(true);
	}, []);

	return (
		<>
			<div className={`${style.container}`}>
				<div className={style.priceContainer}>
					<span className='text text_type_digits-medium'>{finalPrice}</span>
					<CurrencyIcon type='primary' className={style.icon} />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleShow}>
					Оформить заказ
				</Button>
			</div>
			<OrderModal isOpen={isModalOpen} onClose={handleClose} />
		</>
	);
};
