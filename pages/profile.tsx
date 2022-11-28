import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  ExpandablePanel,
  HeaderPanel,
  SettingsGroup,
  SettingsItem,
  SettingsPanel
} from 'material-ui-settings-panel'
import { searchUser } from '@/lib/api/user';

export default function Profile(results) {
  return (
    <div>
      <SettingsPanel>
        <HeaderPanel
          title="Gmail"
          subtitle="Für alle aktiviert"
          description="https://mail.google.com/a/company.com"
          image={<img src="https://ssl.gstatic.com/apps/cpanel/resources/img/gmail-128.png" />}
        />
        <ExpandablePanel
          title="Nutzer Einstellungen"
          description="Sed diam nonumy eirmod tempor invidunt ut labore"
        >
          <SettingsGroup title="Lorem ipsum">
            <SettingsItem title="Lorem ipsum" description="Description">
              <div>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua.
              </div>
            </SettingsItem>
            <SettingsItem title="Lorem ipsum">
              <div>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua.
              </div>
            </SettingsItem>
          </SettingsGroup>
        </ExpandablePanel>
        <ExpandablePanel
          title="E-Mail-Adressen"
          description="Lassen Sie sich alle E-Mail-Adressen und Aliase für Ihre Organisation anzeigen."
        >
        </ExpandablePanel>
      </SettingsPanel>
    </div>
  )
}
/**/
/*
profile::getServerSideProps() profile::getServerSideProps()

NAME

        getServerSideProps(context)
          - Hydrates the View on the profile page.

SYNOPSIS

        getServerSideProps(context)
            context             --> the context of the browser.

DESCRIPTION

        The function would call the API to get the data to hydrate the page.
        This all happens server side so any call to the DB or API are fine,
        but for sanity sake they are abstracted away so aggrigations from
        multiple datapoints are kept independent. For further referance
        check the lib files.

RETURNS

        Returns the properties needed to load the page.
*/
/**/
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  const results = JSON.parse(JSON.stringify(await searchUser(session.username)));

  return {
    props: {
      results,
    },
    revalidate: 10
  };
};
