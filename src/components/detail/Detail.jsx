import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {

    const { chatId,user, isCurrentUserBlocked, isReceiverBlocked, changeBlock }= 
    useChatStore();
    const {currentUser} = useUserStore();

    const handleBlock =async  ()=>{
         
   if (!user) return;

    const userDocRef = doc(db,"users", currentUser.id)

     try {
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock()
     }catch(err){
   console.log(err)
     }

    }
    return (
        <div className='detail'>
            <div className="user">
                <img src={user?.avatar || "./avatar.png"}alt="" />
                <h2>{user?.username}</h2>
                <p>Hi this is Varun Kumar wellcome.</p>
               </div>
               
               <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    
                    <div className="photos">
                       
                      
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="https://png.pngtree.com/png-clipart/20190828/ourmid/pngtree-swag-dracula-cartoon-png-image_1707897.jpg" alt="" />
                        <span>photo.png</span>
                        </div>
                        <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="https://png.pngtree.com/png-clipart/20190828/ourmid/pngtree-swag-dracula-cartoon-png-image_1707897.jpg" alt="" />
                        <span>photo.png</span>
                        </div>
                        <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                            <img src="https://png.pngtree.com/png-clipart/20190828/ourmid/pngtree-swag-dracula-cartoon-png-image_1707897.jpg" alt="" />
                        <span>photo.png</span>
                        </div>
                        <img src="./download.png" alt="" className="icon" />
                        </div>
                        
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "Your are Blocked!" : isReceiverBlocked ? "User blocked you" : "Block User"
                    
                    
                    }
                </button>
                <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
             </div>
               
          </div>
    );
};


export default Detail