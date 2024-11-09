import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';

// ----------------------------------------------------------------------

const PROMPT = `<documents> {context} </documents> 
The above documents are provided to assist you in answering the following question. Use only the provided documents to generate a response, if the documents do not provide sufficient information to answer the question respond saying there isn't enough information:

 <question> {question} </question>`;

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

export function QuestionForm({ title, subheader, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box display="grid" gap={2} sx={{ p: 3 }}>
        <FormControl>
          <Box display="grid" gap={2}>
            <FormLabel>Question</FormLabel>
            <TextField multiline rows={3} />
            <FormLabel>Prompt</FormLabel>
            <TextField multiline rows={7} defaultValue={PROMPT} />
            <Button
              size="large"
              type="submit"
              color="secondary"
              variant="outlined"
              // onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Card>
  );
}
