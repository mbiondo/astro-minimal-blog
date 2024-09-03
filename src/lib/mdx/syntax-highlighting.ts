import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['dracula'],
  langs: [
    'javascript',
    'typescript',
    'html',
    'css',
    'json',
    'shell',
    'python',
    'php',
    'ruby',
    'go',
    'rust',
    'java',
    'kotlin',
    'swift',
    'c',
    'cpp',
    'csharp',
    'sql',
    'yaml',
    'markdown',
    'plaintext',
  ],
})

export const syntaxHighlighting = () => {
  const codeBlocks = document.querySelectorAll('pre code') as NodeListOf<HTMLDivElement>
  codeBlocks.forEach((codeBlock: HTMLDivElement) => {
    const lang = codeBlock.classList[0].replace('language-', '').trim()

    //validate if the language is supported
    if (!highlighter.getLanguage(lang)) return

    const codeHTML = highlighter.codeToHtml(codeBlock.innerText, {
      lang: lang,
      theme: 'dracula',
    })

    if (codeBlock.parentElement) {
      const pre = codeBlock.parentElement
      const code = codeHTML
        .replace('<pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0">', '')
        .replace('</pre>', '')

      pre.innerHTML = code
    }
  })
}
