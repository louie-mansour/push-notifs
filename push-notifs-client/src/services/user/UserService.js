export async function getUserData(userId) {
    return {
        user: {
            id: userId,
            schedule: {
                time: '12:00pm Eastern',
                day: 'Every day',
            },
            contact: {
                email: 'address@example.com',
                phone: '+1 (123) 456 - 7890',
            },
            keywords: [
                'JavaScript',
                'Kotlin',
                'Java',
                'TypeScript',
                'React',
                'Elixir',
            ],
        },
    }
}