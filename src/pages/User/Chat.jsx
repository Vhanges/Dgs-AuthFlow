import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useMemo, useState } from "react";

const Chat = ({children}) => {


    const [activeChatId, setActiveChatId] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
        console.log("LOGLOGLOG")
        return () => clearTimeout(t);
    }, [searchQuery] )

    const chatList = useMemo(() => ([
        {
            "chat_id": "chat-001",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Felix",
            "is_online": true,
            "is_read": true,
            "name": "Felix Miller",
            "latest_message": "Did you see the latest update?"
        },
        {
            "chat_id": "chat-002",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Sarah",
            "is_online": false,
            "is_read": false,
            "name": "Sarah Jenkins",
            "latest_message": "Let's catch up tomorrow."
        },
        {
            "chat_id": "chat-003",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Marcus",
            "is_online": true,
            "is_read": false,
            "name": "Marcus Thorne",
            "latest_message": "The server is back up!"
        },
        {
            "chat_id": "chat-004",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Elena",
            "is_online": true,
            "is_read": true,
            "name": "Elena Rodriguez",
            "latest_message": "Can you review that PR?"
        },
        {
            "chat_id": "chat-005",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Hiro",
            "is_online": false,
            "is_read": false,
            "name": "Hiroshi Tanaka",
            "latest_message": "Sent you the files over email."
        },
        {
            "chat_id": "chat-006",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Chloe",
            "is_online": true,
            "is_read": false,
            "name": "Chloe Bennet",
            "latest_message": "That sounds like a plan!"
        },
        {
            "chat_id": "chat-007",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Jasper",
            "is_online": false,
            "is_read": true,
            "name": "Jasper Vance",
            "latest_message": "I'll be OOO for the rest of the day."
        },
        {
            "chat_id": "chat-008",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Maya",
            "is_online": true,
            "is_read": true,
            "name": "Maya Patel",
            "latest_message": "Is the meeting still on for 3 PM?"
        },
        {
            "chat_id": "chat-009",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Leo",
            "is_online": true,
            "is_read": true,
            "name": "Leo Sterling",
            "latest_message": "I just finished the design mockups."
        },
        {
            "chat_id": "chat-010",
            "avatar": "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Zoe",
            "is_online": false,
            "is_read": true,
            "name": "Zoe Night",
            "latest_message": "Goodnight! Talk soon."
        }
    ]), []);

    const filteredChats = useMemo(() => {
        if (!debouncedQuery) return chatList;
        const q = debouncedQuery.toLowerCase();
        return chatList.filter(c => 
            c.name.toLowerCase().includes(q) || 
            c.latest_message.toLowerCase().includes(q)
        )
    }, [debouncedQuery, chatList]);

    return(
        <div className="w-full h-full flex p-4 gap-4 text-black">
            <div className="flex-1 h-full p-4 overflow-y-hidden bg-dirty-white shadow-sm rounded-md">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-3">
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or message"
                        allowClear
                    />
                </div>
                {/* Chats */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: "90%" }}>
                    {filteredChats.map((chat, key) => (
                        <div className={`flex items-center gap-4 p-2 rounded-2xl ${activeChatId === chat.chat_id ? "bg-gray-100": ""}`} key={key} onClick={()=> {setActiveChatId(chat.chat_id)}}>
                            <span className="h-12 w-12 relative">
                                <img 
                                    src={chat.avatar} 
                                    alt={chat.name} 
                                    className="h-full w-full rounded-full object-cover" 
                                />
                                { chat.is_online &&
                                    <div 
                                        className="h-3 w-3 absolute bottom-0 right-0 border-2
                                                border-dirty-white bg-green-500 rounded-full">
                                    </div>
                                }
                            </span>
                            <div>
                                <p className="text-lg font-semibold">
                                    {chat.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {chat.latest_message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
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