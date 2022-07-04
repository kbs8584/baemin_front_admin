import { FormControl, Select, MenuItem } from '@mui/material';

export default function SearchSelect({ searchMenuIndex, onChange, dataset }) {
  return (
    <FormControl fullWidth>
      <Select
        variant="outlined"
        value={searchMenuIndex}
        onChange={onChange}
        fullWidth
        sx={{
          bgcolor: 'grey.100',
          borderRadius: '30px',
          textAlign: 'center',

          '& .MuiSelect-outlined': {
            p: 1,
          },
        }}
      >
        {dataset.map((data, index) => (
          <MenuItem key={data} value={index}>
            {data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
