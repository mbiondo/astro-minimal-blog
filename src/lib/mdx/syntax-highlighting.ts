import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['dracula'],
  langs: [
    'javascript',
    'typescript',
    'html',
    'css',
    'jsx',
    'tsx',
    'ts',
    'js',
    'json',
    'shell',
    'python',
    'php',
    'ruby',
    'bash',
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

  codeBlocks.forEach((codeBlock: HTMLDivElement, index) => {
    const lang = codeBlock.classList[0].replace('language-', '').trim()

    const copybtn = document.createElement('button')

    copybtn.innerHTML = `<svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"></path></svg>`
    copybtn.setAttribute('aria-label', 'Copy code to clipboard')
    copybtn.setAttribute('title', 'Copy code to clipboard')
    copybtn.setAttribute('type', 'button')
    copybtn.setAttribute('aria-hidden', 'true')
    copybtn.setAttribute('name', `copy-code-${index}`)
    copybtn.classList.add(
      'absolute',
      'btn',
      'btn-sm',
      'btn-square',
      'btn-neutral',
      'cursor-copy',
      'top-2',
      'right-1',
      'rounded',
      'cursor-pointer',
      'flex',
      'items-center',
      'p-1',
      'hover:bg-default',
      'transition',
      'duration-300',
    )

    copybtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText)
    })

    //validate if the language is supported
    let codeHTML = codeBlock.innerHTML

    if (highlighter.getLanguage(lang)) {
      codeHTML = highlighter.codeToHtml(codeBlock.innerText, {
        lang: lang,
        theme: 'dracula',
      })
    }

    if (codeBlock.parentElement) {
      codeBlock.parentElement.appendChild(copybtn)
      codeBlock.parentElement.style.position = 'relative'
      const code = codeHTML
        .replace('<pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code>', '')
        .replace('</code></pre>', '')
      codeBlock.innerHTML = `${code}`
    }
  })
}
