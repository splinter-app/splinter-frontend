import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function LLMResponse({ title, subheader, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box display="grid" gap={2} sx={{ p: 3 }}>
        <TextField multiline rows={8} inputProps={{ readOnly: true }} />
      </Box>
    </Card>
  );
}
