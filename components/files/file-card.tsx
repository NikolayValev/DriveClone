import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FolderIcon from '@mui/icons-material/Folder';
import { FileIcon, defaultStyles } from 'react-file-icon';
export default function FileCard({ props }: {
  props: any;
}) {
  return (
    <Paper
      className='width: 48px margin: 16px;'
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 250,
        flexGrow: 1,
        backgroundColor: 'lightgray',
      }}>
      <FileIcon extension="docx" radius={1} {...defaultStyles.docx} />
    </Paper>
  )
}