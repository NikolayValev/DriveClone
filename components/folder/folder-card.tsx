import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FolderIcon from '@mui/icons-material/Folder';
export default function FolderCard({ name, size }: {
  name: string;
  size: string;
}) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: 'lightgray',
      }}>
      <FolderIcon />
      <Typography gutterBottom variant="subtitle1" component="div">
        {name}
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="div">
        {size}
      </Typography>
    </Paper>
  )
}