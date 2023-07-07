import React, { useState } from 'react';
import { searchPosts } from '../services/post-service';
import Post from './Post';
import { toast } from 'react-toastify';
import { deletePostService } from '../services/post-service';
import { Row, Col } from 'reactstrap';
import Base from './Base';
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
const SearchBar = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalElements: 0

    })

    const [keywords, setKeywords] = useState('');


    const handleInputChange = (event) => {
        setKeywords(event.target.value);
    };

    const handleSearch = () => {
        searchPosts(keywords).then(
            data => {
                console.log(data)
                setPostContent({
                    content: data.content,
                    totalElements: data.content.length

                })
            }
        ).catch(error => {
            toast.error("Error in searching posts")
        }
        )
    };

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
        <>
            <Base>

                <br></br>
                <Container className="text-center">
                    <input
                        type="text"
                        value={keywords}
                        onChange={handleInputChange}
                        placeholder="Search keywords..."
                        className="rounded-0"

                    />
                    <Button onClick={handleSearch} className="rounded-0 ms-2" color="primary">Search</Button>
                    <Row>
                        <Col md={
                            {
                                size: 12

                            }
                        }>




                        </Col>
                    </Row>
                </Container>
                <div className="container-fluid">

                        <h1>PDF Results : {postContent.totalElements}</h1>
                    {
                        postContent.content.map((post, index) => (
                            <Post deletePost={deletePost} post={post} key={index} />
                        ))
                    }

                </div>

            </Base >
        </>
    );
};

export default SearchBar;
