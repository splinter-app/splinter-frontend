import type { CardProps } from '@mui/material/Card';
import type { ContextType } from 'src/types/types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  context: ContextType[] | undefined;
};

export function RetrievedContext({ title, subheader, context, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={2} sx={{ p: 3 }}>
        <TextField
          multiline
          rows={16}
          inputProps={{ readOnly: true }}
          value={
            context
              ? (context as ContextType[])
                  .reduce(
                    (acc, item) => `${acc} Relevancy Score (${item.score}): ${item.text} \n\n`,
                    ''
                  )
                  .trim()
              : ''
          }
        />
      </Box>
    </Card>
  );
}
