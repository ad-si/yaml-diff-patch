import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import createDiff from '../source/main.js'
import isEqual from 'is-equal'

const basic = yaml.safeLoad(fs.readFileSync(
	path.join(__dirname, './basic.yaml')
))
const actualDiff = createDiff(basic.source, basic.target)

console.assert(
	isEqual(basic.diff, actualDiff),
	`Expected ${JSON.stringify(basic.diff, null, 2)} to be equal to` +
	JSON.stringify(actualDiff, null, 2)
)
