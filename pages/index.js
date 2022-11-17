import Link from 'next/link';
import { getInfo } from '../lib/process.js';

export async function getStaticProps() {
  // set variable to hold data
  const allInfo = await getInfo();
  // console.log(allInfo);
  return {
    props: {
      // make data available as props
      allInfo
    }
  }
}

export default function Home({allInfo}) {
  return (
    <div className="text-center bg-info">
    <h1 className="display-7 bg-primary text-uppercase py-3"><strong>My Wordpress Posts</strong></h1>
      {
        allInfo.map(({params}) => {
          return (
            <article className="my-2 py-5" key={params.id}>
              <section className="card mx-auto my-1 col-4 shadow-lg bg-light bg-opacity-75">
                <div className="card-body">
                  <h2 className="card-header">{params.title}</h2>
                  <p className="mt-4">Content: {params.content}</p>
                  <p>Date: {params.date}</p>  
                      <Link href={params.id}>
                      <a className="reach-out btn btn-primary mt-3">More info</a>
                     </Link> 
                </div>
              </section>
            </article>  
          )
        })
      }
    </div>
  )
}