import React from 'react';
import { DefaultLayout } from '~/components/templates/DefaultLayout';

type Props = {};

const title = 'Top';

const Page = (props: Props): JSX.Element => {
  return <DefaultLayout title={title}>{title}</DefaultLayout>;
};

export default Page;
