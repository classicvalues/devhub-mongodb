import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';
import MongodbLogoIcon from './icons/mongodb-logo';
import Link from './link';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';
import LinkedIn from './icons/linkedin';
import Github from './icons/github';
import Youtube from './icons/youtube';
import Twitch from './icons/twitch';
import { P } from './text';

const siteLinks = [
    {
        name: 'Developer Hub',
        url: '/',
    },
    {
        name: 'Documentation',
        url: 'https://docs.mongodb.com/',
    },
    {
        name: 'University',
        url: 'https://university.mongodb.com/',
    },
    {
        name: 'Community',
        url: 'https://community.mongodb.com/',
    },
];
const iconstyles = css`
    &:hover {
        fill: ${colorMap.darkGreen};
        g {
            fill: ${colorMap.darkGreen};
            path {
                fill: ${colorMap.darkGreen};
            }
        }
    }
`;
const iconProps = {
    height: 15,
    width: 15,
    color: colorMap.greyLightTwo,
    css: iconstyles,
};
const iconLinks = [
    {
        name: <Github {...iconProps} />,
        url: 'https://github.com/mongodb',
    },
    {
        name: <Twitch {...iconProps} />,
        url: 'https://m.twitch.tv/mongodb/profile',
    },
    {
        name: <Youtube {...iconProps} />,
        url: 'https://www.youtube.com/user/mongodb',
    },
    {
        name: <TwitterIcon {...iconProps} />,
        url: 'https://twitter.com/MongoDB/',
    },
    {
        name: <FacebookIcon {...iconProps} />,
        url: 'https://www.facebook.com/MongoDB/',
    },
    {
        name: <LinkedIn {...iconProps} />,
        url: 'https://www.linkedin.com/company/mongodbinc/',
    },
];
const GlobalFooter = styled('footer')`
    background: ${colorMap.greyDarkThree};
    color: ${colorMap.greyLightTwo};
    display: grid;
    @media ${screenSize.mediumAndUp} {
        grid-gap: 0 ${size.large};
        grid-template-areas:
            'logo list'
            'logo icons'
            'logo copyright';
        grid-template-columns: 25% 70%;
        padding: ${size.large};
    }
    @media ${screenSize.upToMedium} {
        grid-template-areas:
            'list list'
            'icons icons'
            'logo copyright';
        grid-template-columns: 49% 49%;
        padding: 0 ${size.default};
    }
`;
const logoStyles = css`
    @media ${screenSize.upToMedium} {
        height: 26px;
        width: 100px;
    }
`;
const LogoContainer = styled('section')`
    align-items: center;
    display: flex;
    grid-area: logo;
    justify-content: center;
    @media ${screenSize.mediumAndUp} {
        border-right: 1px solid ${colorMap.greyLightTwo};
        padding: ${size.large};
    }
    @media ${screenSize.upToMedium} {
        border-top: 1px solid ${colorMap.greyLightTwo};
        justify-content: flex-start;
        padding: ${size.default} 0;
    }
`;
const listStyles = css`
    display: flex;
    list-style-type: none;
    padding: 0;
    @media ${screenSize.upToMedium} {
        justify-content: center;
    }
`;
const LinksList = styled('ul')`
    ${listStyles}
    grid-area: list;
    @media ${screenSize.upToSmall} {
        flex-direction: column;
    }
`;
const IconList = styled('ul')`
    ${listStyles}
    @media ${screenSize.upToSmall} {
        justify-content: space-between;
    }
    grid-area: icons;
`;
const Copyright = styled(P)`
    font-size: ${fontSize.micro};
    grid-area: copyright;
    @media ${screenSize.upToMedium} {
        align-items: center;
        border-top: 1px solid ${colorMap.greyLightTwo};
        display: flex;
        font-size: ${fontSize.micro};
        justify-content: flex-end;
        margin: 0;
        padding: ${size.default} 0;
    }
`;
const FooterLink = styled(Link)`
    color: ${colorMap.greyLightTwo};
    &:visited {
        color: ${colorMap.greyLightTwo};
    }
    &:hover {
        color: ${colorMap.darkGreen};
    }
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    padding: ${size.tiny};
    text-decoration: none;
`;
const ListItem = styled('li')`
    @media ${screenSize.mediumAndUp}{
        text-align: center;
    }
    ${props =>
        props.isListType &&
        `@media ${screenSize.upToSmall} {
            &:not(:first-of-type) {
                margin-top: ${size.default};
            }
        }`}
    @media ${screenSize.smallAndUp} {
        &:not(:first-of-type) {
            margin-left: ${size.large};
        }
    }
`;
const getLinksList = (link, isListType) => (
    <ListItem isListType={isListType} key={link.url}>
        <FooterLink href={link.url}>{link.name}</FooterLink>
    </ListItem>
);
export default () => {
    return (
        <GlobalFooter>
            <LogoContainer>
                <FooterLink css={iconstyles} href="https://www.mongodb.com/">
                    <MongodbLogoIcon css={logoStyles} />
                </FooterLink>
            </LogoContainer>
            <LinksList>
                {siteLinks.map(list => getLinksList(list, true))}
            </LinksList>
            <IconList>
                {iconLinks.map(list => getLinksList(list, false))}
            </IconList>
            <Copyright collapse>
                © {new Date().getFullYear()} MongoDB, Inc.
            </Copyright>
        </GlobalFooter>
    );
};