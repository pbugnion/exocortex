import React, { Component } from 'react'

import Lowlight from 'lowlight';
import ReactLowlight from 'react-lowlight';

//import scala from 'highlight.js/lib/languages/scala'
//import python from 'highlight.js/lib/languages/python'

import 'highlight.js/styles/github.css'

// Lowlight.registerLanguage('scala', scala)
// Lowlight.registerLanguage('python', python)

const CodeBlock = ({ language, value, inline }) => (
    <ReactLowlight
      language={language || 'js'}
      value={value || ''}
      inline={inline}
    />
)

export default CodeBlock
