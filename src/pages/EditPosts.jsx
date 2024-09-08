import React, {useEffect, useState} from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom";

function EditPosts() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    console.log("checking post inn edit component", post);
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}
export default EditPosts