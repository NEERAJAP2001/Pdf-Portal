import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadAllPosts } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container, Button } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { deletePostService } from '../services/post-service'
import SearchBar from './SearchBar'
function NewFeed() {




    const [postContent, setPostContent] = useState({
        content: [],
        totalElements: 0

    })


    useEffect(() => {
        loadAllPosts().then(
            data => {
                console.log(data)
                setPostContent({
                    content: data.content,
                    totalElements: data.content.length
                })
            })
            .catch(error => {
                toast.error("Error in loading posts")
            })
    }, [])





    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleled..")

            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({ ...postContent, content: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }



    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12

                    }
                }>

                    <h2> Pdfs Count : {postContent.totalElements}</h2>
                    {
                        postContent.content.map((post, index) => (
                            <Post deletePost={deletePost} post={post} key={index} />
                        ))
                    }


                </Col>
            </Row>
        </div>


    )
}

export default NewFeed