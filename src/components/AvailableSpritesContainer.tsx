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
              <Card className='tw-p-2'>
                <CardMedia
                  image={s.image}
                  sx={{ maxHeight: '150px', maxWidth: '150px', width: '150px', height: '150px', objectFit: 'contain' }}
                  component='img'
                ></CardMedia>
                <CardHeader title={s.name} titleTypographyProps={{ textAlign: 'center' }}></CardHeader>
              </Card>
            );
          })}
      </Stack>
    </Container>
  );
}
