import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import Base from "../components/Base"
import { createComment, loadPost } from "../services/post-service"
import { toast } from 'react-toastify'
import { BASE_URL } from "../services/helper"
import { isLoggedIn } from "../auth"
import ShareButton from "../components/ShareButton"
import './coolTextarea.css';




const PostPage = () => {

    const pdfUrl = 'http://localhost:3000/posts/';

    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        conent: ''
    })

    useEffect(() => {
        // load post of postId 
        loadPost(postId).then(data => {
            console.log(data);
            setPost(data)

        }).catch(error => {
            console.log(error)
            toast.error("Error in loading post")
        })

    }, [])

    const printDate = (numbers) => {

        return new Date(numbers).toLocaleDateString()
    }

    const submitPost = () => {

        if (!isLoggedIn()) {
            toast.error("Need to login first !!")
            return
        }

        if (comment.content.trim() === '') {
            return
        }
        createComment(comment, post.postId)
            .then(data => {
                console.log(data)
                toast.success("comment added ..")
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                })
                setComment({
                    content: ''
                })
            }).catch(error => {
                console.log(error)
            })
    }

    return (

        <Base>


            <Container className="mt-4">


                <Row>

                    <Col md={{
                        size: 12
                    }}>

                        <Card className="mt-3 ps-2 border-0 shadow-sm" >


                            {
                                (post) && (
                                    <CardBody>
                                        <CardText> Posted By <b>{post.user.name}</b> </CardText>




                                        <div className="divder" style={{
                                            width: '100%',
                                            height: '1px',
                                            background: '#e2e2e2'

                                        }}></div>

                                        <CardText className="mt-5">
                                            <h3>{post.title}</h3>
                                        </CardText>


                                        <div className="pdf-container mt-4 shadow" style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                                            <iframe className="pdf-iframe" src={BASE_URL + '/post/pdf/' + post.pdfName} title="PDF Document" style={{ width: '100%', height: '100%' }} />
                                        </div>

                                        <br></br>
                                        <div className="text-center">
                                        Share Link Here : <ShareButton url={pdfUrl + post.postId} />
                                        </div>
                                    </CardBody>


                                )

                            }


                        </Card>

                    </Col>
                </Row>

                <Row className="my-4">

                    <Col md={

                        {
                            size: 9,
                            offset: 1
                        }
                    }>
                        <h3>Comments ( {post ? post.comments.length : 0} )</h3>

                        {
                            post && post.comments.map((c, index) => (
                                <Card className="mt-4 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }

                        <Card className="mt-4 border-0" >
                            <CardBody>

                                <Input
                                    type="textarea"
                                    className="cool-textarea"
                                    placeholder="Enter your comment here"
                                    value={comment.content}
                                    onChange={(event) => setComment({ content: event.target.value })}
                                />

                                <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>

            </Container>


        </Base>

    )
}

export default PostPage