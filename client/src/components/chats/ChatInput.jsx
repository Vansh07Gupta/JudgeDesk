import { useRef } from "react"
import { LuSendHorizontal } from "react-icons/lu"

import { useAppContext } from "@/context/AppContext"
import { useChatRoom } from "@/context/ChatContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { formatDate } from "@/utils/formateDate"
import { v4 as uuidV4 } from "uuid"

function ChatInput() {
    const { currentUser } = useAppContext()
    const { socket } = useSocket()
    const { setMessages } = useChatRoom()
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current?.value.trim()

        if (inputVal) {
            const message = {
                id: uuidV4(),
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            }

            socket.emit(SocketEvent.SEND_MESSAGE, { message })
            setMessages((messages) => [...messages, message])

            if (inputRef.current) inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between rounded-md border border-primary"
        >
            <input
                type="text"
                className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none"
                placeholder="Enter a message..."
                ref={inputRef}
            />
            <button
                type="submit"
                aria-label="Send message"
                className="flex items-center justify-center rounded-r-md bg-primary p-2 text-black"
            >
                <LuSendHorizontal size={24} />
            </button>
        </form>
    )
}

export default ChatInput
