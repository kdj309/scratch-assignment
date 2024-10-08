import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps } from '../utils/utils';
import CustomTabPanel from './UI/TabPanel';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Stack, Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import MoveInput from './MoveInput';
import RotateInput from './RotateInput';
import MoveToXandY from './MoveToXandY';
import RepeatAnimation from './RepeatAnimation';
import { useDrop } from 'react-dnd';
import { useActionsContext } from '../context/ActionsWrapper';
import { activeAction } from '../utils/types';
import { useCallback } from 'react';

export default function CodeTab() {
  const [actionCurrentTab, setActionCurrentTab] = React.useState(0);
  const [actionCategoryTab, setActionCategoryTab] = React.useState(0);
  const { setSprites } = useActionsContext();
  const handleActionTab = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setActionCurrentTab(newValue);
  }, []);
  const handleActionCategoryTab = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setActionCategoryTab(newValue);
  }, []);
  const [_, drop] = useDrop(() => {
    return {
      accept: 'activeaction',
      drop(item: { id: string; action: activeAction }) {
        setSprites((s) =>
          s.map((spriteitem) => {
            if (spriteitem.id === item.id) {
              const filteredactions = [...spriteitem.activeActions].filter((a) => a.category != item.action.category);
              return {
                ...spriteitem,
                activeActions: filteredactions,
              };
            }
            return spriteitem;
          })
        );
      },
    };
  });

  return (
    <Box sx={{ width: '100%', borderRight: '1px solid hsl(0deg 0% 0% / 15%)' }}>
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
        <Box sx={{ flexGrow: 1, display: 'flex', padding: '12px' }} ref={drop}>
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
                      <Brightness1Icon color='primary' fontSize='small' />
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
                      <Brightness1Icon color='warning' fontSize='small' />
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
                  <MoveInput />
                  <RotateInput />
                  <MoveToXandY />
                </Stack>
              </Box>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={actionCategoryTab} index={1}>
            <Stack direction='column'>
              <RepeatAnimation />
            </Stack>
          </CustomTabPanel>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
