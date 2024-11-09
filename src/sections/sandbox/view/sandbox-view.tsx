import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { QuestionForm } from '../question-form';
import { RetrievedContext } from '../retrieved-context';
import { LLMResponse } from '../llm-response';

// ----------------------------------------------------------------------

export function SandboxView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        RAG Sandbox
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={6}>
          <QuestionForm />
        </Grid>
        <Grid xs={12} md={6} lg={5}>
          <RetrievedContext title="Retrieved Context" />
        </Grid>

        <Grid xs={12} md={6} lg={11}>
          <LLMResponse title="LLM Response" />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
