const chatList = [
    {
        chat_id: "chat-001",
        user: {
            id: "user-001",
            name: "Felix Miller",
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Felix",
            is_online: true,
        },
        latest_message: {
            content: "I'm good, thanks! Did you see the latest update?",
            timestamp: "2026-02-25T10:01:00Z",
        },
        unread_count: 2,
        
    },
    {
        chat_id: "chat-002",
        user: {
            id: "user-003",
            name: "Alice Johnson",
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Alice",
            is_online: false,
        },
        latest_message: {
            content: "Not right now, but let's catch up later!",
            timestamp: "2026-02-25T09:35:00Z",
        },
        unread_count: 0,
    },
    {
        chat_id: "chat-003",
        user: {
            id: "user-004",
            name: "John Doe",
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=John",
            is_online: true,
        },
        latest_message: {
            content: "Can you send me the files?",
            timestamp: "2026-02-25T08:45:00Z",
        },
        unread_count: 1,
    },
    {
        chat_id: "chat-004",
        user: {
            id: "user-005",
            name: "Emily Davis",
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Emily",
            is_online: false,
        },
        latest_message: {
            content: "Thanks for the help!",
            timestamp: "2026-02-24T18:20:00Z",
        },
        unread_count: 0,
    },
    {
        chat_id: "chat-005",
        user: {
            id: "user-006",
            name: "Michael Brown",
            avatar: "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Michael",
            is_online: true,
        },
        latest_message: {
            content: "Let's meet tomorrow.",
            timestamp: "2026-02-24T15:30:00Z",
        },
        unread_count: 3,
    },
];

export default chatList;