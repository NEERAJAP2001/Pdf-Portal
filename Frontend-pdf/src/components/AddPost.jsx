import { useState } from "react"
import { useEffect } from "react"
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap"
import { useRef } from "react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetail } from "../auth"
import { toast } from "react-toastify"
const AddPost = () => {

    const editor = useRef(null)


    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title: '',
    })

    const [image, setImage] = useState(null)


    // const config={
    //     placeholder:"Start typing...",

    // }

    useEffect(
        () => { setUser(getCurrentUserDetail()) },
        []
    )

    //field changed function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })
    }




    //create post function
    const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        if (post.title.trim() === '') {
            toast.error("post  title is required !!")
            return;
        }


        //submit the form one server
        post['userId'] = user.id


        doCreatePost(post).then(data => {


            uploadPostImage(image, data.postId).then(data => {
                console.log(data)
                toast.success("PDF  Uploaded !!")
            }).catch(error => {
                toast.error("Error in uploading image")
                console.log(error)
            })



            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                title: '',
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event
    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }


    return (
        <div className="wrapper">
            <Card className="shadow-sm  border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>Upload PDF Page</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title" >PDF title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                onChange={fieldChanged}
                            />
                        </div>
                        {/* file field  */}

                        <div className="mt-3">
                            <Label for="image">Browse File</Label>
                            <Input id="image" type="file" onChange={handleFileChange} accept="application/pdf" />
                        </div>



                        <br></br>
                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button type="reset" className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>


                    </Form>


                </CardBody>

            </Card>




        </div>
    )
}

export default AddPost