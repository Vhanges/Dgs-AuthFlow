import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Chat = ({children}) => {

    const chatList = [
        {
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Aneka",
            is_online: true,
            name: "John Doe",
            latest_message: "Hey, how are you?"
        }
    ];

    return(
        <div className="w-full flex p-4 gap-4 text-black">
            <div className="flex-1 p-4 bg-dirty-white shadow-sm rounded-md">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-2xl font-bold">
                        Chats
                    </h4>
                    <Input
                        style={{
                            backgroundColor: "oklch(96.8% 0.007 247.896)",
                            outline: "none",
                            boxShadow: "none",
                        }}
                        prefix={<SearchOutlined />}
                    />
                </div>
                {/* Chats */}
                {chatList.map((chat, key) => (
                    <div className="flex" key={key}>
                        <span className="h-full">
                            <img src={chat.avatar} alt={chat.name} />
                        </span>
                        <p>
                            {chat.name}
                        </p>
                        <p>
                            {chat.latest_message}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex-2 p-3 bg-dirty-white shadow-sm rounded-md">
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Chat;