import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { EventLogs } from '../event-logs';
import { DataMetrics } from '../data-metrics';
import { OverviewCard } from '../overview-card';

// ----------------------------------------------------------------------

export function DashboardView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Splinter Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <OverviewCard
            title="Pipeline Status"
            text="Deployed"
            percent={2.6}
            color="success"
            total={714000}
            icon={<img alt="icon" src="/assets/icons/dashboard/ic-deploy.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <OverviewCard
            title="Source Connector"
            text="S3"
            percent={-0.1}
            total={1352831}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/dashboard/ic-source.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <OverviewCard
            title="Destination Connector"
            text="Pinecone"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/dashboard/ic-database.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <OverviewCard
            title="Embedding Provider"
            text="OpenAI"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/dashboard/ic-embedding.svg" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DataMetrics
            title="Data Ingestion"
            list={[
              { value: 'facebook', label: 'Total Documents', total: 268 },
              { value: 'google', label: 'Ingested Documents', total: 230 },
              { value: 'linkedin', label: 'Chunks Written', total: 3419 },
              { value: 'twitter', label: 'Vectors Written', total: 3012 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EventLogs title="Event Logs" list={_timeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
