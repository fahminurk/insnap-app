import Loader from "@/components/loader";
import PostCard from "@/components/postCard";
import { useGetRecentPosts } from "@/lib/react-query/postQueries";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending, isError } = useGetRecentPosts();

  return (
    <div className="flex flex-1 ">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="sticky top-0 h3-bold md:h2-bold text-left w-full">
            Home Feed
          </h2>
          {isError ? (
            <div className="flex-center flex-col h-[432px] w-full h3-bold">
              <p>Appwrite still beta,</p>
              <p> sometimes it doesn't work.</p>
              <p> try again later</p>
            </div>
          ) : isPending && !posts ? (
            <div className="flex-center w-full h-[432px]">
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
