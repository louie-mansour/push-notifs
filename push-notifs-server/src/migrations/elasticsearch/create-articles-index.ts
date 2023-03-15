import { Client } from '@elastic/elasticsearch';

export async function CreateArticlesIndex() {
  const client = new Client({ node: 'http://elastic:9200' });
  await client.indices.create({
    index: 'articles',
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
        createdDateTime: { type: 'date', index: false },
      },
    },
  });
}
