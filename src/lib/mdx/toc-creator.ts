export const tocCreator = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6') as NodeListOf<HTMLElement>
  const toc = document.createElement('ul')
  const article = document.querySelector('article')

  toc.classList.add('menu', 'rounded-box', 'w-56', 'fixed', 'top-64', 'left-10', 'shadow-lg', 'hidden', 'xl:block')

  headings.forEach((heading: HTMLElement) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.textContent = heading.textContent
    heading.id = heading.textContent?.replace(/\s+/g, '-').toLowerCase() ?? ''
    a.href = `#${heading.id}`
    a.classList.add('block', 'p-2', 'hover:bg-default', 'transition', 'duration-300')
    li.appendChild(a)
    toc.appendChild(li)
  })

  if (article) article.appendChild(toc)

  return toc
}
