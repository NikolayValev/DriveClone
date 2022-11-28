import { FileIcon, defaultStyles, DefaultExtensionType } from 'react-file-icon';
import Grid from '@mui/material/Grid';
import { KeyObjectType } from 'crypto';
import { Paper } from '@mui/material';

interface File {
  path: string;
  data: {
    type: string;
    data: Buffer;
  }
}

/**/
/*
componets::FileGrid() componets::FileGrid()

NAME

        FileGrid({ props})
          - Encapsulates the stateless component FileGrid.

SYNOPSIS

        FileGrid({ props })
            props             --> an object with the properties.

DESCRIPTION

        This function cretes a visual representation of a file grid with
        { } attributes. This is a stateless functional component.

RETURNS

        Returns a visual reprisentation of a file grid.
*/
/**/
export default function FileGrid({ contents }: { contents: any }) {
  function id(baseId: string) {
    return baseId + '-' + Math.random().toString(16).slice(2);
  }
  const styledIcons = Object.keys(defaultStyles);
  //console.log(contents)
  const listItems = contents.map((file) =>
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
            {file.path}
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
