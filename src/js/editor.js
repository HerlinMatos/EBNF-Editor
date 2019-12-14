import * as monaco from 'monaco-editor';

// Register a new language
monaco.languages.register({ id: 'EBNF' });

// Register a tokens provider for the language
monaco.languages.setMonarchTokensProvider('EBNF', {
    tokenizer: {
        root: [
            [/\(\*/, "comment","@comment"],
            [/\?/, "specialsequence", "@specialsequence"],
            [/\w+/, "non-terminal"],
            [/[\"\']\w+[\"\']/, "terminal"],
        ],
        comment: [
            [/\*\)/, 'comment', '@pop'],
            [/./, 'comment.content']
        ],
        specialsequence: [
            [/\?/, 'specialsequence', '@pop'],
            [/./, 'specialsequence.content']
        ],
    }
});

// Define a new theme that contains only rules that match this language
monaco.editor.defineTheme('EBNFTheme', {
    base: 'vs',
    inherit: false,
    rules: [
        { token: 'non-terminal', foreground: '0591d4', fontStyle: 'bold' },
        { token: 'terminal', foreground: 'B80C09' },
        { token: 'specialsequence', foreground: '9a9a9a', fontStyle: 'bold' },
        { token: 'comment', foreground: '9a9a9a' },
    ]
});

self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
        if (label === 'json') {
            return './json.worker.js';
        }
        if (label === 'css') {
            return './css.worker.js';
        }
        if (label === 'html') {
            return './html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.js';
        }
        return './editor.worker.js';
    },
};

function create(element){
    return monaco.editor.create(element, {
        value: [
            '(*',
            ' Write EBNF code here',
            ' see reference: https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form',
            '*)',
            '',
            'root = ',
            '',
        ].join('\n'),
        language: 'EBNF',
        theme: 'EBNFTheme',
        fontSize: 16,
        minimap: {
            enabled: false
        }
    });
}

module.exports = {
    create
}
