const buildMenu = (headings: TocItem[], toc: HTMLElement, drawer: HTMLInputElement | null = null) => {
  toc.innerHTML = '' // Limpiar el contenido del menú

  headings.forEach((heading: TocItem) => {
    // Crear el <li> y <a> para cada item
    const li = document.createElement('li')
    const a = document.createElement('a')
    const headingElement = heading.element

    a.textContent = heading.title // Asignar el texto al enlace
    headingElement.id = headingElement.textContent?.replace(/\s+/g, '-').toLowerCase() ?? '' // Asignar id
    a.href = `#${headingElement.id}`

    if (heading.children.length > 0) {
      const details = document.createElement('details')
      details.setAttribute('id', `details-${headingElement.id}`)
      details.open = drawer ? true : false

      const summary = document.createElement('summary')
      summary.textContent = heading.title

      details.appendChild(summary)

      const ul = document.createElement('ul')
      buildMenu(heading.children, ul, drawer)

      details.appendChild(ul)
      li.appendChild(details)
    } else {
      li.appendChild(a)
    }

    toc.appendChild(li)

    if (drawer) {
      a.addEventListener('click', () => {
        drawer.checked = false
      })
    }
  })
}

export const tocCreator = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4') as NodeListOf<HTMLElement>

  const toc = document.getElementById('toc') as HTMLElement
  const tocMobile = document.getElementById('toc-mobile') as HTMLElement
  const drawer = document.getElementById('main-drawer') as HTMLInputElement
  const headingsParsed = buildToc(
    Array.from(headings).map((heading) => ({
      level: parseInt(heading.tagName[1]),
      title: heading.textContent ?? '',
      element: heading,
    })),
  )

  buildMenu(headingsParsed, toc)
  buildMenu(headingsParsed, tocMobile, drawer)

  return toc
}

interface TocItem {
  title: string
  children: TocItem[]
  element: HTMLElement
}

function buildToc(headers: { level: number; title: string; element: HTMLElement }[]): TocItem[] {
  const toc: TocItem[] = []
  let currentH1: TocItem | null = null
  let currentH2: TocItem | null = null
  let currentH3: TocItem | null = null

  headers.forEach((header) => {
    const { level, title } = header
    if (level === 1) {
      currentH1 = { title, children: [], element: header.element }
      toc.push(currentH1)
      currentH2 = null
      currentH3 = null
    } else if (level === 2 && currentH1) {
      currentH2 = { title, children: [], element: header.element }
      currentH1.children.push(currentH2)
      currentH3 = null
    } else if (level === 3 && currentH2) {
      currentH3 = { title, children: [], element: header.element }
      currentH2.children.push(currentH3)
    }
  })

  return toc
}
