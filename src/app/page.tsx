import { unstable_cache } from "next/cache";
import axios from "axios";

const API_URL = 'https://timeapi.io/api/Time/current/zone?timeZone=UTC';

const fetchServerTime = async () => {
  const res = await fetch(API_URL, {
    next: {
      revalidate: 20,
      tags: ['time-with-fetch'],
    },
  });

  return res.json();
};

const fetchServerTimeUnstablecache = unstable_cache(
  async () => (await axios.get(API_URL)).data,
  ['time-with-unstable-cache'],
  {
    revalidate: 20,
    tags: ['time-with-unstable-cache'],
  },
);

export default async function Home() {
  const serverTime = await fetchServerTime();
  const serverTime2 = await fetchServerTimeUnstablecache();

  // Drop nanoseconds
  const fetchTime = serverTime.dateTime.replace(/\..+/, '');
  const unstableTime = serverTime2.dateTime.replace(/\..+/, '');

  console.log('fetch\t\t', fetchTime);
  console.log('unstable_cache\t', unstableTime);

  return (
    <>
      <p>Server time: {fetchTime} (fetch)</p>
      <p>Server time: {unstableTime} (unstable_cache)</p>
    </>
  )
}
