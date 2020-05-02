import fs from 'fs'
import path from 'path'

const contentsDirectory = path.join(process.cwd(), 'contents')

export function getContentsData(kind: string) {
    const fullPath = path.join(contentsDirectory, kind + '.csv')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return csvStringToArray(fileContents)
}

function csvStringToArray(csv: string): string[][] {
  return csv.split('\n').map((row) => row.split(','));
}
