import { DriveProps } from '@/lib/api/drive';
import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  CheckIcon,
  EditIcon,
  GitHubIcon,
  LoadingDots,
  UploadIcon,
  XIcon
} from '@/components/icons';
import { useSession } from 'next-auth/react';
import BlurImage from '../blur-image';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import { MDXRemote } from 'next-mdx-remote';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FolderIcon from '@mui/icons-material/Folder';
import { FolderGrid } from '@/components/folder'
import { FileGrid } from '@/components/files'
import { UploadFile } from '@/components/upload'
export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';
/**/
/*
spmLongShort::ProcessNewOpens() spmLongShort::ProcessNewOpens()

NAME

        Mount({ drive: DriveProps;})
          - Encapsulates the high order component Mount.

SYNOPSIS

        Mount({ drive }: { drive: DriveProps; })
            drive             --> an object with the properties of the directory.

DESCRIPTION

        This function will attempt to open the trading object a_obj with the
        specified amount of capital. Before attempting the open, it will
        apply portfolio constraints. If any of the portfolio constraints are
        not met, this object will be opened as a phantom.  The constraint
        may also reduce the amount of capital to be applied.

        The status flags and phantom flag for the object will be set
        appropriately.

RETURNS

        Returns true if the open was successful and false if it was opened
        as a phantom.  One of these two cases will always occur.
*/
/**/
export default function Mount({ drive }: { drive: DriveProps; }) {

  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: drive.name,
    image: drive.image,
    description: drive.description || '',
    directoryContents: drive.contents //TODO this might be an issue
  });
  const [files, setFiles] = useState({
    path: '',
    data: []
  });
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleLoad = async () => {
    setError('');
    setLoading(true);
    try {
      // TODO might need to change the headers
      const response = await fetch('http://localhost:3000/api', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const directoryContents = await response.json();
        setData({
          ...data,
          directoryContents
        }); // optimistically show updated state for bioMdx
        //router.replace(`/${user.username}`, undefined, { shallow: true });
      } else if (response.status === 401) {
        setError('Not authorized.');
      } else {
        setError('Error.');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  //console.log(drive);
  async function fetchFiles() {
    try {
      // TODO might need to change the headers
      const response = await fetch('http://localhost:7000/api', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const directoryContents = await response.json();
        const data = directoryContents.paths;
        console.log(data);
        setFiles({
          ...files,
          data
        }); // optimistically show updated state for bioMdx
        //router.replace(`/${user.username}`, undefined, { shallow: true });
      } else if (response.status === 401) {
        setError('Not authorized.');
      } else {
        setError('Error.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen pb-20">
      <div>
        <div
          className={`h-48 w-full lg:h-64
          ${getGradient(drive.name)}`}
        />
      </div>
      <div>
        <Typography color="white" gutterBottom variant="h3" component="div">
          {`Device name: ${drive.name}.`}
        </Typography>
        <Typography color="white" gutterBottom variant="h4" component="div">
          {`Your account: ${drive.user} at ipv4:${drive.ip_address} is listening on port: ${drive.port}`}
        </Typography>
        <Typography color="white" gutterBottom variant="body1" component="div">
          {`${drive.description}.`}
        </Typography>
        <Typography>
          { }
        </Typography>
      </div>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: '#1A2027',
        }}
      > <UploadFile></UploadFile>
        <Typography color="white" gutterBottom variant="subtitle1" component="div">
          Folders
        </Typography>
        <FolderGrid></FolderGrid>
        <Typography color="white" gutterBottom variant="subtitle1" component="div">
          Files
        </Typography>
        <FileGrid contents={files}></FileGrid>
      </Paper>
    </div>
  );
}
