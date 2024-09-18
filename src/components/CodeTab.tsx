import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps } from '../utils/utils';
import CustomTabPanel from './UI/TabPanel';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Stack, Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
export default function CodeTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='code section'>
          <Tab
            label={
              <Typography variant='subtitle2'>
                <CodeOutlinedIcon /> Code
              </Typography>
            }
            {...a11yProps(0)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: '12px' }}>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}
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
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Stack direction='column'>
              <Box>
                <Typography variant='subtitle2'>Motion</Typography>
              </Box>
            </Stack>
          </CustomTabPanel>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
