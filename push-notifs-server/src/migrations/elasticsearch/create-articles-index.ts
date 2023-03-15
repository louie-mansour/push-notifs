import axios from 'axios';

export async function CreateArticlesIndex() {
    await axios.put('http://elastic:9200/articles',  {
        settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
            'index.mapping.coerce': false,
        },
        mappings: {
            dynamic: 'strict',
            numeric_detection: false,
            date_detection: false,
            properties: {
                title: { type: 'text' },
                url: { type: 'keyword', norms: false, index: false },
                source: { type: 'keyword' },
            }
        }
    })
}