import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch(errror){
            console.log("Appwrite service :: error ", errror);
        }
    }

    async updatePost (slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch(error){
            console.log("Appwrite service :: update failed", error);
        }
    }

    async deletePost(slug){
        try{    
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error){
            console.log("Appwrite service :: delete failed", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return post;
        } catch(error){
            console.log("Appwrite serive :: get failed", error);
        }
    }

    async getPosts(queries = [Query.equal("status", 
        "active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
            
                )
            } catch (error){
                console.log("Appwrite service :: get posts failed", error);
                return false;
            }
    }

    //file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error){
            console.log("Appwrite service :: upload file failed", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error){
            console.log("Appwrite service :: delete file failed", error);
            return false;
        }
    }

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    // }
    getFilePrev(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service
