const fs = require('fs')
const URL = require('url-parse')
const path = require('path')
const { htmlsFolds } = require('./config')

// create htmlsFolds if it not exists
if (!fs.existsSync(htmlsFolds)) {
  fs.mkdirSync(htmlsFolds)
}

const mkdirDeep = (folder, initDir) => folder.split('/').reduce((parentDir, childDir) => {
  const curDir = path.resolve(parentDir, childDir)
  if (!fs.existsSync(curDir)) {
    fs.mkdirSync(curDir)
  }
  return curDir
}, initDir)

const getExpireTime = activeTime => +new Date() + Number(activeTime) * 1000

const getHtmlPath = url => {
  const { origin, pathname, query, hash } = new URL(url)
  const filename = query || hash ? encodeURIComponent(query + hash) : '_index'
  return {
    filename,
    folder: `${htmlsFolds}/${encodeURIComponent(origin)}${pathname}`,
    relativeFolder: `${encodeURIComponent(origin)}${pathname}`
  }
}

const deleteFilesByName = (folder, filename) => fs.readdirSync(folder).forEach(f => {
  if (f.indexOf(filename) === -1) {
    return true
  } else {
    return fs.unlinkSync(`${folder}/${f}`)
  }
})

exports.getFile = async url => {
  const { folder, filename } = getHtmlPath(url)
  if (!fs.existsSync(folder)) {
    return false
  }
  const file = fs.readdirSync(folder).find(f => {
    if (f.indexOf(filename) === -1) {
      return
    }
    const expireTime = f.split(`${filename}_`)[1].split('.html')[0]
    return Number(expireTime) > +new Date()
  })
  return file ? fs.readFileSync(`${folder}/${file}`, { encoding: 'utf-8' }) : false
}

exports.save = async (content, url, activeTime) => {
  const { folder, relativeFolder, filename } = getHtmlPath(url)
  if (!fs.existsSync(folder)) {
    mkdirDeep(relativeFolder, htmlsFolds)
  }
  const expireTime = getExpireTime(activeTime)
  const filePath = `${folder}/${filename}_${expireTime}.html`
  deleteFilesByName(folder, filename)
  if (activeTime <= 0) {
    return true
  }
  return fs.writeFileSync(filePath, content)
}

exports.clear = async url => {
  const { folder, filename } = getHtmlPath(url)
  if (!folder) {
    return {
      status: false,
      msg: 'unknow url'
    }
  }
  if (!fs.existsSync(folder)) {
    return {
      status: true,
      msg: 'clear already'
    }
  }
  deleteFilesByName(folder, filename)
  return {
    status: true,
    msg: 'clear success'
  }
}
