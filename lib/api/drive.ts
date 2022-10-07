import clientPromise from '@/lib/mongodb';

export interface DriveProps {
  machine_friendly_name: string;
  name: string;
  user: string;
  ip_address: string;
  port: string;
  image: string;
  description: string;
  //fix this to have a proper type
  contents: Array<any>;
}

export interface ResultProps {
  _id: string;
  drives: DriveProps[];
}

export const placeholderDescription = `idk`;

export async function getDrive(machine_friendly_name: string): Promise<DriveProps | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const results = await collection.findOne(
    { machine_friendly_name },
    { projection: { _id: 0 } }
  );
  if (results) {
    return results;
  } else {
    return null;
  }
}

export async function getFirstDrive(): Promise<DriveProps | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const results = await collection.findOne(
    {},
    {
      projection: { _id: 0 }
    }
  );
  return { ...results };
}

export async function getAllDrives(): Promise<ResultProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  const final = await collection
    .aggregate([
      {
        $sort: {
          displayName: 1
        }
      },
      {
        $limit: 100
      },
    ])
    .toArray();
  return { ...final }
}

export async function searchDrive(query: string): Promise<DriveProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate([
      {
        $search: {
          index: 'name-index',
          /*
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getDriveCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('test').collection('Devices');
  return await collection.countDocuments();
}

export async function updateDrive(machine_friendly_name: string, ip: string) {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.updateOne({ machine_friendly_name }, { $set: { ip } });
}
