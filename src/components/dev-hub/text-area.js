import React from 'react';
import { default as LeafyGreenTextArea } from '@leafygreen-ui/text-area';

const TextArea = ({ required, ...props }) => (
    <LeafyGreenTextArea darkMode optional={!required} {...props} />
);

export default TextArea;
