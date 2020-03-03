export const AddFriendSchema = {
    id: '/AddFriendSchema',
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