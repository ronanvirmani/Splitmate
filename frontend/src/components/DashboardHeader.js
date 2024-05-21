import React from 'react'
import { Paper, Typography } from '@mui/material'

function DashboardHeader({ group }) {
  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {group.name}
      </Typography>
      <Typography variant="subtitle1" component="div">
        Amount you owe: $XX.XX
      </Typography>
    </Paper>
  )
}

export default DashboardHeader
