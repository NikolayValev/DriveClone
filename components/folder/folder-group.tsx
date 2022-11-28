import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FolderCard from '@/components/folder/folder-card'

/**/
/*
componets::FolderGrid() componets::FolderGrid()

NAME

        FolderGrid({ props})
          - Encapsulates the stateless component FolderGrid.

SYNOPSIS

        FolderGrid({ props })
            props             --> an object with the properties.

DESCRIPTION

        This function cretes a visual representation of a folder grid with
        { } attributes. This is a stateless functional component.

RETURNS

        Returns a visual reprisentation of a folder grid.
*/
/**/
export default function FolderGrid({ folders }: { folders: any }) {
  const listItems = folders.map((folder) =>
    // eslint-disable-next-line react/jsx-key
    <div className="width: 2 em margin: 10px">
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: 'lightgray',
        }}>
        <span>
          <div>
            {folder.path}
          </div>
          <br />
        </span>
      </Paper>
    </div>
  );
  return (
    <Grid
      container
      rowSpacing={2}
      padding={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {listItems}
    </Grid>
  )
}
