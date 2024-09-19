import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { useActionsContext } from '../context/ActionsWrapper';
import { activeAction } from '../utils/types';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
export default function Actions() {
  const { setActiveActions, activeActions } = useActionsContext();
  const [, drop] = useDrop(() => ({
    accept: 'action',
    drop: (item: activeAction) => setActiveActions((prev) => [...prev, item]),
  }));
  return (
    <Stack direction={'column'} sx={{ width: '100%', borderRight: '1px solid hsl(0deg 0% 0% / 15%)', height: '100%' }}>
      <Box sx={{ borderBottom: '1px solid hsl(0deg 0% 0% / 15%)', height: 'max-content', paddingBlock: '0.4rem' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle1'>Actions</Typography>
          <Button onClick={() => setActiveActions([])}>
            <RestartAltOutlinedIcon />
          </Button>
        </Stack>
      </Box>
      <Box flex={'0.8'} ref={drop}>
        <List>
          {activeActions.map((action, idx) => {
            let copiedactioncategory = action.category;
            let copiedactioninputs = action.inputs;
            if (copiedactioninputs.length > 1) {
              copiedactioncategory = copiedactioncategory.replace('X', String(copiedactioninputs[0]));
              copiedactioncategory = copiedactioncategory.replace('Y', String(copiedactioninputs[1]));
            } else {
              copiedactioncategory = copiedactioncategory.replace('X', String(copiedactioninputs[0]));
            }
            return (
              <ListItem
                className='tw-bg-blue-400 tw-text-white tw-my-1'
                key={`${Math.floor(Math.random() * 10)}${idx}}`}
              >
                <ListItemText>{copiedactioncategory}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Stack>
  );
}
