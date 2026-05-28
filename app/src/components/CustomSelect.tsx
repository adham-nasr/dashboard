import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { sender_depart_list } from "../constants/departs";
import './CustomSelect.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(sender, senderDepart, theme) {
  return {
    fontWeight:600,
    fontSize:16
  };
}

function CustomSelect({senderDepart,setSenderDepart}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSenderDepart(
      // On autofill we get a stringified value.
      value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 320}}>
        <InputLabel id="demo-multiple-name-label" sx={{fontSize:'18px',fontWeight:'600'}}>مرسل من</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={senderDepart}
          onChange={handleChange}
          input={<OutlinedInput style={{fontSize:16,fontWeight:600}} label="مرسل من" />}
          MenuProps={MenuProps}
          className='my_select'
        >
          {sender_depart_list.map((sender) => (
            <MenuItem
              key={sender}
              value={sender}
              style={getStyles(sender, senderDepart, theme)}
            >
              {sender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomSelect;