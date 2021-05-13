import memoizerific from 'memoizerific';
import { fetchBuildTimeMedia } from './fetch-build-time-media';
import { removePageIfStaged } from './remove-page-if-staged';
import { handleCreateHomePage } from './handle-create-home-page';
import { getStagingPages } from './get-staging-pages';
import { handleCreateLearnPage } from './handle-create-learn-page';

const memoizedStagingPages = memoizerific(1)(
    async () => await getStagingPages()
);

export const handleCreatePage = async (
    page,
    actions,
    allArticles,
    homeFeaturedArticles,
    learnFeaturedArticles,
    excludedLearnPageArticles,
    allPodcasts
) => {
    switch (page.path) {
        case '/learn/':
            const allMedia = await fetchBuildTimeMedia();
            handleCreateLearnPage(
                page,
                actions,
                learnFeaturedArticles,
                excludedLearnPageArticles,
                allArticles,
                allMedia,
                allPodcasts
            );
            break;
        case '/':
            const { fallbackTwitchVideo } = await fetchBuildTimeMedia();
            await handleCreateHomePage(
                page,
                actions,
                homeFeaturedArticles,
                allArticles,
                fallbackTwitchVideo
            );
            break;
        default:
            const { deletePage } = actions;
            const stagingPages = await memoizedStagingPages();
            removePageIfStaged(page, deletePage, stagingPages);
            break;
    }
};
