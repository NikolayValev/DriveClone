import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FolderCard from '@/components/folder/folder-card'
export default function FolderGrid() {
  return (
    <Grid
      container
      rowSpacing={2}
      padding = {2}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <FolderCard name={"folder1"} size={"1kb"} />
      <FolderCard name={"folder"} size={"2kb"} />
    </Grid>
  )
}
