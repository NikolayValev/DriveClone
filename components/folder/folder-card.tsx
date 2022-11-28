import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FolderIcon from '@mui/icons-material/Folder';
/**/
/*
components::FolderCard() components::FolderCard()

NAME

        FolderCard({name: string;size: string;})
          - Encapsulates the stateless component FolderCard.

SYNOPSIS

        FolderCard({ name, size }: {name: string;size: string;})
            name             --> a string with the name of the directory.
            size             --> a string with the size of the directory.

DESCRIPTION

        This function cretes a visual representation of a folder with
        { name, size } attributes. This is a stateless functional component.

RETURNS

        Returns a visual reprisentation of a folder card.
*/
/**/
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