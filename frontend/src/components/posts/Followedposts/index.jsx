import Post from '../postcontainer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { Wrapper } from '../searchResults/styled'
import { fetchFollowed } from '../../../Axios/fetches'
import SearchBar from '../searchbar'

export const FollowedPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFollowed)
    }, [dispatch])

    const followed = useSelector(state => state.followedPosts)

    return (
        <Wrapper>
            <SearchBar />
            <div className='grid'>
                <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    {followed ? followed.map((post, index) => (
                        <Post key={post.id} post={post}/>
                    )) : <h1>You have no friends...yet! :(</h1>}
                </Masonry>
            </div>
        </Wrapper>
    )
}

export default FollowedPosts