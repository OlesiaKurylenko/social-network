export const AddFriendSchema = {
    id: '/AddRequestSchema',
    type: 'object',
    properties: {
        user_id: {
            type: 'number'
        },
        friend_id: {
            type: 'number'
        }
    }
}