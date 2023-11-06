const fs = require('fs')
const path = require('path');

// Specify the path of the new folder

(() => {
  const [moduleName] = process.argv.slice(2)

  if (!moduleName) {
    console.error('No module name provided')
    process.exit(1)
  }

  const newModulePath = path.join(process.cwd(), 'src', 'modules', moduleName)

  fs.mkdirSync(newModulePath)

  const controllersPath = path.join(newModulePath, `${moduleName}.controllers.ts`)
  const servicesPath = path.join(newModulePath, `${moduleName}.services.ts`)
  const routesPath = path.join(newModulePath, `${moduleName}.routes.ts`)

  const paths = [controllersPath, servicesPath, routesPath]

  paths.forEach((path) => {
    fs.writeFileSync(path, '')
  })

  console.log('Module added successfully.')
})()
