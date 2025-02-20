import { Await, Link, useLoaderData, useNavigate } from "react-router-dom"
//import Chat from "../../components/chat/chat"
import List from "../../components/list/list"
import apiRequest from "../../lib/apiRequest"
import Avatar from "../../assets/avatar.png"
import "./profilePage.scss"
import { Suspense, useContext} from "react"
import { AuthContext } from "../../context/AuthContext";

function ProfilePage(){
    const data = useLoaderData();
    const {currentUser,updateUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = async() => {
        try {
             await apiRequest.post("/auth/logout");
            updateUser(null)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                        <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar
                            <img src={currentUser.avatar || Avatar} alt="avatar" />
                        </span>
                        <span>
                            UserName: <b>{currentUser.username}</b>
                            Email: <b>{currentUser.email}</b>
                        </span>
                        <button className="logout" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My Listings</h1>
                        <Link to="/add">
                        <button>Create New Listing</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}>
                           {(postResponse) => <List posts={postResponse.data.userPosts} />} 
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>Saved Listings</h1>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}>
                           {(postResponse) => <List posts={postResponse.data.savedPosts} />} 
                        </Await>
                    </Suspense>
                </div>
            </div>
            {/* <div className="chatContainer">
                <div className="wrapper">
                <Suspense fallback={<p>Loading...</p>}>
                        <Await
                        resolve={data.chatResponse}
                        errorElement={<p>Error loading chats!</p>}>
                           {(chatResponse) => <Chat chats={chatResponse.data} />} 
                        </Await>
                    </Suspense>
                        
                </div>
            </div> */}
        </div>
    )
}
export default ProfilePage