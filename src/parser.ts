async function processDroppedFile(file: File) {
  const xmlContent = await file.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlContent, "application/xml")
  console.log(doc)
}

export function handleFileDrop(ev: DragEvent) {
  ev.preventDefault()

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        processDroppedFile(file)
        return
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      processDroppedFile(ev.dataTransfer[i])
      return
    }
  }
}