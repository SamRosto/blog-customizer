import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		// Останавливается эффект, если форма закрыта, чтобы не навешивать обработчик
		if (!isOpen) return

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
