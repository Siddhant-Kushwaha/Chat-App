import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"
import uuid from "react-uuid"

const socket = io.connect("http://localhost:3000")

function App() {
    const [msg, setMsg] = useState({ message: "", name: "", uid: "" })
    const [chats, setChats] = useState([])
    const id = useRef(uuid())
    const ref = useRef(null)
    // console.log(chats)
    const onMessageSubmit = (e) => {
        e.preventDefault()
        const { name, message } = msg
        console.log("message sent")
        socket.emit("message", { name, message, uid: id.current })
        setMsg({ message: "", name })
    }
    const handleChange = (e) => {
        setMsg({ ...msg, message: e.target.value })
    }

    const renderChat = () => {
        return chats.map(({ name, message, uid }, index) => {
            console.log(id.current, uid)
            return (
                <div
                    key={index}
                    className={
                        id.current === uid
                            ? `chat-body-right`
                            : `chat-body-left`
                    }
                >
                    <h6 className="chat-name">{name}</h6>
                    <div className="chat-message" s>
                        <h3>{message}</h3>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight
        socket.off("message").on("message", ({ name, message, uid }) => {
            setChats((chats) => [...chats, { name, message, uid }])
        })
        return () => {
            console.log("disconect")
        }
    }, [chats])

    useEffect(() => {
        const name = prompt("Enter Your Name:")
        setMsg({ ...msg, name })
        console.log("mounted")
        return () => console.log("unmounted")
    }, [])
    return (
        <div className="chat">
            {/* {console.log("rendered")} */}
            <div className="chat-box">
                <div className="chat-header">Welcome To Chatter-Box</div>
                <div className="message-box" ref={ref}>
                    {renderChat()}
                </div>
                <form action="" onSubmit={onMessageSubmit}>
                    <input
                        type="text"
                        name="message"
                        className="chat-input"
                        placeholder="Type you message..."
                        onChange={(e) => handleChange(e)}
                        value={msg.message}
                    />
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default App
