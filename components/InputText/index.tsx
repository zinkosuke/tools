import styles from './index.module.scss';
import React from 'react';

type Props = JSX.IntrinsicElements['input'] & {
  handleChange?: (x: string) => void;
};

export const InputText = (props: Props): JSX.Element => {
  const { handleChange, ...inputProps } = props;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (handleChange) handleChange(event.target.value);
  };
  return <input className={styles.input} onChange={onChange} {...inputProps} />;
};
