import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
type Directories = {
  name: string,
  directChilderen: Folder[]
}
type Folder = {
  name: string,
  contents: Blob
}
const dataRaw: {
  name: string,
  size: string,
  createdOn: string,
  lastModified: string
}[] = [
    {
      name: "Dynu.IUC.Setup.5.4.exe",
      size: "5.6 MB",
      createdOn: 'Apr 20 at 03: 34',
      lastModified: '5 months ago'
    },
    {
      name: 'dynu.iuc.setup.zip',
      size: '5.5 MB',
      createdOn: 'Sep 10 at 19: 24',
      lastModified: 'a week ago',
    },
    {
      name: 'test.txt',
      size: '4 B',
      createdOn: 'Sep 8 at 22: 50',
      lastModified: 'a week ago',
    }
  ];

export default function serveFiles(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ dataRaw })
  let headers = req.headers
  let body = req.body

}