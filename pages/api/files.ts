import type { NextApiRequest, NextApiResponse } from 'next'
import { searchDrive, updateDrive } from 'lib/api/drive';
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
let dataRaw: {
  name: string,
  size: string,
  createdOn: string,
  lastModified: string
}[]
/**/
/*
api::handler() api::handler()

NAME

        handler(req: NextApiRequest, res: NextApiResponse)
          - Hydrates the View on the dynamically generated path.

SYNOPSIS

        handler(_req: NextApiRequest, res: NextApiResponse)
            _req             --> the request of the browser.
            res             --> the response of the browser.

DESCRIPTION

        The function would provide the user context from the backend.

RETURNS

        Returns the res object directly to the browser
*/
/**/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await searchDrive(req.query.query as string);
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
