import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { size } from './theme';
import BlogShareLinks from './blog-share-links';

const ArticleShareArea = styled('div')`
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    display: flex;
    justify-content: space-between;
    margin-bottom: ${size.large};
    margin-top: ${size.large};
    padding-top: ${size.medium};
`;

const StyledBlogShareLinks = styled(BlogShareLinks)`
    height: fit-content;
    /* The initial footer element is a span, so this works given the initial element does not have any margin applied to give spacing */
    a {
        margin-left: ${size.medium};
    }
`;

const ArticleShareFooter = ({ tags, title, tooltipText, url, ...props }) => (
    <ArticleShareArea {...props}>
        <BlogTagList tags={tags} />
        <StyledBlogShareLinks
            tooltipText={tooltipText}
            title={title}
            url={url}
            data-test="article-share-links"
        />
    </ArticleShareArea>
);

export default ArticleShareFooter;
