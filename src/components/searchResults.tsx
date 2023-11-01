import { Models } from "appwrite";
import Loader from "./loader";
import GridPostList from "./gridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document>;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearchFetching,
  searchedPosts,
}) => {
  if (isSearchFetching)
    return (
      <div className="flex-center w-full h-[257px]">
        <Loader />
      </div>
    );

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return (
    <p className="flex-center text-light-4 w-full h-[257px]">
      No results found
    </p>
  );
};

export default SearchResults;
