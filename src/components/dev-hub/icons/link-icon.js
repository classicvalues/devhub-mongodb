import React from 'react';
import { useTheme } from '@emotion/react';

const LinkIcon = ({ color, ...props }) => {
    const theme = useTheme();
    const iconColor = color ? color : theme.colorMap.greyLightTwo;
    return (
        <svg
            aria-label="Link"
            height="20"
            viewBox="0 0 540 500"
            width="20"
            {...props}
        >
            <path
                fill={iconColor}
                d="m392.189 0c-32.946 0-63.926 12.839-87.227 36.14l-96.067 96.067c7.342-1.025 14.677-2.138 22.182-2.138 20.693 0 40.97 4.02 59.611 11.474l59.839-59.839c11.139-11.124 25.929-17.26 41.662-17.26 32.49 0 58.922 26.432 58.922 58.922 0 15.734-6.136 30.523-17.26 41.662l-107.71 107.712c-22.279 22.247-61.046 22.263-83.325.016l-45.533 45.596c23.286 23.27 54.265 36.093 87.195 36.093 32.946 0 63.925-12.839 87.227-36.14l107.712-107.712c23.301-23.301 36.14-54.281 36.14-87.227-.001-68.031-55.336-123.366-123.368-123.366z"
            />
            <path
                fill={iconColor}
                d="m224.303 374.578-59.274 59.274c-11.139 11.124-25.929 17.26-41.662 17.26-32.49 0-58.922-26.432-58.922-58.922 0-15.733 6.136-30.523 17.26-41.662l107.712-107.712c22.279-22.247 61.046-22.263 83.325-.016l45.533-45.596c-46.587-46.54-127.819-46.555-174.422.047l-107.713 107.712c-23.302 23.301-36.14 54.28-36.14 87.226 0 68.032 55.335 123.366 123.366 123.366 32.946 0 63.925-12.839 87.227-36.14l94.792-94.792c-6.921.93-13.806 2.043-20.908 2.043-21.012.001-41.363-4.2-60.174-12.088z"
            />
        </svg>
    );
};

export default LinkIcon;
