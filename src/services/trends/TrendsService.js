export async function getTrendingArticles() {
    return [
        {
            url: 'https://www.google.com/search?q=1',
            keyword: 'TypeScript',
            source: 'YCombinator',
            title: 'How to do good',
        },
        {
            url: 'https://www.google.com/search?q=2',
            keyword: 'Ruby',
            source: 'YCombinator',
            title: 'Make better programs',
        },
        {
            url: 'https://www.google.com/search?q=3',
            keyword: 'Python',
            source: 'YCombinator',
            title: 'How to do good',
        },
        {
            url: 'https://www.google.com/search?q=4',
            keyword: 'Rust',
            source: 'YCombinator',
            title: 'Better than we thought it was',
        },
        {
            url: 'https://www.google.com/search?q=5',
            keyword: 'Python',
            source: 'YCombinator',
            title: 'Data Ops is making strides',
        },
    ]
}

export async function getTrendingKeywords() {
    return { keywords: ['Python', 'Node', 'JavaScript', 'Java', 'HTML'] }
}