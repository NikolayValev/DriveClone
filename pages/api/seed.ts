import type { NextApiRequest, NextApiResponse } from 'next';
import { setup } from 'scripts/setup.mjs';
/**/
/*
api::handler() api::handler()

NAME

        handler(context)
          - Hydrates the View on the dynamically generated path.

SYNOPSIS

        handler(_req: NextApiRequest, res: NextApiResponse)
            _req             --> the request of the browser.
            res             --> the response of the browser.

DESCRIPTION

        The function would call the setup function.

RETURNS

        Returns the res object directly to the browser
*/
/**/
async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const message = await setup();

  if (message) {
    res.status(500).json({
      error: { message }
    });
  } else {
    /**
         * Specifies the number (in seconds) for the preview session to last for.
         * The given number will be converted to an integer by rounding down.
         * By default, no maximum age is set and the preview session finishes
         * when the client shuts down (browser is closed).
         */
    await res.unstable_revalidate(`/`);
    res.status(200).send('ok.');
  }
}

export default handler;
