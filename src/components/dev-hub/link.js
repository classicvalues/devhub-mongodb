import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'gatsby';
import { animationSpeed, colorMap, fontSize, screenSize } from './theme';

// Takes an event handler, and wraps it to call preventDefault.
// If the handler is falsey, it is returned unchanged.
export const wrapPreventDefault = (handler, href) => {
    if (!handler) {
        return handler;
    }

    return e => {
        if (!href) {
            e.preventDefault();
        }
        return handler(e);
    };
};
const handleEnter = handler => e => {
    e.which === 13 && handler && wrapPreventDefault(handler)(e);
};

export const _validateUrlProp = (props, propName, clashingPropName) => {
    const currentProp = props[propName];
    if (currentProp) {
        if (props[clashingPropName]) {
            return new Error(
                `Both \`${propName}\` and \`${clashingPropName}\` props values were provided to \`Link\`. The \`${propName}\` prop will be used.`
            );
        }
        if (typeof currentProp !== 'string') {
            return new Error(`\`${propName}\` must be a string`);
        }
    }
    // passed validation
    return null;
};

// Extra props to pass when href is not specified.
// These help the link look and feel more like a link,
// even though the browser doesn't consider it a link.
const BUTTON_PROPS = {
    role: 'button',
    tabIndex: 0,
};

const tertiaryLinkStyling = css`
    color: ${colorMap.greyLightThree};
    display: block;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        color: ${colorMap.magenta};
        transition: color ${animationSpeed.fast} ease ${animationSpeed.fast};
    }

    &:after {
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192';
    }
`;

const linkStyling = css`
    color: #fff;
    font-size: ${fontSize.small};
    text-decoration: underline;
    &:visited {
        color: #fff;
    }
    &:hover {
        color: ${colorMap.darkGreen};
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
    }
`;

const ExternalLink = styled('a')`
    ${props => (props.tertiary ? tertiaryLinkStyling : linkStyling)}
`;

const InternalLink = styled(RouterLink)`
    ${props => (props.tertiary ? tertiaryLinkStyling : linkStyling)};
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string?} props.href
 * @property {func?} props.onClick
 * @property {string?} props.target
 * @property {boolean?} props.tertiary
 * @property {string?} props.to
 */
const Link = ({ children, href, onClick, target, tertiary, to, ...rest }) => {
    if (to) {
        return (
            <InternalLink onClick={onClick} to={to} {...rest}>
                {children}
            </InternalLink>
        );
    }
    return (
        <ExternalLink
            href={href}
            onClick={wrapPreventDefault(onClick, href)}
            onKeyPress={href ? undefined : handleEnter(onClick)}
            rel={target === '_blank' ? 'noreferrer noopener' : void 0}
            target={target}
            {...(typeof href === 'undefined' ? BUTTON_PROPS : null)}
            tertiary={tertiary}
            {...rest}
        >
            {children}
        </ExternalLink>
    );
};

Link.displayName = 'Link';

export default Link;