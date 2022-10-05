import { FileIcon, defaultStyles } from 'react-file-icon';
import Grid from '@mui/material/Grid';
export default function FileGrid() {
  interface sample_file {
    file_name: string;
    extension: string;
    size: string;
  }
  const files = [
    { file_name: "test", extension: "txt", size: "1 Kb" },
    { file_name: "program", extension: "cpp", size: "150 kb" },
    { file_name: "photoshopFile", extension: "psd", size: "250 Mb" }
  ]
  const styledIcons = Object.keys(defaultStyles);
  const listItems = files.map((file) =>
    <div className="width: 2 em margin: 10px">
      <FileIcon extension={file.extension} {...defaultStyles[file.extension]} />
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
