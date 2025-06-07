import { Button } from "../ui/button";
import { postComment } from "../../api/Comment";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { getComment } from "../../api/Comment";
import Rating from "../Rating";
/*
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(default=0)
    # fk
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="comments")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comments")
*/

const Comment = ({profile,product}) => {
    const [ comment,setComment ] = useState("")
    //const currentDate = new Date().toISOString();
    const [ comments, setComments ] = useState([])
    const [ rateComment,setRateComment ] = useState({})

    useEffect(()=>{
        setComments(getComment.data.filter(com=>com.product_name == product.name))
        setRateComment(getComment.data.find(com=> com.product_name == product.name & com.client_username == profile.user.username || true   ))
    },[]);
    //console.log("currentDate =>",currentDate)
    console.log("client =>",profile)
    console.log("product =>",product)
    console.log("comment =>",comment)
    console.log("Comments =>",comments)
    console.log("Rate comment =>",rateComment)
    return(
        <section className="bg-white  py-8 lg:py-16 antialiased">
            <div>
                <Rating profile={profile} product={product} comment={rateComment}/>
            </div>
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Discussion (20)</h2>
                </div>
                <div className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                            placeholder="Write a comment..." required
                            onChange={(e)=>{
                                setComment(e.target.value)
                            }}    
                            value={comment}
                        ></textarea>
                    </div>
                    <Button 
                        className="bg-orange-400"
                        onClick={()=>{
                            const com = {
                                content : comment,
                                product : product.id
                            }
                            postComment(com).then(data=>{
                                console.log("response =>",data)
                            }).catch(error=>{
                                console.log("error => ",error)
                            })
                            window.location.href = window.location.href;
                        }}
                        > Post Comment</Button>
                </div>
                {
                    comments.length ?(
                        comments.map((com,index)=>(
                            <article key={index} className="p-6 text-base bg-white border-t border-gray-200 ">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                                alt="Helene Engels"></img>
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">{com.client_username}</p>
                                            <div className="flex items-center gap-2">
                                                <h2>{com.rating}</h2>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 ">
                                            <time 
                                                title="June 23rd, 2022">
                                                    {com.created_date.toLocaleString('fr-FR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                            </time>
                                        </p>
                                    </div>
                                    <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                                        type="button">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                        </svg>
                                    </button>
                                    <div id="dropdownComment4"
                                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ">
                                        <ul className="py-1 text-sm text-gray-700 "
                                            aria-labelledby="dropdownMenuIconHorizontalButton">
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 ">Edit</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 ">Remove</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 ">Report</a>
                                            </li>
                                        </ul>
                                    </div>
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">{com.content}</p>
                            </article>
                        ))
                    ) : (
                        <></>
                    )
                }
            </div>
        </section>
    )
}

export default Comment;