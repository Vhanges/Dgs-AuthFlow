import { useParams } from "react-router-dom"
import chatList from "../../data/chatList";
import { MoreOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";
import chatDetails from "../../data/chatDetails";
import { Input } from "antd";

const ChatView = () => {

    const { chatId } = useParams();
    const chat = chatList.find((chat) => chat.chat_id === chatId);
    const messages = chatDetails?.[chatId] || [];

    console.log("id: ", messages[0].sender);
    console.log("id: ", chat.user.id);
    if (!messages.length) {
        return <div className="font-bold">Chat not found</div>
    }

    if (!chat) {
        return <div>Chat not found</div>;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 border-gray-200">
                <div className={`flex items-center gap-4 rounded-2xl`} >
                            <span className="h-10 w-10 relative">
                                <img 
                                    src={chat.user.avatar} 
                                    alt={chat.user.name} 
                                    className="h-full w-full rounded-full object-cover" 
                                />
                                { chat.user.is_online &&
                                    <div 
                                        className="h-3 w-3 absolute bottom-0 right-0 border-2
                                                border-dirty-white bg-green-500 rounded-full">
                                    </div>
                                }
                            </span>
                            <div>
                                <p className="text-xl font-semibold">
                                    {chat.user.name}
                                </p>
                                { chat.user.is_online && 
                                <p className="text-xs text-gray-500">
                                  Active Now                                    
                                </p>
                                }
                            </div>
                </div>
                <MoreOutlined className="text-2xl text-dark-gray" />
            </div>

            {/* Chat Body */}
            <div className="flex-1 min-h-0 flex flex-col py-15 gap-1 px-3 overflow-y-auto">
                {messages.map((message, index) => {
                    const isSameSenderAsPrevious =
                        index > 0 && messages[index - 1].sender === message.sender;

                    return (
                        <div className="w-full h-fit relative" key={index}>
                            {/* Only display the avatar if the sender is different from the previous message */}
                            {!isSameSenderAsPrevious && message.sender !== chat.user.id && (
                                <span className="-top-3 -left-3 absolute border-2 border-dirty-white rounded-full">
                                    <img
                                        src={chat.user.avatar}
                                        alt={chat.user.name}
                                        className="h-5 w-5 rounded-full object-cover"
                                    />
                                </span>
                            )}
                            <div
                                className={`w-fit bg-dark-slate p-2 rounded-b-md ${
                                    message.sender === chat.user.id ? "ml-auto rounded-tl-md" : "mr-auto rounded-tr-md"
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Send Message */}
            <div className="w-full h-15 items-center flex gap-3 px-3">
                <Input
                    style={{
                        backgroundColor: "oklch(96.8% 0.007 247.896)",
                        outline: "none",
                        boxShadow: "none",
                        height: "70%",
                        borderRadius: "25px"
                    }}
                    placeholder="Write message"
                />
                <SendOutlined className="text-2xl text-primary hover:scale-110 transition-transform duration-200"/>
            </div>
        </div>
    )
}

export default ChatView;