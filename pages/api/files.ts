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
let dataRaw: {
  name: string,
  size: string,
  createdOn: string,
  lastModified: string
}[]

export default function serveFiles(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ dataRaw })
  let headers = req.headers
  let body = req.body

}