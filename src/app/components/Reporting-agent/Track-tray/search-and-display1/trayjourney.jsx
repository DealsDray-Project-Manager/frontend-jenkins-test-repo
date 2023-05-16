import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box } from '@mui/material';

const Trayjourney=() => {
  return (
    <div>
        <h3 style={{marginTop:"30px"}}>Tray Journey</h3>
        <Box  marginBottom="50px" boxShadow={1}  sx={{ border:"0.5px solid #78909c",borderRadius:"8px",background:"white"}}overflow="auto">
    <Timeline position='alternate'>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{color:'#4caf50'}} variant='outlined'/>
          <TimelineConnector />
        </TimelineSeparator >
        <TimelineContent>MIS users sends a request to warehouse user by assigning to bot 20/04/2023 at 8:30pm</TimelineContent>
      </TimelineItem>
      
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Warehouse user issues bot/mmt/pmt trays for bot agent 20/04/2023 at 8:30pm </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>BOT  process closed by bot agent on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>BOT recived back by warehouse user on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>MIS user assigned for sorting agent for bot to wht that request goes to warehouse on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>warehouse user issuse bot and wht trays for sorting agent for sorting porpose on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Sorting agent process the bot to wth on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
Sorting gent closes the sorting process on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>warehouse user closes the process and stock in on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>MIS user assigned the next process for charging agent that request goes to Warehouse on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>WareHouse user issuse the wht tray for charging agent on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>WareHouse user issuse the wht tray for charging agent on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Charging is done that by charging agent on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
        <TimelineConnector />
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Warehouse user closes the charging process and stock in on 22/04/2023 at 9:00 Am</TimelineContent>
      </TimelineItem>

    </Timeline>
    </Box>
    </div>
  );
}
export default Trayjourney;