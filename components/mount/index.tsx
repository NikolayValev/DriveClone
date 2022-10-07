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

export default function Mount({
  drive
}: {
  drive: DriveProps;
}) {
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
        <FileGrid></FileGrid>
      </Paper>
    </div>
  );
}

const tabs = [
  { name: 'Profile' },
  { name: 'Work History' },
  { name: 'Contact' }
];
