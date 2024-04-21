import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import patch from '../source/main.js'
import isEqual from 'is-equal'


const basic = yaml.safeLoad(fs.readFileSync(
	path.join(__dirname, './basic.yaml')
))
const patchedSource = patch(basic.source, basic.diff)

console.assert(
	isEqual(patchedSource, basic.target),
	`Expected ${JSON.stringify(patchedSource, null, 2)} to be equal to` +
	JSON.stringify(basic.target, null, 2)
)
