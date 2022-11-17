import { getIds, getFavoriteData } from '../lib/process';

export async function getStaticProps({ params }) {
  const favoriteData = await getFavoriteData(params.id);
  return {
    props: {
      favoriteData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getIds();
  return {
    paths,
    fallback: false
  };
}

export default function SelectedID({ favoriteData }) {
  return (
    <main> 
      <article className="favorite-place card col-12 bg-light px-3">
        <div>
          <h1 className="card-header text-uppercase text-center" key={favoriteData.ID}><strong>Title: {favoriteData.post_title}</strong></h1>
          <p className="card-text px-5 mx-5 my-2"><strong>Content:</strong> {favoriteData.post_content}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Status:</strong> {favoriteData.post_status}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Date:</strong> {favoriteData.post_date}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Post ID:</strong> {favoriteData.ID}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Comment Status:</strong> {favoriteData.comment_status}</p>
          <p className="text-center"><strong>Author ID:</strong>{favoriteData.post_author}</p>
        </div>
      </article>
    </main>
  );
}