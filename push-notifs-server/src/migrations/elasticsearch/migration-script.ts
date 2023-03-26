import { CreateArticlesIndex } from './create-articles-index';

(async () => {
    try {
        await CreateArticlesIndex();
    } catch (err) {
        const rootCauses = err.meta.body.error.root_cause;
        if (
            rootCauses.every(
                (rc) => rc.type === 'resource_already_exists_exception',
            )
        ) {
            console.log('Index already exists, continuing');
            return;
        }
        console.log('ERROR');
        throw err;
    }
})();
