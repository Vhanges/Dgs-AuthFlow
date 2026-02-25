import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import chatList from "../../data/chatList"
const Chat = () => {


    const [activeChatId, setActiveChatId] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 250);

    const navigate = useNavigate();


    const filteredChats = useMemo(() => {
        if (!debouncedQuery) return chatList;
        const q = debouncedQuery.toLowerCase();
        return chatList.filter(c => 
            c.user.name.toLowerCase().includes(q) || 
            c.latest_message.content.toLowerCase().includes(q)
        )
    }, [debouncedQuery]);

    const handleChatClick = (chatId) => {
        setActiveChatId(chatId);
        navigate(`/chat/${chatId}`);
    } 

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
                <div className="flex-1 overflow-y-auto mb-10" style={{ maxHeight: "85%" }}>
                    {filteredChats.map((chat, key) => (
                        <div className={`flex items-center gap-4 p-2 rounded-2xl ${activeChatId === chat.chat_id ? "bg-gray-100": ""}`} 
                             key={key}
                             onClick={()=> {handleChatClick(chat.chat_id)}}>
                            <span className="h-12 w-12 relative">
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
                                <p className="text-lg font-semibold">
                                    {chat.user.name} 
                                </p>
                                <p className="text-sm text-gray-500">
                                    {chat.latest_message.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Chat View */}
            <div className="flex-2 p-3 bg-dirty-white shadow-sm rounded-md">
                <div className="w-full h-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Chat;