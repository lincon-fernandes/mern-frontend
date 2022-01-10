import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import './styles.css';

const CustonRadio = withStyles({
  root: {
    color: '#ffd3ca',
    '&$checked': {
      color: '#e88f7a',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioButton({ selectedValue, handleChange }) {
  return (
    <div className="radioOptions">
      <div>
        <CustonRadio
          checked={selectedValue === 'all'}
          onChange={(e) => handleChange(e.target)}
          value="all"
        />
        <span>Todos</span>
      </div>
      <div>
        <CustonRadio
          checked={selectedValue === 'true'}
          onChange={(e) => handleChange(e.target)}
          value="true"
        />
        <span>Prioriedade</span>
      </div>
      <div>
        <CustonRadio
          checked={selectedValue === 'false'}
          onChange={(e) => handleChange(e.target)}
          value="false"
        />
        <span>Normal</span>
      </div>
    </div>
  );
}
export default RadioButton;
