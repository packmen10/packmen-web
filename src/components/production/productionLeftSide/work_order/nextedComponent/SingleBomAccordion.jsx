import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Meterial_specification } from './Meterial_specification';
import { MirDetailes } from './MirDetailes';
import { Production } from './Production';
import { QcOnBom } from './QcOnBom';
import ProgressSteps from '../../../../othreComponents/ProgressSteps ';
import { BomEditSection } from './BomEditSection';
import { useGetBomByIdQuery } from '../../../../../store/apiSlice';
import { Po } from './Po';
import { InvoiceComponets } from './InvoiceComponets';
import { IssueNote } from './IssueNote';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode==='dark'?'rgba(255, 255, 255, .05)':'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded':{
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content':{
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SingleBomAccordion({id}){
  const[statusOfProgress,setProgress]=React.useState([false,false,false,false,false,false])
  
  const{data:bomData}=useGetBomByIdQuery(id)
  const [expanded, setExpanded]=React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{marginBottom:'30px'}}>
      <ProgressSteps status={statusOfProgress}/>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>MIR</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MirDetailes {...{setProgress,id,index:0}}/>
            </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>

             <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
               <Typography>PO</Typography>
             </AccordionSummary>
             <AccordionDetails>
                 <Po {...{setProgress,id,index:1}} />
             </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
             <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
              <Typography>Invoice</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <InvoiceComponets {...{setProgress,id,index:2}} />
            </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>

            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
              <Typography>Issue note</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <IssueNote {...{setProgress,id,index:3}} />
            </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>

            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Production</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Production {...{setProgress,id,index:4}} />
            </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>

            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>QC</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <QcOnBom {...{setProgress,id,index:5}} />
            </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>

           <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
             <Typography>Material specification</Typography>
           </AccordionSummary>
           <AccordionDetails>
               <Meterial_specification id={id}/>
           </AccordionDetails>

      </Accordion>

      <BomEditSection bomData={bomData?.data}/>
    </div>
  );
}
