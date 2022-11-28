import Head from 'next/head';

export const defaultMetaProps = {
  title: 'Storage Squire',
  description:
    'Personal destributed storage solution.',
  ogImage: `/favicon.ico`,
};

export interface MetaProps {
  title: string;
  description: string;
  ogImage: string;
}
/**/
/*
componets::Meta() componets::Meta()

NAME

        Meta({ props}: { props: MetaProps })
          - Encapsulates the stateless component Meta.

SYNOPSIS

        Meta({ props })
            props             --> an object with the properties.

DESCRIPTION

        This function cretes a semantic element for SEO and screen readers with
        { } attributes. This is a stateless functional component.

RETURNS

        Returns a SEO and screen reader optimization as well as page title and so on.
*/
/**/
export default function Meta({ props }: { props: MetaProps }) {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <meta name="theme-color" content="#7b46f6" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />
      <meta itemProp="image" content={props.ogImage} />
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.ogImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Vercel" />
      <meta name="twitter:creator" content="@StevenTey" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.ogImage} />
    </Head>
  );
}
