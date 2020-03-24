import { findArticlesFromSlugs } from '../../src/utils/setup/on-create-page';

it('should correctly find featured articles given a set of requested articles', () => {
    let requestedFeaturedSlugs = [
        '/quickstart/java-setup-crud-operations',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
    ];

    const allArticles = [
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
        '/quickstart/java-setup-crud-operations',
        '/quickstart/csharp',
    ].map(slug => ({
        query_fields: {
            slug,
        },
    }));

    let foundSlugs = findArticlesFromSlugs(
        allArticles,
        requestedFeaturedSlugs
    ).map(a => a.query_fields.slug);

    // All articles were found, so we should get them back in order
    expect(foundSlugs).toStrictEqual(requestedFeaturedSlugs);

    requestedFeaturedSlugs = [
        '/quickstart',
        '/how-to',
        '/how-to/polymorphic-pattern',
    ];

    foundSlugs = findArticlesFromSlugs(allArticles, requestedFeaturedSlugs).map(
        a => a.query_fields.slug
    );

    // The first two were not found, so return the 0th and 1st elements (instead of null)
    expect(foundSlugs).toStrictEqual([
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
    ]);
});
