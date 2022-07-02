import { Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

// toggle show equasions / just the calulated totals
const GridBox = ({
  label, subLabel, value
}) => (
  <Grid container item direction='column' alignItems='center' justifyContent='center' xs={2.4} sx={{ border: '1px solid '}}>
    <Grid item>
      <Typography>{label}</Typography>
    </Grid>
    <Grid item>
      <Typography variant="p" sx={{ width: '100%', fontWeight: '500' }}>{subLabel}</Typography>
    </Grid>
    <Grid item>
      <Typography sx={{ width: '100%', fontSize: '20px' }}>{value}</Typography>
    </Grid>
  </Grid>
)

const Calculator531 = () => {
  const [oneRepMax, setOneRepMax] = useState(0);

  const adjustedMax = (.9 * oneRepMax);

  const roundToNearest5 = (x) => {
    return (Math.round(x/5) * 5);
  };

  const handleChangeadjustedMax = (e) => {
    setOneRepMax(e.target.value);
  };

  const boxLabels = [
    {
      id: 0,
      label: '',
      subLabel: '',
      value: null
    },
    {
      id: 1,
      label: 'Week 1',
      subLabel: '',
      value: null
    },
    {
      id: 2,
      label: 'Week 2',
      subLabel: '',
      value: null
    },
    {
      id: 3,
      label: 'Week 3',
      subLabel: '',
      value: null
    },
    {
      id: 4,
      label: 'Week 4',
      subLabel: '',
      value: null
    },
    {
      id: 5,
      label: 'Set 1',
      subLabel: '',
      value: null
    },
    {
      id: 6,
      label: '65%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .65)
    },
    {
      id: 7,
      label: '70%',
      subLabel: '3 reps',
      value: roundToNearest5(adjustedMax * .70)
    },
    {
      id: 8,
      label: '75%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .75)
    },
    {
      id: 9,
      label: '40%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .40)
    },
    {
      id: 10,
      label: 'Set 2',
      subLabel: '',
      value: null
    },
    {
      id: 11,
      label: '75%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .75)
    },
    {
      id: 12,
      label: '80%',
      subLabel: '3 reps',
      value: roundToNearest5(adjustedMax * .80)
    },
    {
      id: 13,
      label: '85%',
      subLabel: '3 reps',
      value: roundToNearest5(adjustedMax * .85)
    },
    {
      id: 14,
      label: '50%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .50)
    },
    {
      id: 15,
      label: 'Set 3',
      subLabel: '',
      value: null
    },
    {
      id: 16,
      label: '85%',
      subLabel: '5+ reps',
      value: roundToNearest5(adjustedMax * .85)
    },
    {
      id: 17,
      label: '90%',
      subLabel: '3+ reps',
      value: roundToNearest5(adjustedMax * .90)
    },
    {
      id: 18,
      label: '95%',
      subLabel: '1+ reps',
      value: roundToNearest5(adjustedMax * .95)
    },
    {
      id: 19,
      label: '60%',
      subLabel: '5 reps',
      value: roundToNearest5(adjustedMax * .60)
    },
];

  const renderGridBoxes = boxLabels.map((bl) => {
    return (
      <GridBox
        label={bl.label}
        subLabel={bl.subLabel}
        value={bl.value}
        />
    )})

  return (
    <Box id='calculator-531-root' sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h1" sx={{pt: '3rem', fontWeight: '700', fontSize: '24px' }}>5/3/1 Calculator</Typography>
      <Box id='gallery-item-container' sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container sx={{ my: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography>Enter 1 Rep Max</Typography>
          <Box sx={{ background: '#FFFDFA', borderRadius: '4px' }}>
            <TextField
              value={oneRepMax}
              onChange={handleChangeadjustedMax}
              sx={{ width: '60px'}}
            />
          </Box>
        </Grid>
        <Grid container xs={12} spacing={0} sx={{ my: '1em', width: '375px', height: '345px' }}>
          {renderGridBoxes}
        </Grid>
      </Box>
    </Box>
  )
}

export default Calculator531;