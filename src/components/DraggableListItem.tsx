import { ListItem, ListItemText } from '@mui/material';
import { activeAction } from '../utils/types';
import { useDrag } from 'react-dnd';

export default function DraggableListItem({
  id,
  copiedactioncategory,
  action,
}: {
  id: string;
  copiedactioncategory: string;
  action: activeAction;
}) {
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'activeaction',
      item: {
        id,
        action,
      },
      collect(monitor) {
        return {
          isDragging: Boolean(monitor.isDragging()),
        };
      },
    };
  });
  return (
    <ListItem
      ref={drag}
      className={`tw-bg-blue-400 tw-text-white tw-my-1 ${isDragging ? 'tw-border-black tw-border-2' : ''}`}
    >
      <ListItemText>{copiedactioncategory}</ListItemText>
    </ListItem>
  );
}
