import React, { useCallback, useContext, useRef } from 'react';
// import sanitizeHtml from 'sanitize-html';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import Link from '~components/Link';
import { getNestedValue } from '~utils/get-nested-value';
import SearchContext from './SearchContext';
import { StyledTextInput } from './SearchTextInput';

const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const LINK_COLOR = '#494747';

const largeResultTitle = css`
    font-size: ${size.default};
    line-height: ${size.medium};
    /* Only add bold on larger devices */
    @media ${screenSize.smallAndUp} {
        font-weight: bolder;
    }
`;

// Truncates text to a maximum number of lines
const truncate = maxLines => css`
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const MobileFooterContainer = styled('div')`
    align-items: flex-end;
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;

const LearnMoreLink = styled('a')`
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    line-height: ${size.default};
`;

const SearchResultContainer = styled('div')`
    height: 100%;
    @media ${screenSize.upToSmall} {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

const SearchResultLink = styled(Link)`
    color: ${LINK_COLOR};
    height: 100%;
    text-decoration: none;
    :hover,
    :focus {
        color: ${LINK_COLOR};
        text-decoration: none;
        ${SearchResultContainer} {
            background-color: rgba(231, 238, 236, 0.4);
            transition: background-color 150ms ease-in;
        }
    }
`;

const StyledPreviewText = styled('p')`
    font-family: 'Akzidenz Grotesk BQ Light';
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    line-height: 20px;
    margin-bottom: 0;
    margin-top: 0;
    ${({ maxLines }) => truncate(maxLines)};
`;

const StyledResultTitle = styled('p')`
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${size.medium};
    letter-spacing: 0.5px;
    height: ${size.medium};
    margin-bottom: 6px;
    margin-top: 0;
    ${truncate(1)};
    ${({ useLargeTitle }) => useLargeTitle && largeResultTitle};
    @media ${screenSize.upToSmall} {
        ${largeResultTitle};
    }
`;

const SearchResult = React.memo(
    ({
        learnMoreLink = false,
        maxLines = 2,
        useLargeTitle = false,
        onClick,
        preview,
        title,
        url,
        ...props
    }) => {
        const { searchContainerRef } = useContext(SearchContext);
        const resultLinkRef = useRef(null);

        const onArrowDown = useCallback(
            resultLinkRef => {
                const nextSibling = getNestedValue(
                    ['current', 'nextSibling'],
                    resultLinkRef
                );
                if (nextSibling) {
                    nextSibling.focus();
                } else {
                    // This is the last result, so let's loop back to the top
                    if (searchContainerRef && searchContainerRef.current) {
                        const firstLink = searchContainerRef.current.querySelector(
                            `${SearchResultLink}`
                        );
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                }
            },
            [searchContainerRef]
        );

        const onArrowUp = resultLinkRef => {
            const prevSibling = getNestedValue(
                ['current', 'previousSibling'],
                resultLinkRef
            );
            if (prevSibling) {
                // If these don't match, we have gone up out of the results
                if (prevSibling.nodeName !== resultLinkRef.current.nodeName) {
                    // This is the first result, so let's go to the search bar
                    document.querySelector(`${StyledTextInput} input`).focus();
                } else {
                    prevSibling.focus();
                }
            }
        };
        // Navigate with arrow keys
        const onKeyDown = useCallback(
            e => {
                // Only allow arrow keys if we are within the searchbar (not if this is being reused)
                if (searchContainerRef) {
                    if (e.key === 'ArrowDown' || e.keyCode === ARROW_DOWN_KEY) {
                        e.preventDefault();
                        // find next result and focus
                        onArrowDown(resultLinkRef);
                    } else if (
                        e.key === 'ArrowUp' ||
                        e.keyCode === ARROW_UP_KEY
                    ) {
                        e.preventDefault();
                        // find previous result and focus
                        onArrowUp(resultLinkRef);
                    }
                }
            },
            [onArrowDown, searchContainerRef]
        );
        return (
            <SearchResultLink
                ref={resultLinkRef}
                to={url}
                onClick={onClick}
                onKeyDown={onKeyDown}
                {...props}
            >
                <SearchResultContainer>
                    <StyledResultTitle useLargeTitle={useLargeTitle}>
                        {title}
                    </StyledResultTitle>
                    <StyledPreviewText maxLines={maxLines}>
                        {preview}
                    </StyledPreviewText>
                    {learnMoreLink && (
                        <MobileFooterContainer>
                            <LearnMoreLink href={url}>
                                <strong>Learn More</strong>
                            </LearnMoreLink>
                        </MobileFooterContainer>
                    )}
                </SearchResultContainer>
            </SearchResultLink>
        );
    }
);

export { SearchResultLink };
export default SearchResult;