import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps } from '../utils/utils';
import CustomTabPanel from './UI/TabPanel';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Stack, Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { useState } from 'react';
const actions = ['Move X Steps', 'Turn X degree', 'Go To X and Y Direction'];
const controls = ['Repeat Animation'];
export default function CodeTab() {
  const [actionCurrentTab, setActionCurrentTab] = React.useState(0);
  const [actionCategoryTab, setActionCategoryTab] = React.useState(0);
  const handleActionTab = (_: React.SyntheticEvent, newValue: number) => {
    setActionCurrentTab(newValue);
  };
  const handleActionCategoryTab = (_: React.SyntheticEvent, newValue: number) => {
    setActionCategoryTab(newValue);
  };
  const [stepsCount, setStepsCount] = useState<number>(5);
  const [degreeValue, setDegreeValue] = useState<number>(45);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={actionCurrentTab} onChange={handleActionTab} aria-label='code section'>
          <Tab
            label={
              <Typography variant='subtitle2'>
                <CodeOutlinedIcon /> Code
              </Typography>
            }
            className='tw-mx-auto'
            {...a11yProps(0)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={actionCurrentTab} index={0}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: '12px' }}>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={actionCategoryTab}
            onChange={handleActionCategoryTab}
            aria-label='actionscategory'
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab
              label={
                <Typography variant='subtitle2'>
                  <Stack direction='column' justifyContent='center' alignContent='center'>
                    <div>
                      <Brightness1Icon color='primary' />
                    </div>
                    <span>Motion</span>
                  </Stack>
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant='subtitle2'>
                  <Stack direction='column' justifyContent='center' alignContent='center'>
                    <div>
                      <Brightness1Icon color='warning' />
                    </div>
                    <span>Controlls</span>
                  </Stack>
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={actionCategoryTab} index={0}>
            <Stack direction='column'>
              <Box>
                <Typography variant='subtitle2'>Motion</Typography>
                <Stack direction='column' marginY={2} gap={2}>
                  <Box
                    sx={{ backgroundColor: '#1976d2', p: 1, color: 'white', borderRadius: '9px' }}
                    key={`${actions[0]}`}
                  >
                    <Typography variant='body2'>Move {stepsCount} steps</Typography>
                    <Box>
                      <label htmlFor='stepscount'>X:</label>
                      <input
                        id='stepscount'
                        defaultValue={stepsCount}
                        value={stepsCount}
                        type='number'
                        onChange={(e) => setStepsCount(parseInt(e.target.value))}
                        className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{ backgroundColor: '#1976d2', p: 1, color: 'white', borderRadius: '9px' }}
                    key={`${actions[0]}`}
                  >
                    <Typography variant='body2'>Turn {degreeValue} degree</Typography>
                    <Box>
                      <label htmlFor='degreevalue'>X:</label>
                      <input
                        id='degreevalue'
                        defaultValue={degreeValue}
                        value={degreeValue}
                        type='number'
                        onChange={(e) => setDegreeValue(parseInt(e.target.value))}
                        className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={actionCategoryTab} index={1}>
            <Stack direction='column'>
              <Box>
                <Typography variant='subtitle2'>Controls</Typography>
                <Stack direction='column' marginY={2} gap={2}>
                  {controls.map((item, i) => (
                    <Box sx={{ backgroundColor: 'orange', p: 1, color: 'white' }} key={`${item}${i}`}>
                      <Typography variant='body2'>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </CustomTabPanel>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
