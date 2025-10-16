'use client';

import Banner from '@/components/slider/banner';
import Page from '@/lib/widgets/Page';

export default function Home() {
  return (
    <Page className='flex flex-col justify-between'>
      <Banner />
    </Page>
  );
}
