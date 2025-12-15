import PostListItem from './PostListItem';
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPost = async (pageParam) =>{
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${API_URL}/posts` , {
    params: {
      page: pageParam,limit:2
  }});
  return res.data;
}

const PostList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({pageParam = 1})=>fetchPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })
  console.log(data)
  
    if (status === "loading") return 'Loading...'
  
    if (status === "error") return 'Something went wrong';
  const allposts = data?.pages.flatMap(page => page.posts) || [];

    console.log(data)
  return (
    <InfiniteScroll
      dataLength={allposts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading more post...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <p className='text-gray-500 font-semibold text-sm mt-4'>All post loaded</p>
        </p>
      }
      // below props only if you need pull down functionality
     
    >
      {allposts.map((post) => (
            <PostListItem key={post._id} post={post} />))
          }
    </InfiniteScroll>
      
       
  )
}

export default PostList