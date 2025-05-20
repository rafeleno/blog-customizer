import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState, PropsWithChildren } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = PropsWithChildren<{
	setValue: (args: Record<string, string>) => void;
	argsOfSetter: Record<string, string>;
	resetStyles: () => void;
}>;

export const ArticleParamsForm = ({
	children,
	setValue,
	argsOfSetter,
	resetStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text as='h3' size={31} weight={800}>
						Задайте параметры
					</Text>
					{children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => resetStyles()}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => setValue(argsOfSetter)}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
