import { Card, CardHeader, CardMedia, Container, Stack } from '@mui/material';
import { useActionsContext } from '../context/ActionsWrapper';

export default function AvailableSpritesContainer() {
  const { availableSprites } = useActionsContext();
  return (
    <Container maxWidth='xl' sx={{ backgroundColor: 'hsl(216deg 100% 95.1%)' }}>
      <Stack direction='row' gap={2} flexWrap='wrap'>
        {availableSprites
          .filter((s) => !s.isStaged)
          .map((s) => {
            return (
              <Card>
                <CardMedia
                  image={s.image}
                  sx={{ maxHeight: '160px', maxWidth: '160px', width: '160px', height: '160px', objectFit: 'contain' }}
                  component='img'
                ></CardMedia>
                <CardHeader title={s.name}></CardHeader>
              </Card>
            );
          })}
      </Stack>
    </Container>
  );
}
