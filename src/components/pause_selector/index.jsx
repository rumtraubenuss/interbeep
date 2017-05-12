import React from 'react';
import { number, func } from 'prop-types';

const selectItems = Array.from(Array(60), (_, i) => (
  <option key={i} value={i}>{i}</option>
));

const PauseSelector = ({ secsPause, handleChangeSecsPause }) => (
  <select value={secsPause} onChange={handleChangeSecsPause}>
    {selectItems}
  </select>
);

PauseSelector.propTypes = {
  secsPause: number.isRequired,
  handleChangeSecsPause: func.isRequired,
};

export default PauseSelector;
