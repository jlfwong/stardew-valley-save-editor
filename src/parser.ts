class Player {
  constructor(private element: Element) {}

  getMoney(): number {
    return parseInt(this.element.querySelector("money").textContent.trim())
  }

  setMoney(value: number) {
    this.element.querySelector("money").textContent = value.toFixed(0)
  }
}

class SaveGame {
  private doc: XMLDocument
  private host: Element
  private farm: Element
  private farmHouse: Element
  private buildings: Element[]
  private cabins: Element[]
  private farmhands: Element[]

  constructor(private filename: string, xmlContent: string) {
    const parser = new DOMParser()
    this.doc = parser.parseFromString(xmlContent, "application/xml")
    this.host = this.doc.querySelector(":scope > player")

    const locations = Array.from(this.doc.querySelector(":scope > locations").children)

    this.farm = locations.find(x => x.getAttribute("xsi:type") == "Farm")
    this.farmHouse = locations.find(x => x.getAttribute("xsi:type") == "FarmHouse")
    this.buildings = Array.from(this.farm.querySelector(":scope > buildings").children)
    this.cabins = this.buildings.filter(b => {
      const indoors = b.querySelector(":scope > indoors")
      if (!indoors) return false
      return indoors.getAttribute("xsi:type") == "Cabin"
    })
    this.farmhands = this.cabins.map(cabin => cabin.querySelector(":scope > indoors").querySelector("farmhand"))
  }

  getHost(): Player {
    return new Player(this.host)
  }

  download(): void {
    console.log('Downloading as', this.filename)

    const serializer = new XMLSerializer

    // We use an incorrect mime-type of application/octet-stream to prevent Chrome from appending
    // a file extension, since Stardew Valley's save files don't have file extensions.
    const blob = new Blob([serializer.serializeToString(this.doc)], {type: 'application/octet-stream'})

    const a = document.createElement('a')
    a.download = this.filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':')

    // For this to work in Firefox, the <a> must be in the DOM
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

async function processDroppedFile(file: File): Promise<SaveGame> {
  const xmlContent = await file.text()
  return new SaveGame(file.name, xmlContent)
}

export async function handleFileDrop(ev: DragEvent, cb: (sg: SaveGame) => void) {
  ev.preventDefault()

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        cb(await processDroppedFile(file))
        return
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      cb(await processDroppedFile(ev.dataTransfer[i]))
      return
    }
  }
}