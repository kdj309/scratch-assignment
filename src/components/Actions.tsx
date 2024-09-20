import { Box, Button, List, Stack, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { useActionsContext } from '../context/ActionsWrapper';
import { activeAction } from '../utils/types';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import DraggableListItem from './DraggableListItem';
export default function Actions() {
  const { setSprites, sprites } = useActionsContext();
  const [, drop] = useDrop(() => ({
    accept: 'action',
    drop(item: activeAction) {
      setSprites((prev) => {
        return prev.map((s) => (s.isActive ? { ...s, activeActions: [...s.activeActions, item] } : s));
      });
    },
  }));
  const activeSprite = sprites.find((s) => s.isActive);

  return (
    <Stack direction={'column'} sx={{ width: '100%', borderRight: '1px solid hsl(0deg 0% 0% / 15%)', height: '100%' }}>
      <Box
        sx={{
          borderBottom: '1px solid hsl(0deg 0% 0% / 15%)',
          height: 'max-content',
          paddingBlock: '0.4rem',
          paddingInline: '0.3rem',
        }}
      >
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle1'>Actions</Typography>
          <Button
            onClick={() =>
              setSprites((prev) => {
                return prev.map((s) => (s.isActive ? { ...s, activeActions: [] } : s));
              })
            }
          >
            <RestartAltOutlinedIcon />
          </Button>
        </Stack>
      </Box>
      <Box flex={'0.8'} ref={drop}>
        <List>
          {activeSprite?.activeActions.map((action, idx) => {
            let copiedactioncategory = action.category;
            let copiedactioninputs = action.inputs;
            if (copiedactioninputs.length > 1) {
              copiedactioncategory = copiedactioncategory.replace('X', String(copiedactioninputs[0]));
              copiedactioncategory = copiedactioncategory.replace('Y', String(copiedactioninputs[1]));
            } else {
              copiedactioncategory = copiedactioncategory.replace('X', String(copiedactioninputs[0]));
            }
            return (
              <DraggableListItem
                key={`${Math.floor(Math.random() * 10)}${idx}}`}
                copiedactioncategory={copiedactioncategory}
                id={activeSprite?.id}
                action={action}
              />
            );
          })}
        </List>
      </Box>
    </Stack>
  );
}
