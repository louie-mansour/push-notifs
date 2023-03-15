import {CreateArticlesIndex} from "./create-articles-index";

(async () => {
    try {
        await CreateArticlesIndex()
        console.log('SUCCESS')
    } catch (e) {
        console.log('ELASTIC MIGRATION FAILED')
        throw new Error('Gone wrong')
    }
})()